import { Header } from '@/components/header'
import { container } from '@/lib/utils'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className={container()}>{children}</main>
    </>
  )
}
