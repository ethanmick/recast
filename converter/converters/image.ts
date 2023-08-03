import { exec as execAsync } from 'child_process'
import { randomUUID } from 'crypto'
import { readFile, writeFile } from 'fs/promises'
import { promisify } from 'util'
import { Converter } from './def'
const exec = promisify(execAsync)

export const PNG_TO_JPG: Converter = async (buf) => {
  // conversion
  const file = randomUUID()
  await writeFile(`/tmp/${file}.png`, buf)
  await exec(`magick /tmp/${file}.png /tmp/${file}.jpg`)
  return readFile(`/tmp/${file}.jpg`)
}
PNG_TO_JPG.from = 'png'
PNG_TO_JPG.to = 'jpg'
