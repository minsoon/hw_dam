import { useCallback, useState } from 'react'
import { Button, Form, Input, Modal } from 'antd'
import styles from '@/features/modal/modal.module.scss'
import {
  useCollectionTagsQuery,
  useDeleteCollectionTagMutation,
} from '@/features/settings/collection/model/useCollectionQuery'
import { useSettingCollectionStore } from '@/features/settings/collection/model/useCollectionStore'

const ModalDelete = ({
  isOpen,
  tagId,
  onClose,
}: {
  isOpen: boolean
  tagId: number | undefined
  onClose: () => void
}) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const { pagination, keyword } = useSettingCollectionStore()
  const { mutate: deleteCollectionTag } = useDeleteCollectionTagMutation()
  const { refetch } = useCollectionTagsQuery(pagination.currentPage, keyword)

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(values.confirmText === 'DELETE')
  }, [form])

  const handleClose = useCallback(() => {
    form.resetFields()
    setIsFormValid(false)
    onClose()
  }, [onClose, form])

  const handleSubmit = useCallback(() => {
    if (!tagId) return

    deleteCollectionTag(
      { id: tagId },
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
  }, [tagId, deleteCollectionTag, handleClose, refetch])

  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Delete selected' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Are you sure you want to delete selected collection tag? Selection will be deleted immediately and you
              cannot undo this action. Collection tagged with deleted tag will be automatically be tagged to
              &quot;Other&quot;.
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
