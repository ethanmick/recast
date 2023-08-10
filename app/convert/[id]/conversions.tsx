'use client'

import { ConversionListItem } from '@/components/files/conversion-list-item'
import { useConversions } from '@/components/files/provider'
import { useEffect } from 'react'

export const Conversions = () => {
  const { conversions, convert } = useConversions()

  useEffect(() => {
    convert()
  }, [])

  return (
    <ul className="bg-white/80 backdrop-blur-lg">
      {conversions.map((conversion, key) => (
        <ConversionListItem
          conversion={conversion}
          key={key}
          onConvertTo={() => {}}
          onRemove={() => {}}
        />
      ))}
    </ul>
  )
}
