import { container } from '@/lib/utils'
import Link from 'next/link'
import { Logo } from './logo'

const links = [
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'Contact Us',
    href: '/contact',
  },
]

const social = [
  {
    label: 'Twitter',
    href: 'https://twitter.com/recast_file',
  },
  {
    label: 'YouTube',
    href: '#',
  },
  {
    label: 'Facebook',
    href: '#',
  },
  {
    label: 'Instagram',
    href: '#',
  },
]

export const Footer = () => {
  return (
    <footer className="py-20">
      <div className={container()}>
        <div className="py-8">
          <Logo />
        </div>
        <div className="grid grid-cols-2">
          <div className="space-y-2">
            <div className="text-lg uppercase text-neutral-800">About</div>
            <ul className="text-neutral-600 space-y-1">
              {links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-2">
            <div className="text-lg uppercase text-neutral-800">Follow Us</div>
            <ul className="text-neutral-600 space-y-1">
              {social.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
