import { Header } from '@/components/header'
import { container } from '@/lib/utils'
import { Title } from '../title'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Title />
      <main className={container('mt-8')}>{children}</main>
    </>
  )
}
