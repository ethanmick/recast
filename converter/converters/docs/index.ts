import { exec as execAsync } from 'child_process'
import { randomUUID } from 'crypto'
import { mkdir, readFile, readdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { promisify } from 'util'
import { mimeToFileExtension } from '../../../lib/file'
import { Converter } from '../../types'
import { nodes } from './nodes'
const exec = promisify(execAsync)

const _converters: Array<Converter> = []

export class PandocConverter extends Converter {
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
    return ''
  }

  public output(): string {
    return `output.${mimeToFileExtension(this.to)}`
  }

  public outputOptions(): string {
    return `${this.toNode.options?.outputs ?? ''} -s -o`
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
        const name = `${randomUUID()}.${mimeToFileExtension(this.from)}`
        return writeFile(join(this.cwd, name), b).then(() => name)
      })
    )
  }

  async postWrite() {}

  async preConvert() {}

  async execute() {
    console.log(
      'Executing',
      `pandoc ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
    )
    await exec(
      `pandoc ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
      {
        cwd: this.cwd,
      }
    )
  }

  async postConvert() {}

  async preRead() {}

  async read() {
    const outputs = (await readdir(this.cwd)).filter(
      (f) => !this.inputs.includes(f)
    )
    this.outputBuffers = await Promise.all(
      outputs.map((f) => readFile(`${this.cwd}/${f}`))
    )
  }

  async postRead() {}
}

//

export class PDF2DocXConverter extends Converter {
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
    return ''
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
        const name = `${randomUUID()}.${mimeToFileExtension(this.from)}`
        return writeFile(join(this.cwd, name), b).then(() => name)
      })
    )
  }

  async postWrite() {}

  async preConvert() {}

  async execute() {
    console.log(
      'Executing',
      `pdf2docx convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`
    )
    await exec(
      `pdf2docx convert ${this.inputOptions()} ${this.input()} ${this.outputOptions()} ${this.output()}`,
      {
        cwd: this.cwd,
      }
    )
  }

  async postConvert() {}

  async preRead() {}

  async read() {
    const outputs = (await readdir(this.cwd)).filter(
      (f) => !this.inputs.includes(f)
    )
    this.outputBuffers = await Promise.all(
      outputs.map((f) => readFile(`${this.cwd}/${f}`))
    )
  }

  async postRead() {}
}

//

for (const from of nodes) {
  for (const to of nodes) {
    if (from.mime === 'application/pdf') {
      continue
    }
    _converters.push(new PandocConverter(from, to))
  }
}

_converters.push(new PDF2DocXConverter(nodes[2], nodes[3]))

export const converters = _converters
