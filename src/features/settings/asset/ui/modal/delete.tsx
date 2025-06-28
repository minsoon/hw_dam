import { useCallback } from 'react'
import { Button, Modal, Input } from 'antd'
import styles from '@/features/modal/modal.module.scss'

const ModalDelete = ({
  isOpen,
  onClose,
  handleSubmit,
}: {
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
      title='Delete asset type'
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
        <dl>
          <dt>
            Are you sure you want to delete selected asset type? Selection will be deleted immediately and you cannot
            undo this action.
            <br />
            <br />
            Please type <strong>DELETE</strong> to confirm
          </dt>
          <dd>
            <Input placeholder='Type DELETE to confirm' />
          </dd>
        </dl>
      </div>
    </Modal>
  )
}

export default ModalDelete
