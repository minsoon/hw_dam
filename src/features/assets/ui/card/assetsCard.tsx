import React from 'react'
import { Checkbox } from 'antd'
import { AssetListDataResponse } from '@/entities/types/Assets'
import { useAssetStore } from '@/features/assets/model/assetsStore'
import { AssetCardContent } from '@/features/assets/ui/card/assetCardContent'
import { CardMenu } from '@/features/assets/ui/card/cardMenu'
import styles from './card.module.scss'

export const AssetsCard = React.memo(({ item, refetch }: { item: AssetListDataResponse; refetch: () => void }) => {
  const setChecked = useAssetStore(state => state.setChecked)
  const isChecked = useAssetStore(state => state.checkedIds.has(item.asset_id))

  const handleCheck = () => {
    setChecked(item.asset_id)
  }

  return (
    <div className={`${styles.card} ${isChecked ? styles.checked : ''}`}>
      <AssetCardContent item={item} />
      <div className={`${styles.checkbox} ${isChecked ? styles.checked : ''}`}>
        <Checkbox checked={isChecked} onChange={handleCheck} />
      </div>
      <CardMenu item={item} refetch={refetch} downloadType='asset' />
    </div>
  )
})
AssetsCard.displayName = 'AssetsCard'
