import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Modal } from 'antd'
import styles from './modal.module.scss'

export const ModalUploadSuccess = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter()
  const handleClose = useCallback(() => {
    onClose()
    router.push('/assets')
  }, [onClose, router])

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={600}
      title={'Asset Successfully Uploaded'}
      footer={[
        <Button key='submit' type='primary' onClick={handleClose}>
          Done
        </Button>,
      ]}
    >
      <div className={styles.modalConfirm}>
        <p>
          Your file has been uploaded and added to the asset library. You can now preview, manage, or share the asset.
        </p>
      </div>
    </Modal>
  )
}
