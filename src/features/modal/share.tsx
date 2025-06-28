import { useCallback, useEffect, useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, Select, message } from 'antd'
import { useCreateShareMutation } from '@/entities/model/useShareQuery'
import { AssetDetailResponse, AssetListDataResponse } from '@/entities/types/Assets'
import { CollectionAssetListDataResponse } from '@/entities/types/Collections'
import { CollectionListDataResponse } from '@/entities/types/Collections'
import { MainAssetsList } from '@/entities/types/Main'
import useCopyUrl from '@/shared/model/useCopyText'
import styles from './modal.module.scss'

export const ModalShare = ({
  isOpen,
  title,
  shareItem,
  onClose,
}: {
  isOpen: boolean
  title?: string
  shareItem:
    | AssetListDataResponse
    | AssetDetailResponse
    | CollectionListDataResponse
    | CollectionAssetListDataResponse
    | MainAssetsList
  onClose: () => void
}) => {
  const [form] = Form.useForm()
  const { TextArea } = Input
  const { mutate: createShare } = useCreateShareMutation()
  const [accessType, setAccessType] = useState('user')
  const copyUrl = useCopyUrl()
  const handleCancel = useCallback(() => {
    onClose()
  }, [onClose])

  const handleSubmit = useCallback(() => {
    const formData = form.getFieldsValue()
    const getIdPayload = (
      item:
        | AssetListDataResponse
        | AssetDetailResponse
        | CollectionListDataResponse
        | CollectionAssetListDataResponse
        | MainAssetsList
    ) => {
      if ('asset_id' in item) {
        return { asset_id: String(item.asset_id) }
      } else if ('collection_id' in item) {
        return { collection_id: String(item.collection_id) }
      }
      return {}
    }

    const payload = {
      share_hash: shareItem.share_hash,
      who_can_access: formData.who_can_access,
      access_type: formData.access_type,
      message: formData.message,
      recipients: formData.recipients && formData.recipients.length > 0 ? formData.recipients.join(';') : '',
      is_send_email: formData.is_send_email,
      share_url: formData.share_url,
      ...getIdPayload(shareItem),
    }

    createShare(payload, {
      onSuccess: () => {
        handleCancel()
      },
      onError: () => {
        message.error('Failed to create share')
      },
    })
  }, [createShare, form, handleCancel, shareItem])

  const handleUserTypeChange = (value: string) => {
    setAccessType(value)
    form.setFieldValue('share_url', value === 'anyone' ? shareItem.share_url_anyone : shareItem.share_url_user)
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }
  const handleRecipientsChange = (value: string[]) => {
    const validEmails = value.filter(validateEmail)
    const invalidEmails = value.filter(email => !validateEmail(email))

    if (invalidEmails.length > 0) {
      message.error(`Invalid email address: ${invalidEmails.join(', ')}`)
    }

    form.setFieldValue('recipients', validEmails)
  }
  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.stopPropagation()
      event.preventDefault()
    }
  }

  const handleCopy = async () => {
    const shareUrl = form.getFieldValue('share_url')
    if (shareUrl) {
      copyUrl(shareUrl)
    } else {
      message.error('Failed to copy the link.')
    }
  }

  useEffect(() => {
    if (shareItem) {
      form.setFieldValue('share_url', shareItem.share_url_user)
    }
  }, [form, shareItem])

  return (
    <Modal open={isOpen} onCancel={handleCancel} width={800} title={title} footer={[null]}>
      <Form form={form}>
        <div className={styles.modalForm}>
          <dl>
            <dt>Who can access</dt>
            <dd>
              <Form.Item name='who_can_access' initialValue='user'>
                <Select placeholder='Select...' onChange={handleUserTypeChange}>
                  <Select.Option value='user'>DAM users (Internal)</Select.Option>
                  <Select.Option value='anyone'>Anyone with a link</Select.Option>
                </Select>
              </Form.Item>
            </dd>
          </dl>
          <dl>
            <dt>Copy this URL</dt>
            <dd>
              <div className={styles.copyUrl}>
                <Form.Item name='share_url'>
                  <Input disabled />
                </Form.Item>
                <Button onClick={handleCopy}>Copy link</Button>
              </div>
            </dd>
          </dl>
          {accessType === 'anyone' && (
            <>
              <dl>
                <dt>Access type</dt>
                <dd>
                  <Form.Item name='access_type' initialValue='V'>
                    <Select placeholder='Select...'>
                      <Select.Option value='V'>View only</Select.Option>
                      <Select.Option value='D'>View and Download</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item name='is_send_email' valuePropName='checked' initialValue={false}>
                    <Checkbox>Send email (optional)</Checkbox>
                  </Form.Item>
                </dd>
              </dl>
              <dl>
                <dt>Recipients</dt>
                <dd>
                  <Form.Item name='recipients'>
                    <Select
                      mode='tags'
                      placeholder='Select recipients...'
                      open={false}
                      suffixIcon={null}
                      onInputKeyDown={handleInputKeyDown}
                      onChange={handleRecipientsChange}
                    />
                  </Form.Item>
                </dd>
              </dl>
              <dl>
                <dt>Message</dt>
                <dd>
                  <Form.Item name='message'>
                    <TextArea placeholder='Enter message...' />
                  </Form.Item>
                </dd>
              </dl>
            </>
          )}
        </div>
        <div className={styles.modalConfirmButton}>
          <Button key='clear' className={styles.clearAllBtn} onClick={handleCancel}>
            Cancel
          </Button>
          <Button key='submit' type='primary' onClick={handleSubmit}>
            Done
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
