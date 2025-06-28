'use client'

import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { CollectionsCard } from '@/features/collections/ui/card/collectionCard'
import { CustomPagination } from '@/shared/ui/pagination'
import styles from './cardList.module.scss'

export const CollectionCardList = ({ refetch }: { refetch: () => void }) => {
  const { collections, pagination, setCurrentPage } = useCollectionStore()
  const { currentPage, total } = pagination

  return (
    <div className={styles.assetList}>
      {collections.length > 0 ? (
        <>
          <div className={styles.assetGrid}>
            {collections.map(collection => (
              <CollectionsCard key={collection.collection_id} item={collection} refetch={refetch} />
            ))}
          </div>

          <CustomPagination
            currentPage={currentPage}
            pageSize={pagination.limit}
            totalPages={total}
            onChange={setCurrentPage}
          />
        </>
      ) : (
        <div className={styles.noData}>No Data</div>
      )}
    </div>
  )
}
