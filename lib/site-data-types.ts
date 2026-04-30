import projectData from '@/data/project-data.json'
import experienceData from '@/data/experience-data.json'
import achievementData from '@/data/achievement-data.json'
import stackData from '@/data/stack-data.json'
import writingData from '@/data/writing-data.json'
import blogData from '@/data/blog-data.json'
import socialData from '@/data/social-data.json'
import resumeData from '@/data/resume-data.json'

export type SiteData = {
	projects: typeof projectData.projects
	experience: typeof experienceData.experience
	achievements: typeof achievementData.achievements
	stack: typeof stackData.stack
	writing: typeof writingData.writing
	blogPosts: typeof blogData.blogPosts
	socialLinks: typeof socialData.socialLinks
	resume: typeof resumeData.resume
}

export const DEFAULT_SITE_DATA: SiteData = {
	projects: projectData.projects,
	experience: experienceData.experience,
	achievements: achievementData.achievements,
	stack: stackData.stack,
	writing: writingData.writing,
	blogPosts: blogData.blogPosts,
	socialLinks: socialData.socialLinks,
	resume: resumeData.resume,
}
