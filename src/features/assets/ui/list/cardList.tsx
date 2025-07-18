'use client'

import { useMemo } from 'react'
import { useAssetStore } from '@/features/assets/model/assetsStore'
import { AssetsCard } from '@/features/assets/ui/card/assetsCard'
import { CustomPagination } from '@/shared/ui/pagination'
import styles from './assetList.module.scss'

export const CardList = ({ refetch }: { refetch: () => void }) => {
  const { assets, pagination, setCurrentPage } = useAssetStore()
  const { currentPage, total } = pagination

  const assetsCard = useMemo(
    () => assets.map(asset => <AssetsCard key={asset.asset_id} item={asset} refetch={refetch} />),
    [assets, refetch]
  )
  return (
    <div className={styles.assetList}>
      {assets.length > 0 ? (
        <>
          <div className={styles.assetGrid}>{assetsCard}</div>
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
