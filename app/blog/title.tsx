'use client'

import { container } from '@/lib/utils'
import { motion, useScroll, useTransform } from 'framer-motion'

export const Title = () => {
  const { scrollY } = useScroll()
  const scale = useTransform(scrollY, [0, 200], [5.6, 1])
  const y = useTransform(scrollY, [0, 200], [70, 0])
  const x = useTransform(scrollY, [0, 200], [20, 0])
  return (
    <div className="h-[240px] sticky top-[65px] text-xl z-20">
      <div className="bg-white/80 backdrop-blur-md">
        <div className={container('py-2')}>
          <motion.h1
            style={{
              y,
              x,
              scale,
            }}
            className="font-medium origin-left"
          >
            The Data Dispatch
          </motion.h1>
        </div>
      </div>
    </div>
  )
}
