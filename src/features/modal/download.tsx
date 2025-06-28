import { useCallback, useState } from 'react'
import { Button, Checkbox, Modal, message } from 'antd'
import { useAssetsDownloadMutation } from '@/features/assets/model/useAssetQuery'
import { useCollectionDownloadMutation } from '@/features/collections/model/useCollectionQuery'
import { downloadBlobAsFile } from '@/shared/lib/download'
import styles from './modal.module.scss'

export const ModalDownload = ({
  assetIds,
  collectionId,
  isOpen,
  onClose,
  downloadType,
}: {
  assetIds?: number | number[] | null
  collectionId?: number | null
  isOpen: boolean
  onClose: () => void
  downloadType?: 'asset' | 'collection'
}) => {
  const { mutate: downloadAssets } = useAssetsDownloadMutation()
  const { mutate: downloadCollection } = useCollectionDownloadMutation()
  const [isChecked, setIsChecked] = useState(false)

  const handleCheckboxChange = useCallback(() => {
    setIsChecked(prev => !prev)
  }, [])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(() => {
    if (downloadType === 'collection' && collectionId) {
      downloadCollection(
        {
          collection_id: collectionId,
          is_with_working: isChecked,
        },
        {
          onSuccess: data => {
            handleClose()
            downloadBlobAsFile(data.data, data.fileName)
          },
          onError: () => {
            message.error('Failed to download collection')
          },
        }
      )
    } else if (downloadType === 'asset') {
      downloadAssets(
        {
          asset_ids: Array.isArray(assetIds) ? assetIds.join(',') : String(assetIds),
          is_with_working: isChecked,
        },
        {
          onSuccess: data => {
            handleClose()
            downloadBlobAsFile(data.data, data.fileName)
          },
          onError: () => {
            message.error('Failed to download asset')
          },
        }
      )
    }
  }, [assetIds, collectionId, downloadAssets, downloadCollection, handleClose, isChecked, downloadType])

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={600}
      title='Download selected'
      footer={[
        <Button key='clear' className={styles.clearAllBtn} onClick={handleClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Download
        </Button>,
      ]}
    >
      <div className={styles.modalConfirm}>
        <dl>
          <dt>Please select a preferred condition of downloads below.</dt>
          <dd>
            <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
              Download with working files
            </Checkbox>
          </dd>
        </dl>
      </div>
    </Modal>
  )
}
