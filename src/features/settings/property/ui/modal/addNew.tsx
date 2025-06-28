'use client'

import React, { useCallback, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import styles from '@/features/modal/modal.module.scss'
import { useCreateOptionsMutation, useOptionsQuery } from '@/features/settings/property/model/usePropertyQuery'
import { usePropertyStore } from '@/features/settings/property/model/usePropertyStore'

const ModalAddNew = ({ isOpen, categoryId, onClose }: { isOpen: boolean; categoryId: number; onClose: () => void }) => {
  const [form] = Form.useForm()
  const { optionsKeyword } = usePropertyStore()
  const [isFormValid, setIsFormValid] = useState(false)
  const { mutate: createOptions } = useCreateOptionsMutation()
  const { refetch } = useOptionsQuery(categoryId, optionsKeyword)

  const handleClose = useCallback(() => {
    form.resetFields()
    setIsFormValid(false)
    onClose()
  }, [onClose, form])

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(!!values.propertyName)
  }, [form])

  const handleSubmit = useCallback(
    (values: { propertyName: string }) => {
      createOptions(
        {
          payload: {
            property_category_id: categoryId,
            option_name: values.propertyName,
          },
        },
        {
          onSuccess: () => {
            refetch()
            handleClose()
          },
          onError: (error: Error) => {
            console.error('handleSubmit error', error)
          },
        }
      )
    },
    [categoryId, createOptions, refetch, handleClose]
  )
  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Add new' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Property name<span className={styles.required}>*</span>
            </dt>
            <dd>
              <Form.Item name='propertyName'>
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
