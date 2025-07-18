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
  isWorkingFile,
}: {
  assetIds?: number | number[] | null
  collectionId?: number | null
  isOpen: boolean
  isWorkingFile: number
  onClose: () => void
  downloadType?: 'asset' | 'collection'
}) => {
  const { mutate: downloadAssets } = useAssetsDownloadMutation()
  const { mutate: downloadCollection } = useCollectionDownloadMutation()
  const [isChecked, setIsChecked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckboxChange = useCallback(() => {
    setIsChecked(prev => !prev)
  }, [])

  const handleClose = useCallback(() => {
    if (isLoading) return
    onClose()
  }, [onClose, isLoading])

  const handleSubmit = useCallback(() => {
    setIsLoading(true)

    if (downloadType === 'collection' && collectionId) {
      downloadCollection(
        {
          collection_id: collectionId,
          is_with_working: isChecked,
        },
        {
          onSuccess: data => {
            setIsLoading(false)
            handleClose()
            downloadBlobAsFile(data.data, data.fileName)
          },
          onError: () => {
            setIsLoading(false)
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
            setIsLoading(false)
            handleClose()
            downloadBlobAsFile(data.data, data.fileName)
          },
          onError: () => {
            setIsLoading(false)
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
      maskClosable={!isLoading}
      title='Download selected'
      footer={[
        <Button key='clear' className={styles.clearAllBtn} onClick={handleClose} disabled={isLoading}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit} loading={isLoading}>
          Download
        </Button>,
      ]}
    >
      <div className={styles.modalConfirm}>
        <dl>
          <dt>Please select a preferred condition of downloads below.</dt>
          {isWorkingFile === 1 && (
            <dd>
              <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
                Download with working files
              </Checkbox>
            </dd>
          )}
        </dl>
      </div>
    </Modal>
  )
}
