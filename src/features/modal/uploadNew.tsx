import { useCallback } from 'react'
import { Button, Modal } from 'antd'
import { useUploaderDropzoneModifyPopup } from '@/features/uploader/model/useUploaderDropzone'
import styles from './modal.module.scss'

export const ModalUploadNew = ({
  isOpen,
  onClose,
  itemKey,
}: {
  isOpen: boolean
  onClose: () => void
  itemKey: number
}) => {
  const { fileInfo, getRootProps, getInputProps, onDropFile, deleteFile } = useUploaderDropzoneModifyPopup(itemKey)
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])
  const handleSubmit = useCallback(() => {
    onDropFile()
    onClose()
  }, [onClose, onDropFile])
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={600}
      title={'Upload new'}
      footer={[
        <Button key='clear' className={styles.clearAllBtn} onClick={handleClose}>
          Cancel
        </Button>,
        <Button key='submit' type='primary' onClick={handleSubmit}>
          Confirm
        </Button>,
      ]}
    >
      {fileInfo ? (
        <div className={styles.fileInfo}>
          <p onClick={deleteFile}>
            <img src={fileInfo.url} alt='file' />
            <span>{fileInfo.file.name}</span>
          </p>
        </div>
      ) : (
        <div {...getRootProps()} className={styles.fileBox}>
          <input {...getInputProps()} />
          <p>Drop a file here or browse files to upload</p>
        </div>
      )}
    </Modal>
  )
}
