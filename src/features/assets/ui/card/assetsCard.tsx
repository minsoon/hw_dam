import React from 'react'
import { Checkbox } from 'antd'
import { AssetListDataResponse } from '@/entities/types/Assets'
import { useAssetStore } from '@/features/assets/model/assetsStore'
import { AssetCardContent } from '@/features/assets/ui/card/assetCardContent'
import { CardMenu } from '@/features/assets/ui/card/cardMenu'
import styles from './card.module.scss'

export const AssetsCard: React.FC<{ item: AssetListDataResponse; refetch: () => void }> = ({ item, refetch }) => {
  const { checkedIds, setChecked } = useAssetStore()
  const isChecked = checkedIds.includes(item.asset_id)

  return (
    <div className={`${styles.card} ${isChecked ? styles.checked : ''}`}>
      <AssetCardContent item={item} />
      <div className={`${styles.checkbox} ${checkedIds.length > 0 ? styles.checked : ''}`}>
        <Checkbox checked={checkedIds?.includes(item.asset_id)} onChange={() => setChecked(item.asset_id)} />
      </div>
      <CardMenu item={item} refetch={refetch} downloadType={'asset'} />
    </div>
  )
}
