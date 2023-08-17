import { readdir } from 'fs/promises'
import { join } from 'path'

export type Meta = {
  title: string
  date: string
  excerpt: string
  image: string
  author: {
    name: string
    image: string
  }
}

export type Post = Meta & {
  date: Date
  href: string
}

export const getBlogPosts = async () => {
  const posts: Post[] = (await readdir(join(process.cwd() + '/blog')))
    .map((file) => {
      const { meta }: { meta: Meta } = require(`../blog/${file}`)
      return {
        ...meta,
        date: new Date(meta.date),
        href: file.replace(/\.mdx$/, ''),
      } as Post
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime())
  return posts
}
