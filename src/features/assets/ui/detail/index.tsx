'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Skeleton } from 'antd'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { useAssetByHashQuery, useAssetByIdQuery } from '@/features/assets/model/useAssetQuery'
import { AssetInfo } from '@/features/assets/ui/detail/assetInfo'
import DefaultHeader from '@/features/assets/ui/detail/header/defaultHeader'
import ReadonlyHeader from '@/features/assets/ui/detail/header/readonlyHeader'
import { isImageFile } from '@/shared/lib/fileHelpers'
import styles from './detail.module.scss'

const AssetDetail = ({ id, isShare, hasToken }: { id: string; isShare: boolean; hasToken: boolean }) => {
  const { currentImage, currentVersionId, removeAssetDetailStore, setCurrentVersionId } = useAssetDetailStore()

  const isNumericId = /^\d+$/.test(id)
  const isPublic = isShare && !isNumericId
  const searchParams = useSearchParams()
  const version = searchParams.get('version')

  const assetByIdQuery = useAssetByIdQuery(Number(id), currentVersionId, {
    enabled: isNumericId,
  })
  const assetByHashQuery = useAssetByHashQuery(id, {
    enabled: !isNumericId,
  })

  const { isLoading, refetch } = isNumericId ? assetByIdQuery : assetByHashQuery

  useEffect(() => {
    setCurrentVersionId(version ? Number(version) : null)
  }, [version, setCurrentVersionId])

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
          <div className={styles.assetImg}>
            {isLoading || !currentImage || !currentImage.file_path ? (
              <Skeleton.Image style={{ width: 200, height: 150 }} />
            ) : (
              <>
                {isImageFile(currentImage.file_extension) ? (
                  <img src={`${currentImage.file_path}?timestamp=${Date.now()}`} alt='asset' />
                ) : (
                  <div className={styles.fileIcon}>
                    <span>{currentImage.file_extension.toUpperCase()}</span>
                  </div>
                )}
              </>
            )}
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
