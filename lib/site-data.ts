import fs from 'node:fs/promises'
import path from 'node:path'
import type { SiteData } from '@/lib/site-data-types'
import { commitSiteDataToGitHub, shouldUseGitHubStorage } from '@/lib/github'

const dataDir = path.join(process.cwd(), 'data')
const projectDataPath = path.join(dataDir, 'project-data.json')
const experienceDataPath = path.join(dataDir, 'experience-data.json')
const achievementDataPath = path.join(dataDir, 'achievement-data.json')
const stackDataPath = path.join(dataDir, 'stack-data.json')
const writingDataPath = path.join(dataDir, 'writing-data.json')
const blogDataPath = path.join(dataDir, 'blog-data.json')
const socialDataPath = path.join(dataDir, 'social-data.json')
const resumeDataPath = path.join(dataDir, 'resume-data.json')

type JsonRecord = Record<string, unknown>

function parseJson<T>(raw: string): T {
  return JSON.parse(raw) as T
}

export async function readSiteData(): Promise<SiteData> {
  const [projectsRaw, experienceRaw, achievementsRaw, stackRaw, writingRaw, blogRaw, socialRaw, resumeRaw] =
    await Promise.all([
      fs.readFile(projectDataPath, 'utf8'),
      fs.readFile(experienceDataPath, 'utf8'),
      fs.readFile(achievementDataPath, 'utf8'),
      fs.readFile(stackDataPath, 'utf8'),
      fs.readFile(writingDataPath, 'utf8'),
      fs.readFile(blogDataPath, 'utf8'),
      fs.readFile(socialDataPath, 'utf8'),
      fs.readFile(resumeDataPath, 'utf8'),
    ])

  const projectsData = parseJson<{ projects: SiteData['projects'] }>(projectsRaw)
  const experienceData = parseJson<{ experience: SiteData['experience'] }>(experienceRaw)
  const achievementsData = parseJson<{ achievements: SiteData['achievements'] }>(achievementsRaw)
  const stackData = parseJson<{ stack: SiteData['stack'] }>(stackRaw)
  const writingData = parseJson<{ writing: SiteData['writing'] }>(writingRaw)
  const blogData = parseJson<{ blogPosts: SiteData['blogPosts'] }>(blogRaw)
  const socialData = parseJson<{ socialLinks: SiteData['socialLinks'] }>(socialRaw)
  const resumeData = parseJson<{ resume: SiteData['resume'] }>(resumeRaw)

  return {
    projects: projectsData.projects,
    experience: experienceData.experience,
    achievements: achievementsData.achievements,
    stack: stackData.stack,
    writing: writingData.writing,
    blogPosts: blogData.blogPosts,
    socialLinks: socialData.socialLinks,
    resume: resumeData.resume,
  }
}

function jsonWithNewline(value: JsonRecord): string {
  return `${JSON.stringify(value, null, 2)}\n`
}

export async function writeSiteData(nextData: SiteData): Promise<void> {
  if (shouldUseGitHubStorage()) {
    await commitSiteDataToGitHub(nextData)
    return
  }

  await Promise.all([
    fs.writeFile(projectDataPath, jsonWithNewline({ projects: nextData.projects }), 'utf8'),
    fs.writeFile(experienceDataPath, jsonWithNewline({ experience: nextData.experience }), 'utf8'),
    fs.writeFile(achievementDataPath, jsonWithNewline({ achievements: nextData.achievements }), 'utf8'),
    fs.writeFile(stackDataPath, jsonWithNewline({ stack: nextData.stack }), 'utf8'),
    fs.writeFile(writingDataPath, jsonWithNewline({ writing: nextData.writing }), 'utf8'),
    fs.writeFile(blogDataPath, jsonWithNewline({ blogPosts: nextData.blogPosts }), 'utf8'),
    fs.writeFile(socialDataPath, jsonWithNewline({ socialLinks: nextData.socialLinks }), 'utf8'),
    fs.writeFile(resumeDataPath, jsonWithNewline({ resume: nextData.resume }), 'utf8'),
  ])
}
