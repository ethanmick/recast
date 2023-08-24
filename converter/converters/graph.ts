import { Converter } from './converter'
import imageEdges from './image/edges'
import { mimes } from './mime'
import { Edge, Mime, Node } from './types'

export class Graph {
  private nodes: Partial<Record<Mime, Node>> = {}

  add(node: Node) {
    this.nodes[node.mime] = node
  }

  register(converter: Converter) {
    const from = this.nodes[converter.from]
    const to = this.nodes[converter.to]
    if (!from || !to) {
      throw new Error(`Cannot find node ${converter.from} or ${converter.to}`)
    }
    from.edges = from.edges ?? []
    from.edges.push({ converter, from, to })
  }

  registerAll(converters: Converter[]) {
    converters.forEach((converter) => this.register(converter))
  }

  findPath(from: Mime, to: Mime) {
    const visited: Record<string, boolean> = {}
    const queue: { node: Node; path: Edge[] }[] = []
    const first = this.nodes[from]
    if (!first) {
      throw new Error(`Cannot find node ${from}`)
    }

    queue.push({ node: first, path: [] })
    visited[from] = true

    while (queue.length > 0) {
      const current = queue.shift()
      if (!current) {
        return null
      }

      if (current.node.mime === to) {
        return current.path
      }

      const edges = current.node.edges ?? []
      for (const edge of edges) {
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
}

export const create = (): Graph => {
  const graph = new Graph()

  // @ts-ignore
  Object.entries(mimes).forEach(([mime, value]: [Mime, MimeValue]) =>
    graph.add({ mime, ...value })
  )

  for (const e of imageEdges) {
    graph.register(e)
  }

  return graph
}
