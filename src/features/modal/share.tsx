import { useCallback, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Modal, Select, message } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useCreateShareMutation } from '@/entities/model/useShareQuery'
import { AssetDetailResponse, AssetListDataResponse } from '@/entities/types/Assets'
import { CollectionAssetListDataResponse, CollectionListDataResponse } from '@/entities/types/Collections'
import { MainAssetsList } from '@/entities/types/Main'
import useCopyUrl from '@/shared/model/useCopyText'
import styles from './modal.module.scss'

const { TextArea } = Input

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
  const copyUrl = useCopyUrl()
  const { mutate: createShare } = useCreateShareMutation()

  const who_can_access = Form.useWatch('who_can_access', form)
  const is_send_email = Form.useWatch('is_send_email', form)

  const handleCancel = useCallback(() => {
    onClose()
  }, [onClose])

  const getIdPayload = useCallback(
    (
      item:
        | AssetListDataResponse
        | AssetDetailResponse
        | CollectionListDataResponse
        | CollectionAssetListDataResponse
        | MainAssetsList
    ) => {
      if ('asset_id' in item) return { asset_id: String(item.asset_id) }
      if ('collection_id' in item) return { collection_id: String(item.collection_id) }
      return {}
    },
    []
  )

  const handleSubmit = useCallback(() => {
    const values = form.getFieldsValue()
    const payload = {
      share_hash: shareItem.share_hash,
      who_can_access: values.who_can_access,
      // access_type: values.access_type,
      message: values.message,
      recipients: values.recipients?.join(';') || '',
      is_send_email: values.is_send_email,
      share_url: values.share_url,
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
  }, [createShare, form, handleCancel, shareItem, getIdPayload])

  const handleUserTypeChange = (value: string) => {
    form.setFieldValue('share_url', value === 'anyone' ? shareItem.share_url_anyone : shareItem.share_url_user)
  }

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const handleRecipientsChange = (value: string[]) => {
    const validEmails = value.filter(validateEmail)
    const invalidEmails = value.filter(email => !validateEmail(email))

    if (invalidEmails.length) {
      message.error(`Invalid email address: ${invalidEmails.join(', ')}`)
    }
    form.setFieldValue('recipients', validEmails)
  }

  const handleSendEmailChange = (e: CheckboxChangeEvent) => {
    if (!e.target.checked) {
      form.setFieldsValue({ recipients: [], message: '' })
    }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') e.preventDefault()
  }

  const handleCopy = () => {
    const url = form.getFieldValue('share_url')
    if (url) {
      copyUrl(url)
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
    <Modal open={isOpen} onCancel={handleCancel} width={800} title={title} footer={null}>
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

          {who_can_access === 'anyone' && (
            <>
              {/* <dl>
                <dt>Access type</dt>
                <dd>
                  <Form.Item name='access_type' initialValue='D'>
                    <Select placeholder='Select...'>
                      <Select.Option value='V'>View only</Select.Option>
                      <Select.Option value='D'>View and Download</Select.Option>
                    </Select>
                  </Form.Item>
                </dd>
              </dl> */}

              <dl>
                <dd>
                  <Form.Item name='is_send_email' valuePropName='checked' initialValue={false}>
                    <Checkbox onChange={handleSendEmailChange}>Send email (optional)</Checkbox>
                  </Form.Item>
                </dd>
              </dl>

              {is_send_email && (
                <>
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
            </>
          )}
        </div>

        <div className={styles.modalConfirmButton}>
          <Button className={styles.clearAllBtn} onClick={handleCancel}>
            Cancel
          </Button>
          <Button type='primary' onClick={handleSubmit}>
            Done
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
