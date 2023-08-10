'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Button from '../ui/button'
import { ConversionListItem } from './conversion-list-item'
import { convert } from './convert'
import { useConversions } from './provider'

export const Manager = () => {
  const router = useRouter()
  const { conversions, updateConversion, removeConversion } = useConversions()

  return (
    <AnimatePresence>
      {conversions.length > 0 && (
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-lg p-2 m-2"
          initial={{
            opacity: 0,
            transform: 'translateY(50px)',
          }}
          animate={{
            opacity: 1,
            transform: 'translateY(0px)',
            transition: {
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            transform: 'translateY(50px)',
          }}
        >
          <h2 className="text-lg font-medium text-neutral-900">
            Files to convert
          </h2>
          <ul className="bg-white/80 backdrop-blur-lg">
            {conversions.map((conversion, key) => (
              <ConversionListItem
                conversion={conversion}
                key={key}
                onRemove={() => removeConversion(key)}
                onConvertTo={(to) => {
                  updateConversion(key, { to })
                }}
              />
            ))}
          </ul>
          <div className="flex justify-center">
            <form action={convert}>
              <Button type="submit">Convert</Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
