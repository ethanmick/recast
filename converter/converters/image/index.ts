import { exec as execAsync } from 'child_process'
import { randomUUID } from 'crypto'
import { mkdir, readFile, readdir, writeFile } from 'fs/promises'
import { extension } from 'mime-types'
import { join } from 'path'
import { promisify } from 'util'
import { mimeToFileExtension } from '../../../lib/file'
import { Converter, MimeNode } from '../../types'
import { nodes } from './nodes'
const exec = promisify(execAsync)

const _converters: Array<Converter> = []

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export class ImageMagickConverter extends Converter {
  get from(): string {
    return this.fromNode.mime
  }
  get to(): string {
    return this.toNode.mime
  }

  public cwd: string = ''
  public inputs: string[] = []
  public outputBuffers: Buffer[] = []

  public input(): string {
    return this.inputs.join(' ')
  }

  public inputOptions(): string {
    return this.fromNode.options?.inputs ?? ''
  }

  public output(): string {
    return `output.${mimeToFileExtension(this.to)}`
  }

  public outputOptions(): string {
    return this.toNode.options?.outputs ?? ''
  }

  async convert(buffers: Buffer[]): Promise<Buffer[]> {
    await this.preWrite(buffers)
    await this.write(buffers)
    await this.postWrite()
    await this.preConvert()
    await this.execute()
    await this.postConvert()
    await this.preRead()
    await this.read()
    return this.outputBuffers
  }

  async preWrite(buffers: Buffer[]) {
    const cwd = join('/tmp', randomUUID())
    await mkdir(cwd, { recursive: true })
    this.cwd = cwd
    console.log('Conversion directory', cwd)
    return buffers
  }

  async write(buffers: Buffer[]) {
    this.inputs = await Promise.all(
      buffers.map(async (b) => {
        const name = `${randomUUID()}.${extension(this.from)}`
        return writeFile(join(this.cwd, name), b).then(() => name)
      })
    )
  }

  async postWrite() {}

  async preConvert() {}

  async execute() {
    console.log(
      'Executing',
      `convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
    )
    await exec(
      `convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
      {
        cwd: this.cwd,
      }
    )
  }

  async postConvert() {}

  async preRead() {}

  async read() {
    console.log('Inputs', this.inputs)
    const outputs = (await readdir(this.cwd)).filter(
      (f) => !this.inputs.includes(f)
    )
    console.log('Outputs', outputs)
    this.outputBuffers = await Promise.all(
      outputs.map((f) => readFile(`${this.cwd}/${f}`))
    )
  }

  async postRead() {}
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

export class PdfToConverter extends ImageMagickConverter {
  override get from() {
    return 'application/pdf'
  }

  constructor(to: MimeNode) {
    super({ mime: 'application/pdf' }, to)
  }

  override output() {
    const ext = mimeToFileExtension(this.to)
    return `output.${ext}`
  }
}

for (const to of nodes) {
  if (to.mime === 'application/pdf') {
    continue
  }
  _converters.push(new PdfToConverter(to))
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

for (const from of nodes) {
  for (const to of nodes) {
    if (from.mime === 'application/pdf') {
      continue
    }
    _converters.push(new ImageMagickConverter(from, to))
  }
}

export const converters = _converters