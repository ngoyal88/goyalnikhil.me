'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DEFAULT_SITE_DATA, type SiteData } from '@/lib/site-data-types'

type SiteDataContextValue = {
  data: SiteData
  isLoading: boolean
  error: string | null
  refresh: () => Promise<void>
}

const SiteDataContext = createContext<SiteDataContextValue | null>(null)

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(DEFAULT_SITE_DATA)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch('/api/site-data', { cache: 'no-store' })
      if (!response.ok) {
        throw new Error('Failed to load site data.')
      }
      const payload = (await response.json()) as SiteData
      setData(payload)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const value = useMemo(
    () => ({ data, isLoading, error, refresh }),
    [data, isLoading, error, refresh]
  )

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

const fallbackContext: SiteDataContextValue = {
  data: DEFAULT_SITE_DATA,
  isLoading: false,
  error: 'SiteDataProvider is missing.',
  refresh: async () => undefined,
}

export function useSiteData(): SiteDataContextValue {
  return useContext(SiteDataContext) ?? fallbackContext
}
