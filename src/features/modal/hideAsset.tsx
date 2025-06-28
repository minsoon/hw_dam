import { useCallback } from 'react'
import { Button, Modal, message } from 'antd'
import { AssetDetailResponse } from '@/entities/types/Assets'
import { useHideAssetMutation } from '@/features/assets/model/useAssetQuery'
import styles from './modal.module.scss'

export const ModalHideAsset = ({
  isOpen,
  onClose,
  asset,
  refetch,
}: {
  isOpen: boolean
  onClose: () => void
  asset: AssetDetailResponse
  refetch: () => void
}) => {
  const { mutate: hideAsset } = useHideAssetMutation()

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])
  const handleSubmit = useCallback(() => {
    hideAsset(
      { asset_id: asset.asset_id, is_hidden: asset.is_hidden ? 0 : 1 },
      {
        onSuccess: () => {
          handleClose()
          refetch()
        },
        onError: () => {
          message.error(`Failed to ${asset.is_hidden ? 'unhide' : 'hide'} asset`)
        },
      }
    )
  }, [handleClose, hideAsset, asset, refetch])

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={600}
      title={'Hide asset'}
      footer={[
        <Button key='clear' className={styles.clearAllBtn} onClick={handleClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Confirm
        </Button>,
      ]}
    >
      <div className={styles.modalConfirm}>
        <p>Are you sure you want to {asset?.is_hidden ? 'unhide' : 'hide'} the asset?</p>
      </div>
    </Modal>
  )
}
