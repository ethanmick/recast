import { Header } from '@/components/header'
import { container } from '@/lib/utils'
import Link from 'next/link'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className={container('py-2')}>
        <Link className="font-semibold text-xl hover:underline" href="/blog">
          Blog
        </Link>
      </div>
      <main className={container('mt-8')}>{children}</main>
    </>
  )
}
