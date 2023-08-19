import { exec as execAsync } from 'child_process'
import { randomUUID } from 'crypto'
import { readFile, writeFile } from 'fs/promises'
import { extension } from 'mime-types'
import { promisify } from 'util'
import { Converter } from '../def'
import { formats } from './formats'
const exec = promisify(execAsync)

export const buildConverter = (
  from: string,
  to: string,
  params?: string
): Converter => {
  const converter: Converter = async (bufs: Buffer[]) => {
    const file = randomUUID()
    await writeFile(`/tmp/${file}.${extension(from)}`, bufs[0])
    await exec(
      `convert /tmp/${file}.${extension(from)} ${
        params ?? ''
      } /tmp/${file}.${extension(to)}`
    )
    const data = await readFile(`/tmp/${file}.${extension(to)}`)
    return [data]
  }
  converter.from = from
  converter.to = to
  return converter
}

const _converters: Array<Converter> = []

for (const from of formats) {
  for (const to of formats) {
    if (from.mime === to.mime) {
      continue
    }
    _converters.push(buildConverter(from.mime, to.mime, to.params))
  }
}

export const converters = _converters
