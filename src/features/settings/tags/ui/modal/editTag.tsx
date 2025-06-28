'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { TagResponse } from '@/entities/types/Tags'
import styles from '@/features/modal/modal.module.scss'
import { useTagsDetailQuery, useUpdateTagsQuery } from '@/features/settings/tags/model/useTagsQuery'
import { useTagsStore } from '@/features/settings/tags/model/useTagsStore'

const ModalEditTag = ({
  isOpen,
  categoryId,
  currentTag,
  onClose,
}: {
  isOpen: boolean
  categoryId: string
  currentTag: TagResponse | null
  onClose: () => void
}) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const { mutate: updateTag } = useUpdateTagsQuery()
  const { detail } = useTagsStore()
  const { keyword } = detail
  const { refetch } = useTagsDetailQuery(Number(categoryId), keyword)

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(!!values.categoryName)
  }, [form])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])
  const handleSubmit = useCallback(
    (values: { categoryName: string }) => {
      if (!currentTag) return

      updateTag(
        { id: currentTag.tag_id, payload: { tag_name: values.categoryName, is_active: currentTag.is_active } },
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
    [currentTag, updateTag, handleClose, refetch]
  )

  useEffect(() => {
    if (currentTag && isOpen) {
      form.setFieldsValue({
        categoryName: currentTag.tag_name,
      })
      setIsFormValid(true)
    }
  }, [currentTag, isOpen, form])

  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Edit tag' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Tag name<span className={styles.required}>*</span>
            </dt>
            <dd>
              <Form.Item name='categoryName'>
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

export default ModalEditTag
