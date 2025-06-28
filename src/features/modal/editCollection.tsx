import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, Radio, Select, message } from 'antd'
import { CollectionAssetListDataResponse, CollectionListDataResponse } from '@/entities/types/Collections'
import { MainCollectionsList } from '@/entities/types/Main'
import { useCollectionTagsQuery, useUpdateCollectionMutation } from '@/features/collections/model/useCollectionQuery'
import styles from './modal.module.scss'

export const ModalEditCollection = ({
  isOpen,
  onClose,
  collection,
  refetch,
}: {
  isOpen: boolean
  onClose: () => void
  collection?: CollectionListDataResponse | CollectionAssetListDataResponse | MainCollectionsList
  refetch: () => void
}) => {
  const [form] = Form.useForm()
  const { TextArea } = Input
  const [newTags, setNewTags] = useState<string[]>([])
  const [showNewTags, setShowNewTags] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const { mutate: updateCollection } = useUpdateCollectionMutation()
  const { data: tags } = useCollectionTagsQuery()

  const handleCancel = useCallback(() => {
    form.resetFields()
    onClose()
  }, [onClose, form])

  const handleSubmit = useCallback(() => {
    const { name, description, tag_ids, new_tags, is_master } = form.getFieldsValue()
    const payload = {
      name,
      description,
      is_master,
      tag_ids: tag_ids ? tag_ids.join(',') : '',
      new_tags: new_tags ? new_tags.join(',') : '',
    }
    if (collection?.collection_id) {
      updateCollection(
        { collection_id: collection?.collection_id, payload },
        {
          onSuccess: () => {
            refetch()
            handleCancel()
          },
          onError: () => message.error('Failed to update collection'),
        }
      )
    }
  }, [updateCollection, handleCancel, form, collection?.collection_id, refetch])

  const handleNewCollectionChange = useCallback((isChecked: boolean) => {
    setShowNewTags(isChecked)
  }, [])

  const onFieldsChange = useCallback(() => {
    const { name, description, tag_ids, is_new_tags, new_tags } = form.getFieldsValue()
    const isTagsValid = is_new_tags ? new_tags && new_tags.length > 0 : tag_ids && tag_ids.length > 0
    setIsFormValid(!!(name && description && isTagsValid))
  }, [form])

  const tagOptions = useMemo(
    () =>
      tags?.data.map(tag => (
        <Select.Option key={tag.tag_id} value={tag.tag_id}>
          {tag.tag_name}
        </Select.Option>
      )),
    [tags]
  )

  useEffect(() => {
    if (collection) {
      form.setFieldsValue({
        name: collection.name || '',
        description: collection.description || '',
        is_master: collection.is_master === 0 ? false : true,
        tag_ids: collection.tags?.map(tag => tag.tag_id) || [],
      })
    }
  }, [collection, form])

  return (
    <Modal open={isOpen} onCancel={handleCancel} width={800} title='Edit collection' footer={[null]}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={onFieldsChange}>
        <div className={styles.modalForm}>
          <dl>
            <dt>Collection name</dt>
            <dd>
              <Form.Item name='name' initialValue={collection?.name || ''}>
                <Input placeholder='' />
              </Form.Item>
            </dd>
          </dl>
          <dl>
            <dt>Description</dt>
            <dd>
              <Form.Item name='description' initialValue={collection?.description || ''}>
                <TextArea placeholder='' />
              </Form.Item>
            </dd>
          </dl>
          <dl>
            <dt>Collection type</dt>
            <dd>
              <Form.Item name='is_master' initialValue={collection?.is_master === 0 ? true : false}>
                <Radio.Group>
                  <Radio value={true}>Master Collection</Radio>
                  <Radio value={false}>My Collection</Radio>
                </Radio.Group>
              </Form.Item>
            </dd>
          </dl>
          <dl>
            <dt>Select collection tags</dt>
            <dd>
              <Form.Item name='tag_ids' initialValue={collection?.tags?.map(tag => tag.tag_id) || []}>
                <Select mode='multiple' style={{ width: '100%' }} placeholder='Please select'>
                  {tagOptions}
                </Select>
              </Form.Item>
              <Form.Item name='is_new_tags' valuePropName='checked'>
                <Checkbox onChange={e => handleNewCollectionChange(e.target.checked)}>Add new collection tag</Checkbox>
              </Form.Item>
            </dd>
          </dl>
          {showNewTags && (
            <dl>
              <dt>New collection tags</dt>
              <dd>
                <Form.Item name='new_tags'>
                  <Select
                    mode='tags'
                    style={{ width: '100%' }}
                    placeholder='Add tags'
                    onChange={values => setNewTags(values)}
                    open={false}
                    suffixIcon={null}
                    value={newTags}
                  />
                </Form.Item>
                <p>Separate with commas or the enter key.</p>
              </dd>
            </dl>
          )}
        </div>
        <div className={styles.modalConfirmButton}>
          <Button key='clear' className={styles.clearAllBtn} onClick={handleCancel}>
            Cancel
          </Button>
          <Button key='submit' type='primary' htmlType='submit' disabled={!isFormValid}>
            Create
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
