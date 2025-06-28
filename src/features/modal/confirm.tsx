import { useCallback } from 'react'
import { Button, Modal } from 'antd'
import styles from './modal.module.scss'

export const ModalConfirm = ({
  title,
  description,
  isOpen,
  onClose,
  handleSubmit,
}: {
  title: string
  description: string
  isOpen: boolean
  onClose: () => void
  handleSubmit: () => void
}) => {
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])
  const handleClearAll = useCallback(() => {
    onClose()
  }, [onClose])

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={600}
      title={title}
      footer={[
        <Button key='clear' className={styles.clearAllBtn} onClick={handleClearAll}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Confirm
        </Button>,
      ]}
    >
      <div className={styles.modalConfirm}>
        <p>{description}</p>
      </div>
    </Modal>
  )
}
