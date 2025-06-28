// import { Tag, Button } from 'antd'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import styles from './filterSummary.module.scss'

export const FilterSummary = () => {
  const { pagination } = useCollectionStore()
  // const handleClose = (key: string) => {
  //   removeFilter(key)
  // }

  // const hasFilters =
  //   filters &&
  //   Object.keys(filters).some(key => {
  //     const val = filters[key]
  //     return Array.isArray(val) ? val.length > 0 : Boolean(val)
  //   })

  return (
    <div className={styles.filterSummary}>
      <span>{pagination.total} collections</span>
      {/* {hasFilters && (
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
          <Button className={styles.clearAllBtn} color='default' variant='link' onClick={() => removeFilter(null)}>
            Clear all
          </Button>
        </>
      )} */}
    </div>
  )
}
