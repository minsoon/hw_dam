'use client'

import { useCallback, useState } from 'react'
import { Button } from 'antd'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { useAssetUpdateStore } from '@/features/assets/model/assetUpdateStore'
import { ModalUploadNew } from '@/features/modal/uploadNew'
import { UploadedFile } from '@/shared/types/editCard'
import { AssetFileCard } from '@/shared/ui/editCard/assetFileCard'

export const AssetCardItem: React.FC<{
  item: UploadedFile
  isNewVersion: string | null
  isEmergencyOverride?: boolean
}> = ({ item, isNewVersion, isEmergencyOverride }) => {
  const { asset, thumbnailKey, setThumbnailByKey, removeFile, setAsset } = useAssetUpdateStore()
  const [activeModal, setActiveModal] = useState(false)

  const onVariationChange = useCallback(
    (fileKey: number, variationId: number) => {
      if (!asset) return

      const updatedFiles = asset.files.map(file =>
        file.asset_file_id === fileKey ? { ...file, variation_id: variationId } : file
      )

      setAsset({ ...asset, files: updatedFiles })
    },
    [asset, setAsset]
  )

  const actions = (isNewVersion || isEmergencyOverride) && (
    <>
      <Button onClick={() => removeFile(item.key)}>
        <DeleteOutlined />
      </Button>
      <div>
        <Button onClick={() => setActiveModal(true)}>
          <UploadOutlined />
        </Button>
      </div>
      <ModalUploadNew itemKey={item.key} isOpen={activeModal} onClose={() => setActiveModal(false)} />
    </>
  )

  if (!asset) return null

  return (
    <AssetFileCard
      item={item}
      thumbnailKey={thumbnailKey}
      isDisabled={!isNewVersion}
      variationItems={asset.custom_variations}
      onVariationChange={onVariationChange}
      setThumbnailKey={setThumbnailByKey}
      actions={actions}
    />
  )
}
