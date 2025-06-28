'use client'

// import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { Button, Select } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import { AssetUpdateInfoResponse } from '@/entities/types/Assets'
import { UploadedFile } from '@/shared/types/editCard'
import styles from './editCard.module.scss'

export const AssetFileCard: React.FC<{
  item: UploadedFile
  thumbnailKey: number | null
  isDisabled?: boolean
  variationItems: AssetUpdateInfoResponse['custom_variations'] | undefined
  setThumbnailKey: (key: number) => void
  onVariationChange: (fileKey: number, variationId: number) => void
  actions?: React.ReactNode
}> = ({ item, setThumbnailKey, isDisabled, actions, variationItems, onVariationChange }) => {
  const fileType = item.file.name?.split('.').pop()?.toUpperCase() || ''
  const thumbnailActive = item.is_thumbnail === 1
  const [selectedVariation, setSelectedVariation] = useState(item.variation_id)

  const handleVariationChange = useCallback(
    (value: number) => {
      setSelectedVariation(value)
      onVariationChange(item.key, value)
    },
    [item.key, onVariationChange]
  )
  useEffect(() => {
    setSelectedVariation(item.variation_id)
  }, [item.variation_id])
  return (
    <div className={styles.editCard}>
      <div
        className={styles.thumbnail}
        style={
          item.isImage
            ? {
                backgroundImage: `url(${item.url})`,
              }
            : undefined
        }
      >
        <span className={styles.fileName}>{item.file.name}</span>
        <span className={styles.type}>{fileType}</span>
        {!item.isImage && <div className={styles.fileIcon}>&nbsp;</div>}
        <div className={styles.actionsBtn}>{actions}</div>
      </div>
      <dl className={styles.customInfo}>
        <dt>
          Custom variation<span>*</span>
        </dt>
        <dd>
          <Select
            style={{ width: '100%' }}
            placeholder='Select...'
            options={variationItems?.map(item => ({
              label: item.name,
              value: item.variation_id,
            }))}
            disabled={isDisabled}
            value={selectedVariation}
            onChange={handleVariationChange}
          />
        </dd>
      </dl>
      {item.isImage && (
        <div className={styles.thumbnailBtn}>
          <Button
            color={thumbnailActive ? 'primary' : 'default'}
            variant={thumbnailActive ? 'solid' : 'filled'}
            icon={thumbnailActive ? <CheckOutlined /> : ''}
            onClick={() => setThumbnailKey(item.key)}
            block
          >
            {thumbnailActive ? 'Thumbnail' : 'Set as thumbnail'}
          </Button>
        </div>
      )}
    </div>
  )
}
