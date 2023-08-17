export interface Converter {
  (buffers: Buffer[]): Promise<Buffer[]>
  from: string
  to: string
}
