import { Meta } from '@/lib/blog'
import { readdir } from 'fs/promises'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { join } from 'path'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { meta }: { meta: Meta } = require(`../../../blog/${params.slug}.mdx`)
  const title = `${meta.title} - Recast`
  const image = `https://recastfile.com${meta.image}`
  return {
    title: title,
    description: meta.excerpt,
    openGraph: {
      title: title,
      type: 'website',
      description: meta.excerpt,
      images: [image],
      url: `https://recastfile.com/blog/${params.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

const BlogHeader = ({ meta }: { meta: Meta }) => (
  <header className="mb-12">
    <div className="text-center text-sm text-neutral-600">
      {new Date(meta.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
    </div>
    <h1 className="text-5xl [text-wrap:balance] text-center my-4">
      {meta.title}
    </h1>
    <div className="flex items-center justify-center mb-8">
      <Image
        className="rounded-full"
        src={meta.author.image}
        width={40}
        height={40}
        alt={meta.author.name}
      />
      <div className="ml-2 font-semibold text-neutral-800">
        <div>{meta.author.name}</div>
      </div>
    </div>
    <Image
      width={0}
      height={0}
      sizes="100vw"
      className="rounded-2xl"
      style={{ width: '100%', height: 'auto' }} // optional
      src={meta.image}
      unoptimized
      alt={meta.title}
    />
  </header>
)

export default async function ({ params }: Props) {
  const { meta }: { meta: Meta } = require(`../../../blog/${params.slug}.mdx`)
  const Content = dynamic(() => import(`../../../blog/${params.slug}.mdx`))
  return (
    <>
      <article className="mx-auto">
        <BlogHeader meta={meta} />
        <div className="mx-auto prose lg:prose-lg">
          <Content />
        </div>
      </article>
    </>
  )
}

export async function generateStaticParams() {
  const files = await readdir(join(process.cwd() + '/blog'))
  return files.map((file) => ({
    slug: file.replace('.mdx', ''),
  }))
}
