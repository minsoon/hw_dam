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
  return (
    <div className={styles.cardList}>
      <div className={styles.assetGrid}>
        {collectionDetail?.assets?.map(asset => (
          <CollectionCard
            key={asset.asset_id}
            item={asset}
            isShare={isShare}
            hasToken={hasToken}
            isNumericId={isNumericId}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  )
}

export default CardList
