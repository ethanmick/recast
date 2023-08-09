'use client'

import { KawaseBlurFilter } from '@pixi/filter-kawase-blur'
import { Container, Graphics, Stage, useApp, useTick } from '@pixi/react'
import { motion } from 'framer-motion'
import { Graphics as IGraphics } from 'pixi.js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createNoise2D } from 'simplex-noise'

const noise2D = createNoise2D()

// return a random number within a range
function random(min: number, max: number) {
  return Math.random() * (max - min) + min
}

// map a number from 1 range to another
function map(
  n: number,
  start1: number,
  end1: number,
  start2: number,
  end2: number
) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
}

function width() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  )
}

function height() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  )
}

type CircleProps = {
  fill: number
}

const Circle = ({ fill }: CircleProps) => {
  const inc = 0.00005

  const bounds = useMemo(() => {
    const vw = Math.max(document.documentElement.clientWidth || 0)
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    )
    return {
      x: {
        min: 0,
        max: vw,
      },
      y: {
        min: 100,
        max: vh,
      },
    }
  }, [window.screen.width, window.screen.height])

  const [data, setData] = useState(() => ({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    scale: 1,
    radius: 200,
    xOff: random(0, 1000),
    yOff: random(0, 1000),
  }))

  useTick(() => {
    const xNoise = noise2D(data.xOff, data.xOff)
    const yNoise = noise2D(data.yOff, data.yOff)
    const scaleNoise = noise2D(data.xOff, data.yOff)

    setData((data) => ({
      radius: data.radius,
      x: map(xNoise, -1, 1, bounds.x.min, bounds.x.max),
      y: map(yNoise, -1, 1, bounds.y.min, bounds.y.max),
      scale: map(scaleNoise, -1, 1, 0.5, 1),
      xOff: data.xOff + inc,
      yOff: data.yOff + inc,
    }))
  })

  const draw = useCallback(
    (g: IGraphics) => {
      g.alpha = 0.8
      g.x = data.x
      g.y = data.y
      // g.scale.set(data.scale)
      g.clear()
      g.beginFill(fill)
      g.drawCircle(0, 0, data.radius)
      g.endFill()
    },
    [data]
  )

  return <Graphics draw={draw} />
}

const Resizer = () => {
  const app = useApp()

  function resize() {
    const vw = Math.max(document.documentElement.clientWidth || 0)
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0,
      600 // min height
    )
    app.renderer.resize(vw, vh)
    app.queueResize()
  }

  useEffect(() => {
    resize()
  }, [app])

  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  })

  return null
}

const filter = new KawaseBlurFilter(30, 10, true)

export default function HeroBackground() {
  const vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  )
  const vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  )
  return (
    <div className="z-[-1] relative">
      <motion.div
        className="absolute inset-0"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 10,
          },
        }}
      >
        <Stage
          className=" inset-0"
          options={{
            // resizeTo: window,
            backgroundAlpha: 0,
            antialias: true,
          }}
        >
          <Resizer />
          <Container filters={[filter]}>
            <Circle fill={0x10b981} />
            <Circle fill={0x5eead4} />
            <Circle fill={0x22d3ee} />
          </Container>
        </Stage>
      </motion.div>
    </div>
  )
}
