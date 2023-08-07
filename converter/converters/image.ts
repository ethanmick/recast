import { exec as execAsync } from 'child_process'
import { randomUUID } from 'crypto'
import { readFile, writeFile } from 'fs/promises'
import { extension, lookup } from 'mime-types'
import { promisify } from 'util'
import { Converter } from './def'
const exec = promisify(execAsync)

const formats = ['jpg', 'png', 'gif', 'webp', 'tiff', 'bmp', 'heic', 'heif']

const buildConverter = (from: string, to: string): Converter => {
  const converter: Converter = async (buf) => {
    const file = randomUUID()
    await writeFile(`/tmp/${file}.${extension(from)}`, buf)
    await exec(
      `convert /tmp/${file}.${extension(from)} /tmp/${file}.${extension(to)}`
    )
    return readFile(`/tmp/${file}.${extension(to)}`)
  }
  converter.from = from
  converter.to = to
  return converter
}

for (const from of formats) {
  for (const to of formats) {
    const fromMime = lookup(from)
    const toMime = lookup(to)
    if (!fromMime || !toMime) {
      throw new Error(`Could not find mime type for ${from} or ${to}`)
    }
    if (from === to) {
      continue
    }
    exports[`${from.toUpperCase()}_TO_${to.toUpperCase()}`] = buildConverter(
      fromMime,
      toMime
    )
  }
}
