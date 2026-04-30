import { NextResponse } from 'next/server'
import type { SiteData } from '@/lib/site-data-types'
import { writeSiteData } from '@/lib/site-data'

type JsonRecord = Record<string, unknown>

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isSiteData(value: unknown): value is SiteData {
  if (!isRecord(value)) return false

  const { projects, experience, achievements, stack, writing, blogPosts, socialLinks, resume } = value

  if (!Array.isArray(projects)) return false
  if (!Array.isArray(experience)) return false
  if (!Array.isArray(achievements)) return false
  if (!Array.isArray(writing)) return false
  if (!Array.isArray(blogPosts)) return false
  if (!Array.isArray(socialLinks)) return false

  if (!isRecord(stack)) return false
  if (!isStringArray(stack.languages)) return false
  if (!isStringArray(stack.backend)) return false
  if (!isStringArray(stack.frontend)) return false
  if (!isStringArray(stack.aiml)) return false
  if (!isStringArray(stack.cloud)) return false
  if (!isStringArray(stack.databases)) return false
  if (!isStringArray(stack.exploring)) return false

  if (!isRecord(resume)) return false
  if (typeof resume.path !== 'string') return false
  if (typeof resume.driveLink !== 'string') return false
  if (typeof resume.drivePreviewLink !== 'string') return false
  if (typeof resume.driveDownloadLink !== 'string') return false

  return true
}

export async function POST(req: Request) {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) {
    return NextResponse.json(
      { error: 'ADMIN_PASSWORD is not set.' },
      { status: 500 }
    )
  }

  let payload: JsonRecord
  try {
    payload = (await req.json()) as JsonRecord
  } catch (error) {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 })
  }

  const password = payload.password
  if (typeof password !== 'string') {
    return NextResponse.json({ error: 'Password is required.' }, { status: 400 })
  }

  if (password !== adminPassword) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  if (!isSiteData(payload.data)) {
    return NextResponse.json({ error: 'Invalid site data.' }, { status: 400 })
  }

  await writeSiteData(payload.data)

  return NextResponse.json({ success: true })
}
