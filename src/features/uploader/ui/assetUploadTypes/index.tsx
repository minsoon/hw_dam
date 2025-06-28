'use client'

import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import { useAssetTypesQuery } from '@/features/uploader/model/useUploadQuery'
import { AssetType } from '@/features/uploader/ui/assetUploadTypes/assetType'
import { SpinLoading } from '@/shared/ui/spinLoading'
import styles from './uploaderAssetTypes.module.scss'

const UploaderAssetTypes = () => {
  const { assetTypesLoading, assetTypes } = useUploaderStore()

  useAssetTypesQuery('')
  if (assetTypesLoading) {
    return <SpinLoading />
  }
  return (
    <div className={styles.selectAsset}>
      <div className={styles.types}>
        <div className={styles.title}>Select asset type to start uploading</div>
        <ul>
          {assetTypes.map(item => (
            <li key={item.asset_type_id}>
              <AssetType item={item} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UploaderAssetTypes
