'use client'

import { useCallback, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import styles from '@/features/modal/modal.module.scss'
import { useDeleteTagsQuery, useTagsDetailQuery } from '@/features/settings/tags/model/useTagsQuery'
import { useTagsStore } from '@/features/settings/tags/model/useTagsStore'

const ModalDelete = ({
  isOpen,
  categoryId,
  currentTagId,
  onClose,
}: {
  isOpen: boolean
  categoryId: string
  currentTagId: number | undefined
  onClose: () => void
}) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)

  const { detail } = useTagsStore()
  const { keyword } = detail
  const { mutate: deleteTag } = useDeleteTagsQuery()
  const { refetch } = useTagsDetailQuery(Number(categoryId), keyword)

  const handleClose = useCallback(() => {
    form.resetFields()
    setIsFormValid(false)
    onClose()
  }, [onClose, form])

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(values.confirmText === 'DELETE')
  }, [form])

  const handleSubmit = useCallback(() => {
    if (!currentTagId) return

    deleteTag(
      { id: currentTagId },
      {
        onSuccess: () => {
          refetch()
          handleClose()
        },
        onError: (error: Error) => {
          console.error('Delete option error:', error)
        },
      }
    )
  }, [currentTagId, deleteTag, handleClose, refetch])

  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Delete confirmation' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Are you sure you want to delete selected tag? Selection will be deleted immediately and you cannot undo
              this action.
              <br />
              <br />
              Please type <strong>DELETE</strong> to confirm
            </dt>
            <dd>
              <Form.Item
                name='confirmText'
                rules={[
                  {
                    required: true,
                    validator: (_, value) => (value === 'DELETE' ? Promise.resolve() : Promise.reject('')),
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
            <Button key='submit' type='primary' htmlType='submit' disabled={!isFormValid}>
              Confirm
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}

export default ModalDelete
