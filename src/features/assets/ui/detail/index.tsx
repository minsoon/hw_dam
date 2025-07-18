'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Image, Skeleton } from 'antd'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { useAssetByHashQuery, useAssetByIdQuery } from '@/features/assets/model/useAssetQuery'
import { AssetInfo } from '@/features/assets/ui/detail/assetInfo'
import DefaultHeader from '@/features/assets/ui/detail/header/defaultHeader'
import ReadonlyHeader from '@/features/assets/ui/detail/header/readonlyHeader'
import { isImageFile } from '@/shared/lib/fileHelpers'
import styles from './detail.module.scss'

const AssetDetail = ({ id, isShare, hasToken }: { id: string; isShare: boolean; hasToken: boolean }) => {
  const { currentImage, currentVersionId, removeAssetDetailStore, setCurrentVersionId } = useAssetDetailStore()

  const [imgLoaded, setImgLoaded] = useState(false)
  const [initialized, setInitialized] = useState(false)
  const assetId = id.split('-')[0]
  const isNumericId = /^\d+$/.test(assetId)
  const isPublic = isShare && !isNumericId
  const searchParams = useSearchParams()
  const version = searchParams.get('v')

  const assetByIdQuery = useAssetByIdQuery(Number(assetId), currentVersionId, {
    enabled: isNumericId && initialized,
  })

  const assetByHashQuery = useAssetByHashQuery(id, version, {
    enabled: !isNumericId,
  })

  const { isLoading, refetch } = isNumericId ? assetByIdQuery : assetByHashQuery
  const isImage = isImageFile(currentImage?.file_extension ?? '')
  const isFileExtensionKnown = !!currentImage?.file_extension

  useEffect(() => {
    if (!initialized) {
      setCurrentVersionId(Number(version) || null)
      setInitialized(true)
    }
  }, [version, setCurrentVersionId, initialized])
  useEffect(() => {
    setImgLoaded(false)
  }, [currentImage?.file_path])

  useEffect(() => {
    return () => {
      removeAssetDetailStore()
    }
  }, [removeAssetDetailStore])

  return (
    <>
      {isPublic ? (
        <ReadonlyHeader />
      ) : (
        <DefaultHeader isLoading={isLoading} refetch={refetch} isShare={isShare} hasToken={hasToken} />
      )}
      <main className={`emptyContainer ${isPublic || currentVersionId !== null ? 'darkContainer' : ''}`}>
        <div className={styles.assetDetail}>
          {imgLoaded}
          <div className={styles.assetImg}>
            <div className={styles.image}>
              {!isFileExtensionKnown || (isImage && (!imgLoaded || !currentImage?.file_path)) || isLoading ? (
                <div className={styles.imageSkeleton}>
                  <Skeleton.Image active />
                </div>
              ) : null}

              {currentImage?.file_path && isImageFile(currentImage.file_extension) && (
                <Image
                  src={`${currentImage.file_path}?timestamp=${Date.now()}`}
                  alt='asset'
                  onLoad={() => setImgLoaded(true)}
                  style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
                  preview={false}
                />
              )}

              {currentImage?.file_path && !isImageFile(currentImage.file_extension) && (
                <div className={styles.fileIcon}>
                  <span>{currentImage.file_extension.toUpperCase()}</span>
                </div>
              )}
            </div>
          </div>
          <div className={`detail ${styles.assetInfoWrap}`}>
            {isLoading ? (
              <Skeleton active style={{ padding: 10 }} />
            ) : (
              <>
                <AssetInfo version={version} isPublic={isPublic} isShare={isShare} hasToken={hasToken} />
              </>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default AssetDetail
