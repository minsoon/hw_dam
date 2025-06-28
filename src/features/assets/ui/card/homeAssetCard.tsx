import React from 'react'
import { AssetListDataResponse } from '@/entities/types/Assets'
import { MainAssetsList } from '@/entities/types/Main'
import { AssetCardContent } from '@/features/assets/ui/card/assetCardContent'
import { CardMenu } from '@/features/assets/ui/card/cardMenu'
import styles from './card.module.scss'

export const HomeAssetCard: React.FC<{ item: AssetListDataResponse | MainAssetsList; type?: string }> = ({
  item,
  type,
}) => {
  const isRecent = type === 'recent'

  return (
    <div className={isRecent ? styles.recentCard : styles.card}>
      <AssetCardContent item={item} />
      <CardMenu item={item} isRecent={isRecent} refetch={() => {}} downloadType={'asset'} />
    </div>
  )
}
