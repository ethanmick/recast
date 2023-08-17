import { getBlogPosts } from '@/lib/blog'
import { Feed } from 'feed'
import { NextResponse } from 'next/server'

const feed = new Feed({
  title: 'The Data Dispatch',
  description: 'The Data Dispatch by Recast',
  id: 'https://recastfile.com/',
  link: 'https://recastfile.com/blog',
  language: 'en',
  favicon: 'https://recastfile.com/icon.png',
  copyright: 'All rights reserved',
  author: {
    name: 'Ethan Mick',
  },
})

export async function GET() {
  const posts = await getBlogPosts()
  for (const post of posts) {
    const link = `https://recastfile.com/blog/${post.href}`
    feed.addItem({
      title: post.title,
      id: link,
      link: link,
      description: post.excerpt,
      content: post.excerpt,
      author: [
        {
          name: post.author.name,
        },
      ],
      date: post.date,
    })
  }

  return new NextResponse(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
