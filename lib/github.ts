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

type GitHubRepoResponse = {
  default_branch: string
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

class GitHubApiError extends Error {
  status: number
  body: string

  constructor(status: number, body: string) {
    super(`GitHub API error: ${status} ${body}`)
    this.status = status
    this.body = body
  }
}

function normalizeBranch(branch: string): string {
  return branch.replace(/^refs\/heads\//, '').trim()
}

function getGitHubEnv(): GitHubEnv | null {
  const token = process.env.GITHUB_TOKEN?.trim()
  const owner = process.env.GITHUB_OWNER?.trim()
  const repo = process.env.GITHUB_REPO?.trim()
  if (!token || !owner || !repo) return null

  const rawBranch = process.env.GITHUB_BRANCH?.trim() || DEFAULT_BRANCH
  const branch = normalizeBranch(rawBranch) || DEFAULT_BRANCH
  const dataDir = (process.env.GITHUB_DATA_DIR || DEFAULT_DATA_DIR).trim() || DEFAULT_DATA_DIR

  return {
    token,
    owner,
    repo,
    branch,
    dataDir,
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
    throw new GitHubApiError(response.status, text)
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

async function getRefSha(baseUrl: string, token: string, branch: string): Promise<GitRefResponse> {
  const refUrl = `${baseUrl}/git/ref/heads/${encodeURIComponent(branch)}`
  return githubRequest<GitRefResponse>(refUrl, token)
}

async function resolveBranchRef(baseUrl: string, token: string, branch: string) {
  try {
    const ref = await getRefSha(baseUrl, token, branch)
    return { ref, branch }
  } catch (error) {
    if (!(error instanceof GitHubApiError) || error.status !== 404) {
      throw error
    }

    let defaultBranch = ''
    try {
      const repoInfo = await githubRequest<GitHubRepoResponse>(baseUrl, token)
      defaultBranch = normalizeBranch(repoInfo.default_branch || '')
    } catch (repoError) {
      throw new Error(
        `GitHub ref not found for branch "${branch}" and repo lookup failed. Check owner/repo/token.`
      )
    }

    if (!defaultBranch || defaultBranch === branch) {
      throw new Error(`GitHub ref not found for branch "${branch}".`)
    }

    const fallbackRef = await getRefSha(baseUrl, token, defaultBranch)
    return { ref: fallbackRef, branch: defaultBranch }
  }
}

export async function commitSiteDataToGitHub(nextData: SiteData): Promise<void> {
  const env = getGitHubEnv()
  if (!env) {
    throw new Error('Missing GitHub environment configuration.')
  }

  const baseUrl = `https://api.github.com/repos/${env.owner}/${env.repo}`
  const { ref, branch: resolvedBranch } = await resolveBranchRef(baseUrl, env.token, env.branch)
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

  const updateRefUrl = `${baseUrl}/git/refs/heads/${encodeURIComponent(resolvedBranch)}`
  await githubRequest(updateRefUrl, env.token, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha, force: false }),
  })
}
