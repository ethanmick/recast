import { Mime, Node } from './types'

export abstract class Converter {
  abstract get from(): Mime
  abstract get to(): Mime

  constructor(readonly fromNode: Node, readonly toNode: Node) {}

  abstract convert(buffers: Buffer[]): Promise<Buffer[]>

  public log = (...args: any[]) => console.log(...args)
}
