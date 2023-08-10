import { Header } from '@/components/header'
import { Conversions } from './conversions'

type Props = {
  params: {
    id: string
  }
}

export default async function ({ params }: Props) {
  return (
    <>
      <Header />
      <main>
        <h1>Converting</h1>
        <Conversions />
      </main>
    </>
  )
}
