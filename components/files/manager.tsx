'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { z } from 'zod'
import Button from '../ui/button'
import { ConversionListItem } from './conversion-list-item'
import { useConversions } from './provider'

const schema = z.array(
  z.object({
    to: z.string(),
  })
)

export const Manager = () => {
  const { conversions, updateConversion, removeConversion } = useConversions()

  const validate = () => {
    const result = schema.safeParse(conversions)
    console.log('Result', result)
    if (!result.success) {
      for (const issue of result.error.issues) {
        updateConversion(issue.path[0], {
          error: issue.message,
        })
        console.log(issue)
      }
    }
  }

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
                  updateConversion(key, { to, error: undefined })
                }}
              />
            ))}
          </ul>
          <div className="flex justify-center">
            <Button
              onClick={() => {
                validate()
              }}
              type="submit"
            >
              Convert
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
