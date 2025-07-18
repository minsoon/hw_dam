'use client'

import { useEffect } from 'react'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import { useAssetRefsQuery } from '@/features/uploader/model/useUploadQuery'
import { AssetEdit } from '@/features/uploader/ui/fileUploader/assetEdit'
import { AssetGallery } from '@/features/uploader/ui/fileUploader/assetGallery'
import { FileUploader } from '@/features/uploader/ui/fileUploader/fileUploader'
import styles from './uploader.module.scss'

const Uploader = ({ id }: { id: string }) => {
  const { assets, assetTypeDetail, clearAssets, setCurrentIndex, removeAssetTypeDetail } = useUploaderStore()
  const isImageType = assetTypeDetail?.default_type === 'Auto'

  useAssetRefsQuery(Number(id))

  useEffect(() => {
    setCurrentIndex(0)
    return () => {
      clearAssets()
    }
  }, [isImageType, clearAssets, setCurrentIndex])

  useEffect(() => {
    return () => {
      removeAssetTypeDetail()
    }
  }, [removeAssetTypeDetail])

  return (
    <>
      {assets.length === 0 && (
        <div className={styles.fileUploader}>
          <FileUploader id={id} isImageType={isImageType} />
        </div>
      )}

      {assets.length > 0 && (
        <div className={`${styles.uploaderEdit}`}>
          <AssetGallery isImageType={isImageType} />
          <AssetEdit isImageType={isImageType} />
        </div>
      )}
    </>
  )
}

export default Uploader
