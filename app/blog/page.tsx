import { Post, getBlogPosts } from '@/lib/blog'
import { container } from '@/lib/utils'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

const Title = dynamic(() => import('./title'), {
  ssr: false,
})

const BlogCard = ({ post }: { post: Post }) => {
  return (
    <li>
      <Link
        className="bg-green-100 block rounded-2xl group p-5 space-y-5"
        href={`/blog/${post.href}`}
      >
        <div className="w-full h-[300px] relative overflow-hidden rounded-2xl z-0">
          <Image
            className="w-full z-0 group-hover:scale-105 transition-transform [transition-duration:500ms]"
            unoptimized
            src={post.image}
            fill
            objectFit="cover"
            alt={post.title}
          />
        </div>
        <div>
          <div className="text-neutral-900 group-hover:text-neutral-600">
            {post.date.toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <h3 className="my-4 text-3xl text-neutral-900 group-hover:text-neutral-600">
            {post.title}
          </h3>
          <p className="text-neutral-800 group-hover:text-neutral-600">
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
  const posts = await getBlogPosts()
  const [header, ...rest] = posts

  return (
    <>
      <Title />
      <main className={container('space-y-[5rem] px-4')}>
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
      </main>
    </>
  )
}
