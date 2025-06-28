'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { TagResponse } from '@/entities/types/Tags'
import styles from '@/features/modal/modal.module.scss'
import { useTagsQuery, useUpdateTagsQuery } from '@/features/settings/tags/model/useTagsQuery'
import { useTagsStore } from '@/features/settings/tags/model/useTagsStore'

const ModalEditCategory = ({
  isOpen,
  currentTag,
  onClose,
}: {
  isOpen: boolean
  currentTag: TagResponse | null
  onClose: () => void
}) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const { mutate: updateTag } = useUpdateTagsQuery()
  const { tags } = useTagsStore()
  const { pagination, keyword } = tags
  const { refetch } = useTagsQuery(pagination.currentPage, keyword)

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
        categoryName: currentTag.category,
      })
      setIsFormValid(true)
    }
  }, [currentTag, isOpen, form])

  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Edit category' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Category name<span className={styles.required}>*</span>
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

export default ModalEditCategory
