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
      title={'Upload success'}
      footer={[
        <Button key='submit' type='primary' onClick={handleClose}>
          Done
        </Button>,
      ]}
    >
      <div className={styles.modalConfirm}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam semper, turpis eget venenatis fermentum, ex neque
          fringilla lectus, in laoreet urna orci nec sem. Ut ac viverra lorem, et ultrices ex.
        </p>
      </div>
    </Modal>
  )
}
