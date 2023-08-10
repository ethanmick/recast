import { Manager } from '@/components/files/manager'

type Props = {
  params: {
    id: string
  }
}

export default async function ({ params }: Props) {
  return (
    <main>
      <h1>Converting</h1>
      <Manager />
    </main>
  )
}
