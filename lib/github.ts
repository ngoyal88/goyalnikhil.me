import type { SiteData } from '@/lib/site-data-types'

type GitRefResponse = {
  object: {
    sha: string
  }
}

type GitTreeResponse = {
  sha: string
}

type GitCommitResponse = {
  sha: string
}

type GitHubEnv = {
  token: string
  owner: string
  repo: string
  branch: string
  dataDir: string
  authorName?: string
  authorEmail?: string
}

const DEFAULT_BRANCH = 'main'
const DEFAULT_DATA_DIR = 'data'

function getGitHubEnv(): GitHubEnv | null {
  const token = process.env.GITHUB_TOKEN
  const owner = process.env.GITHUB_OWNER
  const repo = process.env.GITHUB_REPO
  if (!token || !owner || !repo) return null

  return {
    token,
    owner,
    repo,
    branch: process.env.GITHUB_BRANCH || DEFAULT_BRANCH,
    dataDir: process.env.GITHUB_DATA_DIR || DEFAULT_DATA_DIR,
    authorName: process.env.GITHUB_COMMIT_NAME,
    authorEmail: process.env.GITHUB_COMMIT_EMAIL,
  }
}

export function shouldUseGitHubStorage(): boolean {
  return getGitHubEnv() !== null
}

function buildHeaders(token: string): HeadersInit {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'portfolio-admin',
    'X-GitHub-Api-Version': '2022-11-28',
  }
}

function jsonWithNewline(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`
}

async function githubRequest<T>(url: string, token: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...buildHeaders(token),
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`GitHub API error: ${response.status} ${text}`)
  }

  return (await response.json()) as T
}

function dataPath(dir: string, name: string): string {
  return `${dir}/${name}`
}

function buildTreeEntries(dataDir: string, nextData: SiteData) {
  return [
    {
      path: dataPath(dataDir, 'project-data.json'),
      mode: '100644',
      type: 'blob',
      content: jsonWithNewline({ projects: nextData.projects }),
    },
    {
      path: dataPath(dataDir, 'experience-data.json'),
      mode: '100644',
      type: 'blob',
      content: jsonWithNewline({ experience: nextData.experience }),
    },
    {
      path: dataPath(dataDir, 'achievement-data.json'),
      mode: '100644',
      type: 'blob',
      content: jsonWithNewline({ achievements: nextData.achievements }),
    },
    {
      path: dataPath(dataDir, 'stack-data.json'),
      mode: '100644',
      type: 'blob',
      content: jsonWithNewline({ stack: nextData.stack }),
    },
    {
      path: dataPath(dataDir, 'writing-data.json'),
      mode: '100644',
      type: 'blob',
      content: jsonWithNewline({ writing: nextData.writing }),
    },
    {
      path: dataPath(dataDir, 'blog-data.json'),
      mode: '100644',
      type: 'blob',
      content: jsonWithNewline({ blogPosts: nextData.blogPosts }),
    },
    {
      path: dataPath(dataDir, 'social-data.json'),
      mode: '100644',
      type: 'blob',
      content: jsonWithNewline({ socialLinks: nextData.socialLinks }),
    },
    {
      path: dataPath(dataDir, 'resume-data.json'),
      mode: '100644',
      type: 'blob',
      content: jsonWithNewline({ resume: nextData.resume }),
    },
  ]
}

export async function commitSiteDataToGitHub(nextData: SiteData): Promise<void> {
  const env = getGitHubEnv()
  if (!env) {
    throw new Error('Missing GitHub environment configuration.')
  }

  const baseUrl = `https://api.github.com/repos/${env.owner}/${env.repo}`
  const refUrl = `${baseUrl}/git/ref/heads/${encodeURIComponent(env.branch)}`
  const ref = await githubRequest<GitRefResponse>(refUrl, env.token)
  const baseCommitSha = ref.object.sha

  const treeUrl = `${baseUrl}/git/trees`
  const tree = await githubRequest<GitTreeResponse>(treeUrl, env.token, {
    method: 'POST',
    body: JSON.stringify({
      base_tree: baseCommitSha,
      tree: buildTreeEntries(env.dataDir, nextData),
    }),
  })

  const commitUrl = `${baseUrl}/git/commits`
  const commitBody: Record<string, unknown> = {
    message: `Update site data (${new Date().toISOString()})`,
    tree: tree.sha,
    parents: [baseCommitSha],
  }

  if (env.authorName && env.authorEmail) {
    commitBody.author = {
      name: env.authorName,
      email: env.authorEmail,
    }
  }

  const commit = await githubRequest<GitCommitResponse>(commitUrl, env.token, {
    method: 'POST',
    body: JSON.stringify(commitBody),
  })

  const updateRefUrl = `${baseUrl}/git/refs/heads/${encodeURIComponent(env.branch)}`
  await githubRequest(updateRefUrl, env.token, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: false }),
  })
}
