import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, Radio, Select, message } from 'antd'
import { CollectionAssetListDataResponse, CollectionListDataResponse } from '@/entities/types/Collections'
import { MainCollectionsList } from '@/entities/types/Main'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { useCopyCollectionMutation } from '@/features/collections/model/useCollectionQuery'
import styles from './modal.module.scss'

export const ModalDuplicateCollection = ({
  isOpen,
  onClose,
  collection,
  isEdit,
  refetch,
}: {
  isOpen: boolean
  onClose: () => void
  collection?: CollectionListDataResponse | CollectionAssetListDataResponse | MainCollectionsList
  isEdit: boolean
  refetch: () => void
}) => {
  const [form] = Form.useForm()
  const { TextArea } = Input

  const { collectionTags } = useCollectionStore()
  const [newTags, setNewTags] = useState<string[]>([])
  const [showNewTags, setShowNewTags] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const { mutate: copyCollection } = useCopyCollectionMutation()
  const handleCancel = useCallback(() => {
    form.resetFields()
    onClose()
  }, [onClose, form])

  const handleSubmit = useCallback(() => {
    if (collection) {
      const { name, description, tag_ids, new_tags, is_master } = form.getFieldsValue()
      const payload = {
        name: isEdit ? name : collection.name,
        description: isEdit ? description : collection.description,
        is_master: isEdit ? is_master : collection.is_master,
        tag_ids: isEdit ? (tag_ids ? tag_ids.join(',') : '') : collection.tags?.map(tag => tag.tag_id).join(',') || '',
        new_tags: isEdit && new_tags ? new_tags.join(',') : '',
      }

      copyCollection(
        { collection_id: collection.collection_id, payload },
        {
          onSuccess: () => {
            handleCancel()
            refetch()
          },
          onError: () => message.error('Failed to create collection'),
        }
      )
    }
  }, [copyCollection, collection, handleCancel, form, refetch, isEdit])

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
      collectionTags.map(tag => (
        <Select.Option key={tag.tag_id} value={tag.tag_id}>
          {tag.tag_name}
        </Select.Option>
      )),
    [collectionTags]
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
    <Modal open={isOpen} onCancel={handleCancel} width={800} title='Duplicate collection' footer={[null]}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={onFieldsChange}>
        <div className={styles.modalForm}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <br />
            Aliquam sit amet est pharetra, fringilla tortor at, sollicitudin sem.
          </p>
          {isEdit && (
            <>
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
                    <Checkbox onChange={e => handleNewCollectionChange(e.target.checked)}>
                      Add new collection tag
                    </Checkbox>
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
            </>
          )}
        </div>
        <div className={styles.modalConfirmButton}>
          <Button key='clear' className={styles.clearAllBtn} onClick={handleCancel}>
            Cancel
          </Button>
          <Button key='submit' type='primary' htmlType='submit' disabled={!isFormValid}>
            {isEdit ? 'Create' : 'Duplicate'}
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
