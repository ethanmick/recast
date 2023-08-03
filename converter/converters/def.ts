export interface Converter {
  (buf: Buffer): Promise<Buffer>
  from: string
  to: string
}
