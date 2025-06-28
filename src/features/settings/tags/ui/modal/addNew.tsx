'use client'

import React, { useCallback, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import styles from '@/features/modal/modal.module.scss'
import { useCreateTagsQuery, useTagsDetailQuery } from '@/features/settings/tags/model/useTagsQuery'
import { useTagsStore } from '@/features/settings/tags/model/useTagsStore'

const ModalAddNew = ({ isOpen, categoryId, onClose }: { isOpen: boolean; categoryId: string; onClose: () => void }) => {
  const [form] = Form.useForm()
  const { detail } = useTagsStore()
  const { keyword } = detail
  const { mutate: createTag } = useCreateTagsQuery()
  const { refetch } = useTagsDetailQuery(Number(categoryId), keyword)
  const [isFormValid, setIsFormValid] = useState(false)
  const handleClose = useCallback(() => {
    form.resetFields()
    setIsFormValid(false)
    onClose()
  }, [onClose, form])

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(!!values.tagName)
  }, [form])

  const handleSubmit = useCallback(
    (values: { tagName: string }) => {
      if (!categoryId) return
      createTag(
        { parent_tag_id: Number(categoryId), tag_name: values.tagName, is_active: 1 },
        {
          onSuccess: () => {
            handleClose()
            refetch()
          },
          onError: error => {
            console.error(error)
          },
        }
      )
    },
    [categoryId, handleClose, refetch, createTag]
  )

  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Add new' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Tag name<span className={styles.required}>*</span>
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
