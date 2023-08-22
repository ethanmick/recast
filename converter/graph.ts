import {
  converters as ImageConverters,
  nodes as ImageNodes,
} from './converters/image/converters'
import { Converter, MimeNode } from './types'

const converters: Converter[] = [...ImageConverters]

type Edge = {
  converter: Converter
  from: GraphNode
  to: GraphNode
}

type GraphNode = MimeNode & {
  edges: Edge[]
}

const nodes: Record<string, GraphNode> = {}
for (const node of ImageNodes) {
  nodes[node.mime] = { ...node, edges: [] }
}

for (const converter of converters) {
  const from = nodes[converter.from]
  const to = nodes[converter.to]
  from.edges.push({ converter, from, to })
}

console.log('Graph', nodes)

export { nodes }

export type Path = Edge[] | null

export function findPath(start: string, end: string) {
  const visited: Record<string, boolean> = {}
  const queue: { node: GraphNode; path: Edge[] }[] = []

  queue.push({ node: nodes[start], path: [] })
  visited[start] = true

  while (queue.length > 0) {
    const current = queue.shift()
    // console.log('Graph: Finding path from', current?.node.type)
    if (!current) {
      return null
    }

    if (current.node.mime === end) {
      return current.path
    }

    for (const edge of current.node.edges) {
      if (!visited[edge.to.mime]) {
        queue.push({
          node: edge.to,
          path: [...current.path, edge],
        })

        visited[edge.to.mime] = true
      }
    }
  }

  return null
}
