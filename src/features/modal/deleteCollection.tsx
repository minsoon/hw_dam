import { useCallback, useState } from 'react'
import { Button, Form, Input, Modal, message } from 'antd'
import { useDeleteCollectionMutation } from '@/features/collections/model/useCollectionQuery'
import { useCollectionStore } from '../collections/model/collectionStore'
import styles from './modal.module.scss'

export const ModalDeleteCollection = ({
  isOpen,
  onClose,
  refetch,
  collectionIds,
}: {
  isOpen: boolean
  onClose: () => void
  refetch: () => void
  collectionIds: number[] | number
}) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const { checkedIds, setChecked } = useCollectionStore()
  const { mutate: deleteCollection } = useDeleteCollectionMutation()
  const handleClose = useCallback(() => {
    form.resetFields()
    setIsFormValid(false)
    onClose()
  }, [onClose, form])

  const handleSubmit = useCallback(() => {
    const isArray = Array.isArray(collectionIds)
    deleteCollection(isArray ? collectionIds.join(',') : String(collectionIds), {
      onSuccess: () => {
        refetch()
        handleClose()
        const isSingleCheckedId = !isArray && checkedIds.length === 1 && checkedIds[0] === collectionIds
        if (isArray || isSingleCheckedId) {
          setChecked([])
        }
      },
      onError: () => {
        message.error('Failed to delete collection')
      },
    })
  }, [refetch, handleClose, collectionIds, deleteCollection, setChecked, checkedIds])

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(values.confirmText === 'DELETE')
  }, [form])

  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Delete collection' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Are you sure you want to delete selected collection? The collection will be deleted immediately and this
              action cannot be undone.
              <br />
              <br />
              *All assets inside this collection will not be deleted.
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
                <Input placeholder='Type DELETE to confirm' />
              </Form.Item>
            </dd>
          </dl>
          <div className={styles.modalConfirmButton}>
            <Button key='clear' className={styles.clearAllBtn} onClick={handleClose}>
              Cancel
            </Button>
            <Button key='submit' type='primary' htmlType='submit' disabled={!isFormValid}>
              Confirm delete
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
