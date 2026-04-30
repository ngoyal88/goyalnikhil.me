import { NextResponse } from 'next/server'
import { readSiteData } from '@/lib/site-data'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const data = await readSiteData()
    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to read site data.' },
      { status: 500 }
    )
  }
}
