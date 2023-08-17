'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { z } from 'zod'
import Button from '../ui/button'
import { ConversionListItem } from './conversion-list-item'
import { UXConversionStatus, useConversions } from './provider'

const schema = z.array(
  z.object({
    to: z.object({
      mime: z.string(),
      ext: z.string(),
    }),
  })
)

export const Manager = () => {
  const { convert, conversions, updateConversion, removeConversion } =
    useConversions()

  const validate = () => {
    const result = schema.safeParse(conversions)
    if (!result.success) {
      for (const issue of result.error.issues) {
        console.log(issue)
        updateConversion(issue.path[0] as number, {
          error: issue.message,
        })
      }
      return
    }
    console.log('Convert')
    convert()
  }

  return (
    <AnimatePresence>
      {conversions.length > 0 && (
        <motion.div
          className="bg-white/80 backdrop-blur-md rounded-lg m-2"
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
                onUpdate={(c) => updateConversion(key, c)}
                onConvertTo={(to) => {
                  updateConversion(key, { to })
                }}
              />
            ))}
          </ul>
          <div className="flex justify-center py-2">
            <Button
              onPress={() => {
                validate()
              }}
              type="submit"
              disabled={conversions.some(
                (conversion) => conversion.status != UXConversionStatus.Pending
              )}
            >
              Convert
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
