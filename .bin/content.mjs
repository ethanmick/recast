#!/usr/bin/env zx

// npm i -g zx

import 'zx/globals'
import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessageRoleEnum,
} from 'openai'
import { writeFile } from 'fs/promises'
import slugify from 'slugify'

const { NOTION_API_TOKEN, OPENAI_API_TOKEN } = $.env

const apiConfig = new Configuration({
  apiKey: OPENAI_API_TOKEN,
})

const openai = new OpenAIApi(apiConfig)

const { Client } = require('@notionhq/client')
const notion = new Client({
  auth: NOTION_API_TOKEN,
})

const database_id = 'db124cd4fbbc4a04976bb56b01fdb2bb'

const response = await notion.databases.query({
  database_id,
  page_size: 1,
  sorts: [
    {
      property: 'order',
      direction: 'ascending',
    },
  ],
})

const firstPage = response.results[0]
if (!firstPage) {
  console.log('No blog posts to write.')
  process.exit()
}
console.log(firstPage)

const title = firstPage.properties.Name.title[0].plain_text
const prompt = firstPage.properties.Prompt.rich_text?.[0]?.plain_text

const chatResponse = await openai.createChatCompletion({
  model: 'gpt-4',
  messages: [
    {
      role: ChatCompletionRequestMessageRoleEnum.System,
      content: `You are a professional copywriter. You write blog posts for an internet software company. You write cleany and concisely. Never start a blog post with a title. ONLY RESPOND IN MARKDOWN with JUST the content.`,
    },
    {
      role: ChatCompletionRequestMessageRoleEnum.User,
      content: `Write a blog post about: '${title}'. ${prompt ?? ''}`,
    },
  ],
})

const content = chatResponse.data.choices[0].message.content
const slug = slugify(title, { lower: true, strict: true })
const date = new Date().toISOString().split('T')[0]

const meta = `export const meta = {
  title: '${title}',
  date: '${date}',
  excerpt: '',
  image: '/api/og?title=${title}&author=Ethan Mick',
  author: {
    name: 'Ethan Mick',
    image: '/em.png',
  },
}`

const data = `${meta}

${content}`

await writeFile(path.join('blog', `${slug}.mdx`), data, 'utf8')

await cd('blog')
await $`git config user.name "Ethan Mick"`
await $`git config user.email "ethan@ethanmick.com"`
await $`git checkout -b create-blog-post-${date}`
await $`git add ${slug}.mdx`
const commit = `Add blog post: ${title}`
await $`git commit -m ${commit}`
await $`git push origin -u create-blog-post-${date}`
await $`gh pr create --fill`
