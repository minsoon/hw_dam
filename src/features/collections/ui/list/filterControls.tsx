import { useCallback, useState } from 'react'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { useCollectionTagsQuery } from '@/features/collections/model/useCollectionQuery'
import { mapToSelectOptions } from '@/shared/lib/optionMappers'
import { SelectChecked } from '@/shared/ui/selectChecked'
import { Sort, type SortValue } from '@/shared/ui/sort'
import styles from './filterControls.module.scss'

export const FilterControls = () => {
  const { collectionTags, setCollectionParams } = useCollectionStore()
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const handleChange = useCallback(
    () => (value: number[]) => {
      setSelectedTags(value)
      setCollectionParams({ tag_ids: value.join(','), page: 1 })
    },
    [setCollectionParams]
  )

  const handleSortChange = useCallback(
    (value: SortValue) => {
      setCollectionParams({ sort: value })
    },
    [setCollectionParams]
  )

  useCollectionTagsQuery()

  return (
    <div className={styles.filterControls}>
      <div className={styles.filter}>
        <SelectChecked
          title='Collection tags'
          options={mapToSelectOptions(collectionTags, 'tag_id', 'tag_name')}
          onChange={handleChange}
          value={selectedTags}
        />
      </div>
      <Sort onChange={handleSortChange} />
    </div>
  )
}
