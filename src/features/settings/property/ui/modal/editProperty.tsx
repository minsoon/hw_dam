'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import { PropertyOptionResponse } from '@/entities/types/Properties'
import styles from '@/features/modal/modal.module.scss'
import { useOptionsQuery, useUpdateOptionsMutation } from '@/features/settings/property/model/usePropertyQuery'
import { usePropertyStore } from '@/features/settings/property/model/usePropertyStore'

const ModalEditProperty = ({
  isOpen,
  onClose,
  currentOption,
  categoryId,
}: {
  isOpen: boolean
  onClose: () => void
  currentOption: PropertyOptionResponse | null
  categoryId: number
}) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const { optionsKeyword } = usePropertyStore()
  const { mutate: updateOptions } = useUpdateOptionsMutation()
  const { refetch } = useOptionsQuery(categoryId, optionsKeyword)

  const handleClose = useCallback(() => {
    form.resetFields()
    setIsFormValid(false)
    onClose()
  }, [onClose, form])

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(!!values.optionName)
  }, [form])

  const handleSubmit = useCallback(
    (values: { optionName: string }) => {
      if (!currentOption) return

      updateOptions(
        {
          id: currentOption.property_option_id,
          payload: {
            option_name: values.optionName,
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
    [currentOption, updateOptions, refetch, handleClose]
  )

  useEffect(() => {
    if (currentOption && isOpen) {
      form.setFieldsValue({
        optionName: currentOption.option_name,
      })
      setIsFormValid(true)
    }
  }, [currentOption, isOpen, form])

  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Edit property' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Property name<span className={styles.required}>*</span>
            </dt>
            <dd>
              <Form.Item name='optionName'>
                <Input />
              </Form.Item>
            </dd>
          </dl>
          <div className={styles.modalConfirmButton}>
            <Button key='clear' onClick={onClose}>
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

export default ModalEditProperty
