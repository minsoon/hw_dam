import { useCallback, useMemo, useState } from 'react'
import { Button, Checkbox, Form, Input, Modal, Radio, Select, message } from 'antd'
import { CollectionListDataResponse } from '@/entities/types/Collections'
import {
  useCollectionTagsQuery,
  useCollectionsQuery,
  useCreateCollectionAssetMutation,
} from '@/features/assets/model/useAssetQuery'
import styles from '@/features/modal/modal.module.scss'

export const ModalAddToCollection = ({
  isOpen,
  assetId,
  onClose,
  refetch,
}: {
  isOpen: boolean
  assetId: number | number[]
  onClose: () => void
  refetch?: () => void
}) => {
  const { TextArea } = Input
  const [form] = Form.useForm()

  const [newTags, setNewTags] = useState<string[]>([])
  const [showNewTags, setShowNewTags] = useState(false)
  const [collection, setCollection] = useState<CollectionListDataResponse[]>([])
  const [isFormValid, setIsFormValid] = useState(false)

  const { mutate: createCollectionAsset } = useCreateCollectionAssetMutation()
  const { data: collections } = useCollectionsQuery()
  const { data: tags } = useCollectionTagsQuery()

  const handleCancel = useCallback(() => {
    form.resetFields()
    onClose()
  }, [onClose, form])

  const handleCollectionChange = useCallback(
    (selectedCollectionId: number) => {
      if (selectedCollectionId) {
        const selectedCollection = collections?.data.filter(
          collection => collection.collection_id === selectedCollectionId
        )
        setCollection(selectedCollection || [])
        form.resetFields(['name', 'description'])
      } else {
        form.validateFields(['name', 'description'])
        setCollection([])
      }
    },
    [collections, form]
  )

  const onFieldsChange = useCallback(() => {
    const { existingCollection, name, description, tag_ids, is_new_tags, new_tags } = form.getFieldsValue()
    const isCollectionSelected = existingCollection !== '0'
    const isNameAndDescriptionValid = name && description
    const isTagsValid = is_new_tags ? new_tags && new_tags.length > 0 : tag_ids && tag_ids.length > 0

    setIsFormValid((isCollectionSelected || isNameAndDescriptionValid) && isTagsValid)
  }, [form])

  const handleNewCollectionChange = useCallback(
    (isChecked: boolean) => {
      setShowNewTags(isChecked)
      if (!isChecked) {
        setNewTags([])
        form.setFieldsValue({ new_tags: [] })
      }
    },
    [form]
  )

  const handleSubmit = useCallback(() => {
    const { existingCollection, name, description, tag_ids, new_tags, is_master } = form.getFieldsValue()

    const payload = {
      collection_id: existingCollection ? existingCollection : null,
      asset_ids: assetId.toString(),
      tag_ids: tag_ids ? tag_ids.join(',') : '',
      new_tags: new_tags ? new_tags.join(',') : '',
      is_new_collection: existingCollection === 0,
      name: name,
      description: description,
      is_master: is_master,
    }
    createCollectionAsset(payload, {
      onSuccess: () => {
        if (refetch) {
          refetch()
        }
        handleCancel()
        message.success('Collection created successfully')
      },
      onError: () => {
        message.error('Failed to create collection')
      },
    })
  }, [createCollectionAsset, handleCancel, assetId, form, refetch])

  const collectionOptions = useMemo(
    () =>
      collections?.data.map(collection => (
        <Select.Option key={collection.collection_id} value={collection.collection_id}>
          {collection.name}
        </Select.Option>
      )),
    [collections]
  )

  const tagOptions = useMemo(
    () =>
      tags?.data.map(tag => (
        <Select.Option key={tag.tag_id} value={tag.tag_id}>
          {tag.tag_name}
        </Select.Option>
      )),
    [tags]
  )

  return (
    <Modal open={isOpen} onCancel={handleCancel} width={800} title='Add To Collection' footer={[null]}>
      <Form form={form} onFinish={handleSubmit} onFieldsChange={onFieldsChange}>
        <div className={styles.modalForm}>
          <dl>
            <dt>Select from existing collection</dt>
            <dd>
              <Form.Item name='existingCollection' initialValue={0}>
                <Select style={{ width: '100%' }} placeholder='Select...' onChange={handleCollectionChange}>
                  <Select.Option key='new' value={0}>
                    New Collection
                  </Select.Option>
                  {collectionOptions}
                </Select>
              </Form.Item>
            </dd>
          </dl>
          <dl>
            <dt>Or create new</dt>
            <dd>
              <Form.Item name='name'>
                <Input placeholder='Enter collection name' disabled={collection?.length > 0} />
              </Form.Item>
            </dd>
          </dl>
          <dl>
            <dt>Description</dt>
            <dd>
              <Form.Item name='description'>
                <TextArea placeholder='' disabled={collection?.length > 0} />
              </Form.Item>
            </dd>
          </dl>
          <dl>
            <dt>Collection type</dt>
            <dd>
              <Form.Item name='is_master' initialValue={true}>
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
              <Form.Item name='tag_ids'>
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
            Add to collection
          </Button>
        </div>
      </Form>
    </Modal>
  )
}
