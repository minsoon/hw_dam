'use client'

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Modal, message } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { useAssetUpdateStore } from '@/features/assets/model/assetUpdateStore'
import { useAssetCreateSubmit, useAssetUpdateSubmit } from '@/features/assets/model/useAssetUpdateSubmit'
import styles from './modal.module.scss'

export const ModalOverrideCurrentVersion = ({
  isOpen,
  onClose,
  isEmergencyOverride,
}: {
  isOpen: boolean
  onClose: () => void
  isEmergencyOverride?: boolean
}) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { asset } = useAssetUpdateStore()
  const updateSubmit = useAssetUpdateSubmit()
  const submitEmergency = useAssetCreateSubmit(isEmergencyOverride)

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(values.confirmText === 'OVERRIDE')
  }, [form])

  const handleClose = useCallback(() => {
    if (isSubmitting) return
    form.resetFields()
    setIsFormValid(false)
    onClose()
  }, [onClose, form, isSubmitting])

  const handleSubmit = async () => {
    setIsSubmitting(true)
    const isSuccess = isEmergencyOverride ? await submitEmergency() : await updateSubmit()
    if (isSuccess) {
      router.push(`/assets/${asset?.asset_id}`)
    } else {
      message.error('Update failed. Please try again.')
      setIsSubmitting(false)
    }
  }
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      maskClosable={!isSubmitting}
      width={600}
      title='Override current version'
      footer={null}
    >
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sit amet est pharetra, fringilla tortor
              at, sollicitudin sem. 
              <br />
              <br />
              Please type <strong>OVERRIDE</strong> to confirm
            </dt>
            <dd>
              <Form.Item
                name='confirmText'
                rules={[
                  {
                    required: true,
                    validator: (_, value) => (value === 'OVERRIDE' ? Promise.resolve() : Promise.reject('')),
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </dd>
          </dl>
          <div className={styles.modalConfirmButton}>
            <Button key='clear' className={styles.clearAllBtn} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              key='submit'
              type='primary'
              htmlType='submit'
              disabled={!isFormValid}
              loading={isSubmitting && { icon: <SyncOutlined style={{ fontSize: '16px' }} spin /> }}
            >
              Confirm override
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
