'use client'

import { ConversionProvider } from '@/components/files/provider'
import { NextUIProvider } from '@nextui-org/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ConversionProvider>{children}</ConversionProvider>
    </NextUIProvider>
  )
}
