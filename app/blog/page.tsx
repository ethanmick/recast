import { Header } from '@/components/header'
import { Meta } from '@/lib/blog'
import { container } from '@/lib/utils'
import { readdir } from 'fs/promises'
import Image from 'next/image'
import Link from 'next/link'
import { join } from 'path/posix'
import { ReactNode } from 'react'
import { Title } from './title'

type Post = Meta & {
  date: Date
  href: string
}

export const BlogCard = ({ post }: { post: Post }) => {
  return (
    <li>
      <Link
        className="bg-green-100 block rounded-2xl group p-5 space-y-5"
        href={`/blog/${post.href}`}
      >
        <div className="w-full h-[300px] relative overflow-hidden rounded-2xl z-0">
          <Image
            src={post.image}
            className="w-full z-0"
            fill
            objectFit="cover"
            alt={post.title}
          />
        </div>
        <div>
          <div className="text-neutral-900 group-hover:text-neutral-800">
            {post.date.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <h3 className="my-4 text-3xl text-neutral-900 group-hover:text-neutral-800">
            {post.title}
          </h3>
          <p className="text-neutral-800 group-hover:text-neutral-700">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </li>
  )
}

const grid = () => {
  let i = 0
  const areas = ['']
  return function Grid({ children }: { children: ReactNode }) {
    return <div className="grid gap-8">{children}</div>
  }
}

export default async function () {
  const posts: Post[] = (await readdir(join(process.cwd() + '/blog')))
    .map((file) => {
      const { meta }: { meta: Meta } = require(`../../blog/${file}`)
      return {
        ...meta,
        date: new Date(meta.date),
        href: file.replace(/\.mdx$/, ''),
      } as Post
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  console.log(posts)

  const [header, ...rest] = posts

  return (
    <>
      <Header />
      <Title />
      <main className={container('space-y-[5rem]')}>
        <ul className="grid gap-8 grid-cols-1">
          {[header].map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </ul>
        <ul className="grid gap-8 grid-cols-3">
          {rest.map((post) => (
            <BlogCard key={post.title} post={post} />
          ))}
        </ul>
        <div className="h-24" />
        <div className="h-24" />
        <div className="h-24" />
        <div className="h-24" />
        <div className="h-24" />
        <div className="h-24" />
        <div className="h-24" />
        <div className="h-24" />
      </main>
    </>
  )
}
