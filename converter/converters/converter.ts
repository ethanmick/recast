import { exec as execAsync } from 'child_process'
import { randomUUID } from 'crypto'
import { mkdir, readFile, readdir, writeFile } from 'fs/promises'
import { join } from 'path'
import { promisify } from 'util'
import { mimeToFileExtension } from './mime'
import { Mime, Node } from './types'
const exec = promisify(execAsync)

export abstract class Converter {
  abstract get from(): Mime
  abstract get to(): Mime

  constructor(readonly fromNode: Node, readonly toNode: Node) {}

  abstract convert(buffers: Buffer[]): Promise<Buffer[]>

  public log = (...args: any[]) => console.log(...args)
}

type ExecutionConverterOptions = {
  dir?: string
}

/**
 * A converter that uses a command line tool to convert files.
 */
export abstract class ExecutionConverter extends Converter {
  get from(): Mime {
    return this.fromNode.mime
  }
  get to(): Mime {
    return this.toNode.mime
  }

  private dir = '/tmp'

  constructor(
    readonly fromNode: Node,
    readonly toNode: Node,
    options?: ExecutionConverterOptions
  ) {
    super(fromNode, toNode)
    this.dir = options?.dir ?? this.dir
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
    const cwd = join(this.dir, randomUUID())
    await mkdir(cwd, { recursive: true })
    this.cwd = cwd
    this.log('Conversion directory', cwd)
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

  abstract execute(): void

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
