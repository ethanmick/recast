'use client'

import { load, trackPageview } from 'fathom-client'
import { usePathname, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

function TrackPageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    load('BLOEMVLV', {
      includedDomains: ['www.recastfile.com', 'recastfile.com'],
    })
  }, [])

  // Record a pageview when route changes
  useEffect(() => {
    if (!pathname) return

    trackPageview({
      url: pathname + searchParams.toString(),
      referrer: document.referrer,
    })
  }, [pathname, searchParams])

  return null
}

export default function Fathom() {
  return (
    <Suspense fallback={null}>
      <TrackPageView />
    </Suspense>
  )
}
