'use client'

import { container } from '@/lib/utils'
import { motion, useScroll, useTransform } from 'framer-motion'

const minValue: number = 1
const maxValue: number = 5.6
const max = 1024

const getScale = (screenWidth: number): [number, number] => {
  const percentage = Math.min((screenWidth - 30) / max, 1)
  return [maxValue * percentage, 1]
}

export default function Title() {
  const { scrollY } = useScroll()
  const scale = useTransform(scrollY, [0, 200], getScale(window.screen.width))
  const y = useTransform(scrollY, [0, 200], [70, 0])
  const x = useTransform(scrollY, [0, 200], [20, 0])
  return (
    <div className="h-[240px] sticky top-[65px] text-xl z-20 overflow-x-hidden">
      <div className="bg-white/60 backdrop-blur-md">
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
