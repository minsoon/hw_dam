import { useCallback } from 'react'
import { Button, Tag } from 'antd'
import { useAssetStore } from '@/features/assets/model/assetsStore'
import { useAssetFilterSubmit } from '@/features/assets/model/useAssetFilterSubmit'
import styles from './filterSummary.module.scss'

export const FilterSummary = () => {
  const { pagination, filters, removeFilter } = useAssetStore()
  const submitFilters = useAssetFilterSubmit()
  const handleClose = useCallback(
    (key: string) => {
      removeFilter(key)
      submitFilters()
    },
    [removeFilter, submitFilters]
  )

  const handleClearAll = useCallback(() => {
    removeFilter(null)
    submitFilters()
  }, [removeFilter, submitFilters])

  const hasFilters =
    filters &&
    Object.keys(filters).some(key => {
      const val = filters[key]
      return Array.isArray(val) ? val.length > 0 : Boolean(val)
    })

  return (
    <div className={styles.filterSummary}>
      <span>{pagination.total} assets</span>
      {hasFilters && (
        <>
          <div className={styles.filterBy}>
            Filter by:
            <div className={styles.tags}>
              {Object.entries(filters).map(([key, filter]) => (
                <Tag
                  key={key}
                  closable
                  onClose={e => {
                    e.preventDefault()
                    handleClose(key)
                  }}
                  className={styles.tag}
                >
                  {filter.title}
                </Tag>
              ))}
            </div>
          </div>
          <Button className={styles.clearAllBtn} color='default' variant='link' onClick={handleClearAll}>
            Clear all
          </Button>
        </>
      )}
    </div>
  )
}
