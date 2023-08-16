import { Meta } from '@/lib/blog'
import { readdir } from 'fs/promises'
import { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { join } from 'path'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata
): Promise<Metadata> {
  const { meta }: { meta: Meta } = require(`../../../blog/${params.slug}.mdx`)
  return {
    title: meta.title,
    description: meta.excerpt,
    openGraph: {
      images: [meta.image],
      type: 'website',
      description: meta.excerpt,
      url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/blog/${params.slug}}`,
    },
    twitter: {
      card: 'summary_large_image',
    },
  }
}

export default async function ({ params }: Props) {
  const { meta }: { meta: Meta } = require(`../../../blog/${params.slug}.mdx`)
  const Content = dynamic(() => import(`../../../blog/${params.slug}.mdx`))
  return (
    <>
      <article className="prose lg:prose-xl mx-auto">
        <h1 className="text-center">{meta.title}</h1>
        <div className="text-center">
          {new Date(meta.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div className="flex items-center justify-center">
          <Image
            className="rounded-full"
            src={meta.author.image}
            width={50}
            height={50}
            alt={meta.author.name}
          />
          <div className="ml-2 font-semibold text-neutral-800">
            <div>{meta.author.name}</div>
          </div>
        </div>
        <Content />
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
