'use client'

import React from 'react'
import { Button } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import { useUploaderDropzone } from '@/features/uploader/model/useUploaderDropzone'
import { AssetCard } from '@/shared/ui/editCard/assetCard'
import { AssetFileCard } from '@/shared/ui/editCard/assetFileCard'
import styles from './assetGallery.module.scss'

export const AssetGallery: React.FC<{
  isImageType: boolean
}> = ({ isImageType }) => {
  const {
    currentIndex,
    assets,
    panelData,
    files,
    thumbnailKey,
    clearAssets,
    removeAsset,
    setThumbnailKey,
    setVariation,
  } = useUploaderStore()
  const { getRootProps, getInputProps } = useUploaderDropzone(isImageType)

  return (
    <div className={`${styles.assetGallery} ${currentIndex !== null ? styles.onEditor : ''}`}>
      <div className={styles.toolbar}>
        <p>
          {assets.length} {isImageType ? 'uploads' : 'variations'}
        </p>
        <div className={styles.btns}>
          <Button variant='outlined' icon={<DeleteOutlined />} onClick={clearAssets}>
            Delete all
          </Button>
          <Button color='primary' variant='solid' icon={<PlusOutlined />} {...getRootProps()}>
            <input {...getInputProps()} />
            Add assets
          </Button>
        </div>
      </div>
      <div className={styles.gallery}>
        {files.map((item, index) =>
          isImageType ? (
            <AssetCard key={index} item={item} index={index} />
          ) : (
            <AssetFileCard
              key={item.key}
              item={item}
              thumbnailKey={thumbnailKey}
              setThumbnailKey={setThumbnailKey}
              variationItems={panelData?.[index]?.custom_variations}
              onVariationChange={setVariation}
              actions={
                <>
                  <Button onClick={() => removeAsset(index)}>
                    <DeleteOutlined />
                  </Button>
                </>
              }
            />
          )
        )}
      </div>
    </div>
  )
}
