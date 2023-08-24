import Types from './mime.json'

export type MimeValue = {
  extensions: string[]
}

export type Mime = keyof typeof Types

export interface Options {
  inputs?: string
  outputs?: string
}

export type Node = {
  mime: Mime
  options?: Options
  edges?: Edge[]
}

export type Edge = {
  converter: Converter
  from: Node
  to: Node
}

export abstract class Converter {
  abstract get from(): Mime
  abstract get to(): Mime

  constructor(readonly fromNode: Node, readonly toNode: Node) {}

  abstract convert(buffers: Buffer[]): Promise<Buffer[]>

  public log = (...args: any[]) => console.log(...args)
}
