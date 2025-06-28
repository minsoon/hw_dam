import { useCallback } from 'react'

export const useSelectionActions = <T>(items: T[] | undefined, key: keyof T, setChecked: (ids: number[]) => void) => {
  const selectAll = useCallback(() => {
    const checked = items?.map(item => Number(item[key])) ?? []
    setChecked(checked)
  }, [items, key, setChecked])

  const deselectAll = useCallback(() => {
    setChecked([])
  }, [setChecked])

  return { selectAll, deselectAll }
}
