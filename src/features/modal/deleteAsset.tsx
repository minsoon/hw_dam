import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Form, Input, Modal, message } from 'antd'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { useAssetDeleteMutation } from '@/features/assets/model/useAssetQuery'
import styles from './modal.module.scss'

export const ModalDeleteAsset = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = useState(false)
  const router = useRouter()
  const { asset } = useAssetDetailStore()
  const { mutate: deleteAsset } = useAssetDeleteMutation()

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
    if (!asset) return
    deleteAsset(
      { asset_ids: String(asset.asset_id) },
      {
        onSuccess: () => {
          handleClose()
          router.push(`/assets`)
        },
        onError: () => {
          message.error('Failed to delete asset')
        },
      }
    )
  }, [asset, deleteAsset, handleClose, router])
  return (
    <Modal open={isOpen} onCancel={handleClose} width={600} title='Delete asset' footer={null}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={handleFieldsChange} validateTrigger={['onSubmit']}>
        <div className={styles.modalConfirm}>
          <dl>
            <dt>
              Are you sure you want to delete this asset? This action can not be undone.
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
              Confirm delete
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  )
}
