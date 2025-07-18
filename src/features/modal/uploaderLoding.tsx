import { Modal, Spin, Typography } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import styles from './modal.module.scss'

export const ModalUploaderLoading = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Modal open={isOpen} width={600} title={null} footer={null} closable={false} centered>
      <div className={styles.modalUploaderLoading}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 40, color: '#fa8c16' }} spin />} />
        <Typography.Text className={styles.uploadText}>Uploading... Please wait</Typography.Text>
      </div>
    </Modal>
  )
}
