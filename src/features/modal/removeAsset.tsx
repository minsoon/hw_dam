import { useCallback } from 'react'
import { Button, Modal, message } from 'antd'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { useDeleteCollectionAssetMutation } from '@/features/collections/model/useCollectionQuery'
import styles from './modal.module.scss'

export const ModalRemoveAsset = ({
  isOpen,
  collectionId,
  assetIds,
  onClose,
  refetch,
}: {
  collectionId: number
  assetIds: number | number[]
  isOpen: boolean
  onClose: () => void
  refetch: () => void
}) => {
  const { setChecked } = useCollectionStore()
  const { mutate: deleteCollectionAsset } = useDeleteCollectionAssetMutation()
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])
  const handleSubmit = useCallback(() => {
    deleteCollectionAsset(
      { collection_id: collectionId, asset_ids: Array.isArray(assetIds) ? assetIds.join(',') : String(assetIds) },
      {
        onSuccess: () => {
          refetch()
          handleClose()
          setChecked([])
        },
        onError: () => {
          message.error('Failed to delete collection asset')
        },
      }
    )
  }, [assetIds, collectionId, deleteCollectionAsset, refetch, setChecked, handleClose])
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={600}
      title={'Remove asset'}
      footer={[
        <Button key='clear' className={styles.clearAllBtn} onClick={handleClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Remove from collection
        </Button>,
      ]}
    >
      <div className={styles.modalConfirm}>
        <p>Are you sure you want to remove the media from the collection?</p>
      </div>
    </Modal>
  )
}
