import { readdir } from 'fs/promises'
import dynamic from 'next/dynamic'
import { join } from 'path'

type Props = {
  params: { slug: string }
}

export default async function ({ params }: Props) {
  console.log('Params', params)

  const Content = dynamic(() => import(`../../../blog/${params.slug}.mdx`))
  console.log('Content', Content)

  return (
    <main>
      Blog Slug Page
      <Content />
    </main>
  )
}

export async function generateStaticParams() {
  // read in the files from blog and use the filename as the slug
  const files = await readdir(join(process.cwd() + '/blog'))
  console.log('Files', files)
  return files.map((file) => ({
    slug: file.replace('.mdx', ''),
  }))
}
