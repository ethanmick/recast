import { Converter } from './converters/def'
import { converters as images } from './converters/image/converters'

const converters = [...images]

type Edge = {
  converter: Converter
  from: Node
  to: Node
}

type Node = {
  type: string
  edges: Edge[]
}

const nodes: Record<string, Node> = {}
converters.forEach((converter) => {
  nodes[converter.to] = nodes[converter.to] || {
    type: converter.to,
    edges: [],
  }
  nodes[converter.from] = nodes[converter.from] || {
    type: converter.from,
    edges: [],
  }
  nodes[converter.from].edges.push({
    converter,
    from: nodes[converter.from],
    to: nodes[converter.to],
  })
})

console.log('Graph', nodes)

export { nodes }

export type Path = Edge[] | null

export function findPath(start: string, end: string) {
  const visited: Record<string, boolean> = {}
  const queue: { node: Node; path: Edge[] }[] = []

  queue.push({ node: nodes[start], path: [] })
  visited[start] = true

  while (queue.length > 0) {
    const current = queue.shift()
    // console.log('Graph: Finding path from', current?.node.type)
    if (!current) {
      return null
    }

    if (current.node.type === end) {
      return current.path
    }

    for (const edge of current.node.edges) {
      if (!visited[edge.to.type]) {
        queue.push({
          node: edge.to,
          path: [...current.path, edge],
        })

        visited[edge.to.type] = true
      }
    }
  }

  return null
}
