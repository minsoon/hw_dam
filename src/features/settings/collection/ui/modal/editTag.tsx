'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import type { CollectionTagResponse } from '@/entities/types/CollectionTags'
import styles from '@/features/modal/modal.module.scss'
import {
  useCollectionTagsQuery,
  useUpdateCollectionTagMutation,
} from '@/features/settings/collection/model/useCollectionQuery'
import { useSettingCollectionStore } from '@/features/settings/collection/model/useCollectionStore'

const ModalEditTag = ({
  isOpen,
  currentTag,
  onClose,
}: {
  currentTag: CollectionTagResponse | null
  isOpen: boolean
  onClose: () => void
}) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const { pagination, keyword } = useSettingCollectionStore()
  const { mutate: updateCollectionTag } = useUpdateCollectionTagMutation()
  const { refetch } = useCollectionTagsQuery(pagination.currentPage, keyword)

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
      if (!currentTag) return

      updateCollectionTag(
        { id: currentTag.tag_id, payload: { tag_name: values.tagName } },
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
    [currentTag, updateCollectionTag, refetch, handleClose]
  )

  useEffect(() => {
    if (currentTag && isOpen) {
      form.setFieldsValue({
        tagName: currentTag.tag_name,
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

export default ModalEditTag
