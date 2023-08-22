export interface Options {
  inputs?: string
  outputs?: string
}

export type MimeNode = {
  mime: string
  options?: Options
}

export abstract class Converter {
  abstract get from(): string
  abstract get to(): string

  constructor(readonly fromNode: MimeNode, readonly toNode: MimeNode) {}

  abstract convert(buffers: Buffer[]): Promise<Buffer[]>
}
