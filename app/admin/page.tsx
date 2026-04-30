'use client'

import { useCallback, useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/sections/Footer'
import type { SiteData } from '@/lib/site-data-types'

const SECTIONS = [
  { key: 'projects', label: 'projects' },
  { key: 'experience', label: 'experience' },
  { key: 'achievements', label: 'achievements' },
  { key: 'stack', label: 'stack' },
  { key: 'writing', label: 'writing' },
  { key: 'blogPosts', label: 'blog posts' },
  { key: 'socialLinks', label: 'social links' },
  { key: 'resume', label: 'resume' },
] as const

type SectionKey = (typeof SECTIONS)[number]['key']

type StatusMessage = {
  type: 'success' | 'error' | 'info'
  text: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [fullData, setFullData] = useState<SiteData | null>(null)
  const [selectedSection, setSelectedSection] = useState<SectionKey>('projects')
  const [jsonText, setJsonText] = useState('')
  const [drafts, setDrafts] = useState<Partial<Record<SectionKey, string>>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<StatusMessage | null>(null)

  const loadData = useCallback(async () => {
    const response = await fetch('/api/site-data', { cache: 'no-store' })
    if (!response.ok) {
      throw new Error('Failed to load site data.')
    }
    const data = (await response.json()) as SiteData
    setFullData(data)
    setDrafts({})
    setJsonText(JSON.stringify(data[selectedSection], null, 2))
  }, [selectedSection])

  useEffect(() => {
    if (!fullData) return
    const draft = drafts[selectedSection]
    if (draft !== undefined) {
      setJsonText(draft)
      return
    }
    setJsonText(JSON.stringify(fullData[selectedSection], null, 2))
  }, [drafts, fullData, selectedSection])

  const handleUnlock = async () => {
    setIsLoading(true)
    setMessage(null)
    try {
      const response = await fetch('/api/admin/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        const errorText = typeof payload?.error === 'string' ? payload.error : 'Unlock failed.'
        throw new Error(errorText)
      }

      setIsAuthed(true)
      await loadData()
      setMessage({ type: 'success', text: 'Latest data loaded.' })
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Unknown error.'
      setMessage({ type: 'error', text })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReload = async () => {
    if (!isAuthed) return
    setIsLoading(true)
    setMessage(null)
    try {
      await loadData()
      setMessage({ type: 'success', text: 'Latest data loaded.' })
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Unknown error.'
      setMessage({ type: 'error', text })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!isAuthed || !fullData) {
      setMessage({ type: 'error', text: 'Unlock the editor first.' })
      return
    }
    setIsSaving(true)
    setMessage(null)

    let parsed
    try {
      parsed = JSON.parse(jsonText)
    } catch (err) {
      setMessage({ type: 'error', text: 'Invalid JSON. Fix formatting before saving.' })
      setIsSaving(false)
      return
    }

    try {
      const nextData = {
        ...fullData,
        [selectedSection]: parsed,
      } as SiteData

      const response = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, data: nextData }),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}))
        const errorText = typeof payload?.error === 'string' ? payload.error : 'Save failed.'
        throw new Error(errorText)
      }

      setFullData(nextData)
      setDrafts((prev) => ({
        ...prev,
        [selectedSection]: JSON.stringify(parsed, null, 2),
      }))
      setMessage({ type: 'success', text: 'Changes saved.' })
    } catch (err) {
      const text = err instanceof Error ? err.message : 'Unknown error.'
      setMessage({ type: 'error', text })
    } finally {
      setIsSaving(false)
    }
  }

  const messageClass = message?.type === 'error'
    ? 'text-destructive'
    : message?.type === 'success'
      ? 'text-accent'
      : 'text-muted-foreground'

  return (
    <main className="bg-background text-foreground">
      <Navbar />

      <section className="min-h-screen pt-32 px-4 md:px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">admin</h1>
            <p className="text-muted-foreground">
              update your portfolio data in JSON. changes apply after saving.
            </p>
          </div>

          <div className="grid gap-4 rounded border border-border bg-secondary/10 p-4">
            <label className="text-xs font-mono text-muted-foreground" htmlFor="admin-password">
              admin password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your ADMIN_PASSWORD"
              className="rounded border border-border bg-background px-3 py-2 text-sm font-mono text-foreground"
            />

            <div className="flex flex-wrap items-center gap-3">
              {!isAuthed ? (
                <button
                  type="button"
                  onClick={handleUnlock}
                  className="px-4 py-2 rounded border border-accent text-accent font-mono text-xs font-medium hover:bg-accent hover:text-background transition-colors"
                  disabled={isLoading || !password}
                >
                  {isLoading ? 'unlocking...' : 'unlock editor'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleReload}
                  className="px-4 py-2 rounded border border-border text-muted-foreground font-mono text-xs font-medium hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? 'loading...' : 'reload data'}
                </button>
              )}
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 rounded border border-accent text-accent font-mono text-xs font-medium hover:bg-accent hover:text-background transition-colors"
                disabled={isSaving || !isAuthed}
              >
                {isSaving ? 'saving...' : 'save changes'}
              </button>

              <span className="text-xs font-mono text-muted-foreground">
                {jsonText.length.toLocaleString()} chars
              </span>
            </div>

            {message && (
              <p className={`text-xs font-mono ${messageClass}`}>
                {message.text}
              </p>
            )}
          </div>

          {isAuthed && fullData ? (
            <div className="space-y-2">
              <label className="text-xs font-mono text-muted-foreground" htmlFor="data-json">
                {selectedSection} JSON
              </label>

              <div className="flex flex-wrap gap-2">
                {SECTIONS.map((section) => {
                  const isActive = section.key === selectedSection
                  return (
                    <button
                      key={section.key}
                      type="button"
                      onClick={() => setSelectedSection(section.key)}
                      className={
                        isActive
                          ? 'px-3 py-1.5 rounded border border-accent bg-accent/10 text-accent text-xs font-mono'
                          : 'px-3 py-1.5 rounded border border-border text-muted-foreground text-xs font-mono hover:text-foreground'
                      }
                    >
                      {section.label}
                    </button>
                  )
                })}
              </div>

              <textarea
                id="data-json"
                value={jsonText}
                onChange={(event) => {
                  const nextValue = event.target.value
                  setJsonText(nextValue)
                  setDrafts((prev) => ({
                    ...prev,
                    [selectedSection]: nextValue,
                  }))
                }}
                className="min-h-[520px] w-full rounded border border-border bg-background px-4 py-3 text-xs font-mono text-foreground"
                spellCheck={false}
              />
            </div>
          ) : (
            <div className="rounded border border-border bg-secondary/10 p-4 text-xs font-mono text-muted-foreground">
              unlock to view and edit data.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
