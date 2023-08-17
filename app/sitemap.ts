import { getBlogPosts } from '@/lib/blog'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()
  return [
    {
      url: 'https://recastfile.com',
      lastModified: new Date(),
    },
    {
      url: 'https://recastfile.com/blog',
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `https://recastfile.com/blog/${post.href}`,
      lastModified: post.date,
    })),
  ]
}
