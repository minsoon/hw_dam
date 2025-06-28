import { useCallback, useState } from 'react'
import { Button, Form, Input, Modal, message } from 'antd'
import { useAssetStore } from '../assets/model/assetsStore'
import { useAssetDeleteMutation } from '../assets/model/useAssetQuery'
import styles from './modal.module.scss'

export const ModalDeleteSelected = ({
  isOpen,
  assetIds,
  onClose,
  refetch,
}: {
  isOpen: boolean
  assetIds: number[] | number
  onClose: () => void
  refetch: () => void
}) => {
  const [form] = Form.useForm()
  const { checkedIds, setChecked } = useAssetStore()
  const [isFormValid, setIsFormValid] = useState(false)
  const { mutate: deleteAsset } = useAssetDeleteMutation()

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleFieldsChange = useCallback(() => {
    const values = form.getFieldsValue()
    setIsFormValid(values.confirmText === 'DELETE')
  }, [form])

  const handleSubmit = useCallback(() => {
    const isArray = Array.isArray(assetIds)
    deleteAsset(
      { asset_ids: isArray ? assetIds.join(',') : String(assetIds) },
      {
        onSuccess: () => {
          refetch()
          handleClose()
          const isSingleCheckedId = !isArray && checkedIds.length === 1 && checkedIds[0] === assetIds
          if (isArray || isSingleCheckedId) {
            setChecked([])
          }
        },
        onError: () => {
          message.error('Failed to delete asset')
        },
      }
    )
  }, [assetIds, checkedIds, deleteAsset, handleClose, refetch, setChecked])

  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Delete selected' footer={[null]}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Are you sure you want to delete selected asset? The asset will be deleted
              <br />
              immediately and this action cannot be undone.
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
