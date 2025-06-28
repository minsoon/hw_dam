'use client'

import React, { useCallback, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import styles from '@/features/modal/modal.module.scss'
import {
  useCollectionTagsQuery,
  useCreateCollectionTagMutation,
} from '@/features/settings/collection/model/useCollectionQuery'

const ModalAddNew = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const { mutate: createCollectionTag } = useCreateCollectionTagMutation()
  const { refetch } = useCollectionTagsQuery(1, '')

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(!!values.tagName)
  }, [form])

  const handleClose = useCallback(() => {
    form.resetFields()
    setIsFormValid(false)
    onClose()
  }, [onClose, form])

  const handleSubmit = useCallback(
    (values: { tagName: string }) => {
      createCollectionTag(
        { tag_name: values.tagName },
        {
          onSuccess: () => {
            refetch()
            handleClose()
          },
          onError: error => {
            console.error('handleSubmit error', error)
          },
        }
      )
    },
    [handleClose, createCollectionTag, refetch]
  )

  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Add new' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Collection tag name<span className={styles.required}>*</span>
            </dt>
            <dd>
              <Form.Item name='tagName'>
                <Input />
              </Form.Item>
            </dd>
          </dl>
          <div className={styles.modalConfirmButton}>
            <Button key='clear' onClick={handleClose}>
              Cancel
            </Button>
            <Button key='submit' type='primary' htmlType='submit' disabled={!isFormValid}>
              Save updates
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalAddNew
