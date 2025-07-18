'use client'

import { useEffect } from 'react'
import { useUpdateAssetInfoQuery } from '@/features/assets/model/useAssetQuery'
import { AssetEdit } from '@/features/assets/ui/modify/assetEdit'
import { AssetGallery } from '@/features/assets/ui/modify/assetGallery'
import ModifyHeader from '@/features/assets/ui/modify/header/modifyHeader'
import { SpinLoading } from '@/shared/ui/spinLoading'
import { useAssetUpdateStore } from '../../model/assetUpdateStore'
import styles from './uploader.module.scss'

const AssetModify = ({ id, isEmergencyOverride }: { id: string; isEmergencyOverride?: boolean }) => {
  const { asset, removeAssetUpdateStore } = useAssetUpdateStore()

  const { refetch, isLoading } = useUpdateAssetInfoQuery(Number(id))

  const isImageType = asset?.default_type === 'Auto'
  useEffect(() => {
    return () => {
      removeAssetUpdateStore()
    }
  }, [removeAssetUpdateStore])
  return (
    <>
      <ModifyHeader refetch={refetch} isEmergencyOverride={isEmergencyOverride} />
      <main className='emptyContainer'>
        <div className={styles.assetModify}>
          {isLoading ? (
            <SpinLoading />
          ) : (
            <>
              <AssetGallery isImageType={isImageType} isEmergencyOverride={isEmergencyOverride} />
              <AssetEdit isImageType={isImageType} isEmergencyOverride={isEmergencyOverride} />
            </>
          )}
        </div>
      </main>
    </>
  )
}

export default AssetModify
