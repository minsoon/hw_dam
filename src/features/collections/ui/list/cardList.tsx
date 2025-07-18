'use client'

import { useMemo } from 'react'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { CollectionsCard } from '@/features/collections/ui/card/collectionCard'
import { CustomPagination } from '@/shared/ui/pagination'
import styles from './cardList.module.scss'

export const CollectionCardList = ({ refetch }: { refetch: () => void }) => {
  const collections = useCollectionStore(state => state.collections)
  const setCurrentPage = useCollectionStore(state => state.setCurrentPage)
  const currentPage = useCollectionStore(state => state.pagination.currentPage)
  const total = useCollectionStore(state => state.pagination.all_count)
  const limit = useCollectionStore(state => state.pagination.limit)

  const collectionsCard = useMemo(() => {
    return collections.map(collection => (
      <CollectionsCard key={collection.collection_id} item={collection} refetch={refetch} />
    ))
  }, [collections, refetch])

  return (
    <div className={styles.assetList}>
      {collections.length > 0 ? (
        <>
          <div className={styles.assetGrid}>{collectionsCard}</div>

          <CustomPagination currentPage={currentPage} pageSize={limit} totalPages={total} onChange={setCurrentPage} />
        </>
      ) : (
        <div className={styles.noData}>No Data</div>
      )}
    </div>
  )
}
