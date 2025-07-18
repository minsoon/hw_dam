'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { Button, Skeleton } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useAssetUpdateStore } from '@/features/assets/model/assetUpdateStore'
import { useUploaderDropzoneModify } from '@/features/uploader/model/useUploaderDropzone'
import { AssetCardItem } from './assetCardItem'
import styles from './assetGallery.module.scss'

export const AssetGallery: React.FC<{
  isImageType: boolean
  isEmergencyOverride?: boolean
}> = ({ isImageType, isEmergencyOverride }) => {
  const { asset, removeFile } = useAssetUpdateStore()
  const { getRootProps, getInputProps } = useUploaderDropzoneModify()
  const [imgLoaded, setImgLoaded] = useState(false)

  const searchParams = useSearchParams()
  const isNewVersion = searchParams.get('newVersion')

  useEffect(() => {
    setImgLoaded(false)
  }, [asset?.thumbnail])
  if (!asset) return null

  return (
    <div className={styles.assetGallery}>
      {isImageType ? (
        <div className={styles.thumbnail}>
          {asset?.thumbnail && asset.thumbnail.startsWith('http') ? (
            <div className={styles.thumbnailImg}>
              {!imgLoaded && <Skeleton.Image style={{ width: 200, height: 150 }} active />}
              <Image
                src={asset.thumbnail}
                alt='thumbnail'
                fill
                sizes='730px'
                priority
                onLoad={() => setImgLoaded(true)}
                style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
              />
            </div>
          ) : (
            <div
              style={{
                width: 730,
                height: 487,
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              No thumbnail available
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={styles.toolbar}>
            <p>{asset.files.length} assets</p>
            {isNewVersion && (
              <div className={styles.btns}>
                <Button variant='outlined' icon={<DeleteOutlined />} onClick={() => removeFile(undefined)}>
                  Delete all
                </Button>
                <Button color='primary' variant='solid' icon={<PlusOutlined />} {...getRootProps()}>
                  <input {...getInputProps()} />
                  Add assets
                </Button>
              </div>
            )}
          </div>
          <div className={styles.gallery}>
            {asset.files.map(item => (
              <AssetCardItem
                key={item.asset_file_id}
                item={{
                  key: item.asset_file_id,
                  file: new File([], item.file_name, { type: item.file_extension }),
                  url: item.file_path,
                  isImage: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(
                    (item.file_extension || '').toLowerCase()
                  ),
                  is_thumbnail: item.is_thumbnail,
                  variation_id: item.variation_id,
                  asset_file_id: item.asset_file_id,
                }}
                isNewVersion={isNewVersion}
                isEmergencyOverride={isEmergencyOverride}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
