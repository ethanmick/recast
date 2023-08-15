import { Header } from '@/components/header'
import { Meta } from '@/lib/blog'
import { container } from '@/lib/utils'
import { readdir } from 'fs/promises'
import Link from 'next/link'
import { join } from 'path/posix'

export default async function () {
  const posts = (await readdir(join(process.cwd() + '/blog')))
    .map((file) => {
      const { meta }: { meta: Meta } = require(`../../blog/${file}`)
      return {
        ...meta,
        date: new Date(meta.date),
        href: file.replace(/\.mdx$/, ''),
      }
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())

  console.log(posts)

  return (
    <>
      <Header />
      <main className={container('mt-8')}>
        <h1 className="text-center text-4xl font-bold">Blog</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.title} className="py-4">
              <Link href={`/blog/${post.href}`}>
                <div>
                  <div className="text-lg font-semibold">{post.title}</div>
                  <div>
                    <span className="font-semibold">{post.author.name}</span>
                    {' - '}
                    {post.date.toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  )
}
