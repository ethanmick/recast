'use client'

import { cn, container } from '@/lib/utils'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Logo } from './logo'
import Button from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

const links = [
  {
    label: 'Blog',
    href: '/blog',
  },
]

export const Header = () => {
  const [border, setBorder] = useState('border-transparent')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setBorder(latest > 20 ? 'border-black/10' : 'border-transparent')
  })

  return (
    <header
      className={cn(
        'transition sticky top-0 backdrop-blur-md z-50 border-b duraiton-300 flex items-center py-2',
        border
      )}
    >
      <nav className={container('flex items-center w-full')}>
        <Logo />
        <span className="flex-grow" />
        <Menu />
        <Mobile />
      </nav>
    </header>
  )
}

function Menu() {
  return (
    <div className="hidden md:block">
      <ol>
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ol>
    </div>
  )
}

function Mobile() {
  return (
    <div className="block md:hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="icon">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div>
            <ol className="flex flex-col">
              {links.map((link) => (
                <li key={link.href} className="">
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ol>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
