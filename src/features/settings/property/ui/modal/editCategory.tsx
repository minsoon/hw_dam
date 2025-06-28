'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Select, SelectProps } from 'antd'
import { PropertyCategoryResponse } from '@/entities/types/Properties'
import styles from '@/features/modal/modal.module.scss'
import { useUpdateCategoriesMutation } from '@/features/settings/property/model/usePropertyQuery'
import { useCategoriesQuery } from '@/features/settings/property/model/usePropertyQuery'
import { usePropertyStore } from '@/features/settings/property/model/usePropertyStore'

const ModalEditCategory = ({
  isOpen,
  onClose,
  currentCategory,
}: {
  isOpen: boolean
  onClose: () => void
  currentCategory: PropertyCategoryResponse | null
}) => {
  const { categoriesKeyword } = usePropertyStore()
  const options: SelectProps['options'] = [
    { label: 'Single', value: 'single' },
    { label: 'Multi', value: 'multi' },
  ]
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const { mutate: updateCategory } = useUpdateCategoriesMutation()
  const { refetch } = useCategoriesQuery(categoriesKeyword)

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(!!values.categoryName && !!values.categoryType)
  }, [form])

  const handleClose = useCallback(() => {
    form.resetFields()
    setIsFormValid(false)
    onClose()
  }, [onClose, form])

  const handleSubmit = useCallback(
    (values: { categoryName: string; categoryType: string }) => {
      if (!currentCategory) return

      updateCategory(
        {
          id: currentCategory.property_category_id,
          payload: {
            category_name: values.categoryName,
            category_type: values.categoryType,
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
    [currentCategory, updateCategory, refetch, handleClose]
  )

  useEffect(() => {
    if (currentCategory && isOpen) {
      form.setFieldsValue({
        categoryName: currentCategory.category_name,
        categoryType: currentCategory.category_type,
      })
      setIsFormValid(true)
    }
  }, [isOpen, currentCategory, form])

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
          <dl>
            <dt>Type</dt>
            <dd>
              <Form.Item name='categoryType'>
                <Select style={{ width: '100%' }} options={options} />
              </Form.Item>
            </dd>
          </dl>
          <div className={styles.modalConfirmButton}>
            <Button key='clear' className={styles.clearAllBtn} onClick={handleClose}>
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
