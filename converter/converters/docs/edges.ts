import { Converter } from '../converter'
import { PandocConverter } from './converter'

const edges: Array<Converter> = []

edges.push(
  new PandocConverter(
    { mime: 'text/plain' },
    { mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  )
)

export default edges
