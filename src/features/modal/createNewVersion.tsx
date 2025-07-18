'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form, Modal, message } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { useAssetUpdateStore } from '@/features/assets/model/assetUpdateStore'
import { useAssetCreateSubmit } from '@/features/assets/model/useAssetUpdateSubmit'
import styles from './modal.module.scss'

export const ModalCreateNewVersion = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const router = useRouter()
  const { asset } = useAssetUpdateStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = useAssetCreateSubmit()
  const handleClose = useCallback(() => {
    if (isSubmitting) return
    onClose()
  }, [onClose, isSubmitting])

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true)
    const isSuccess = await submit()
    if (isSuccess) {
      router.push(`/assets/${asset?.asset_id}`)
    } else {
      message.error('Update failed. Please try again.')
      setIsSubmitting(false)
    }
  }, [submit, asset?.asset_id, router])
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={600}
      title='Create new version'
      maskClosable={!isSubmitting}
      footer={null}
    >
      <Form onFinish={handleSubmit} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <p>Are you sure you want to create a new version of this asset? </p>
          <div className={styles.modalConfirmButton}>
            <Button key='clear' className={styles.clearAllBtn} onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              key='submit'
              type='primary'
              htmlType='submit'
              loading={isSubmitting && { icon: <SyncOutlined style={{ fontSize: '16px' }} spin /> }}
            >
              Proceed
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
