import { useMemo } from 'react'
import { CollectionCard } from '@/features/assets/ui/card/collectionCard'
import { useCollectionStore } from '../../model/collectionStore'
import styles from './detail.module.scss'

const CardList = ({
  isShare,
  hasToken,
  refetch,
  isNumericId,
}: {
  isShare: boolean
  hasToken: boolean
  refetch: () => void
  isNumericId: boolean
}) => {
  const { collectionDetail } = useCollectionStore()
  const collectionAssets = useMemo(() => {
    return collectionDetail?.assets?.map(asset => (
      <CollectionCard
        key={asset.asset_id}
        item={asset}
        isShare={isShare}
        hasToken={hasToken}
        isNumericId={isNumericId}
        refetch={refetch}
      />
    ))
  }, [collectionDetail, isShare, hasToken, isNumericId, refetch])
  return (
    <div className={styles.cardList}>
      <div className={styles.assetGrid}>{collectionAssets}</div>
    </div>
  )
}

export default CardList
