'use client'

import { cn, container } from '@/lib/utils'
import { useMotionValueEvent, useScroll } from 'framer-motion'
import { MenuIcon } from 'lucide-react'
import { useState } from 'react'
import { Logo } from './logo'
import Button from './ui/button'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'

export const Header = () => {
  const [border, setBorder] = useState('border-transparent')
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setBorder(latest > 20 ? 'border-black/10' : 'border-transparent')
  })

  return (
    <header
      className={cn(
        'transition sticky top-0 backdrop-blur-md z-50 border-b duraiton-300 flex items-center px-6 py-2',
        border
      )}
    >
      <nav className={container('flex items-center w-full')}>
        <Logo />
        <span className="flex-grow" />
        <Mobile />
      </nav>
    </header>
  )
}

function Mobile() {
  return (
    <div className="block md:hidden">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
