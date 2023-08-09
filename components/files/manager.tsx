'use client'

import { motion } from 'framer-motion'
import { ConversionListItem } from './conversion-list-item'
import { useConversions } from './provider'

export const Manager = () => {
  const { conversions } = useConversions()

  return conversions.length > 0 ? (
    <motion.div
      initial={{
        opacity: 0,
        top: -20,
      }}
      animate={{
        opacity: 1,
        top: 0,
      }}
      exit={{
        opacity: 0,
        top: -20,
      }}
    >
      <ul className="bg-white/80 backdrop-blur-lg">
        {conversions.map((conversion, key) => (
          <ConversionListItem
            conversion={conversion}
            key={key}
            onRemove={() => {}}
            onConvertTo={() => {}}
          />
        ))}
      </ul>
    </motion.div>
  ) : null
}
