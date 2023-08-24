import { create } from './graph'

describe('Graph', () => {
  it('It should have nodes', () => {
    const graph = create()
    expect(graph).toBeDefined()
  })
})
