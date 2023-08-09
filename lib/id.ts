const idsUpdaterMap: Map<string, (v: string) => void> = new Map()

/**
 * Merges two ids.
 * Different ids will trigger a side-effect and re-render components hooked up with `useId`.
 */
export function mergeIds(idA: string, idB: string): string {
  if (idA === idB) {
    return idA
  }

  let setIdA = idsUpdaterMap.get(idA)
  if (setIdA) {
    setIdA(idB)
    return idB
  }

  let setIdB = idsUpdaterMap.get(idB)
  if (setIdB) {
    setIdB(idA)
    return idA
  }

  return idB
}
