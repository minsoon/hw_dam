import React from 'react'
import { Checkbox } from 'antd'
import { CollectionAssetsDataResponse } from '@/entities/types/Collections'
import { AssetCardContent } from '@/features/assets/ui/card/assetCardContent'
import { CardMenu } from '@/features/assets/ui/card/cardMenu'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { ModalType } from '@/features/modal'
import styles from './card.module.scss'

export const CollectionCard: React.FC<{
  item: CollectionAssetsDataResponse
  isShare: boolean
  hasToken: boolean
  refetch: () => void
  isNumericId: boolean
}> = ({ item, isShare, hasToken, refetch, isNumericId }) => {
  const { collectionDetail, checkedIds, setChecked } = useCollectionStore()
  const isChecked = checkedIds.includes(item.asset_id)
  const menuItems = [ModalType.ADD_TO_COLLECTION, ModalType.REMOVE_ASSET, ModalType.DOWNLOAD, ModalType.SHARE]

  return (
    <div className={`${styles.card} ${isChecked ? styles.checked : ''} ${!isNumericId ? styles.darkCard : ''}`}>
      <AssetCardContent item={item} notLink={true} />
      {!isShare && (
        <div className={`${styles.checkbox} ${checkedIds.length > 0 ? styles.checked : ''}`}>
          <Checkbox checked={checkedIds?.includes(item.asset_id)} onChange={() => setChecked(item.asset_id)} />
        </div>
      )}
      {(!isShare || hasToken) && isNumericId && (
        <CardMenu
          item={item}
          collectionId={collectionDetail?.collection_id}
          refetch={refetch}
          menuItems={menuItems}
          downloadType={'asset'}
          showBookmark={false}
        />
      )}
    </div>
  )
}
