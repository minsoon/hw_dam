import { Sort, SortValue } from '@/shared/ui/sort'
import { useCollectionStore } from '../../model/collectionStore'
import styles from './detail.module.scss'

const Toolbar = ({ isShare, isNumericId }: { isShare: boolean; isNumericId: boolean }) => {
  const { collectionDetail, setCollectionDetailParams } = useCollectionStore()
  const handleSort = (value: SortValue) => {
    setCollectionDetailParams({ sort: value })
  }
  return (
    <div className={`${styles.toolbar} ${!isNumericId ? styles.darkToolbar : ''}`}>
      <div>{collectionDetail?.assets?.length} assets</div>
      {!isShare && (
        <div>
          <Sort onChange={handleSort} />
        </div>
      )}
    </div>
  )
}

export default Toolbar
