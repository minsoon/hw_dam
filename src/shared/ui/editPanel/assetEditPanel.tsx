import { Button, Checkbox, Collapse, Input, Radio, Select, Tag } from 'antd'
import {
  CaretRightOutlined,
  CloseOutlined,
  DownOutlined,
  PlusOutlined,
  SyncOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { useAuth } from '@/shared/contexts/AuthContext'
import {
  useAssetCheckboxPanel,
  useAssetContactsPanel,
  useAssetCopyrightPanel,
  useAssetEditPanel,
  useAssetRadioPanel,
  useAssetTagPanel,
} from '@/shared/model/useAssetEditPanel'
import {
  useApplyAll,
  useUploadCheckboxPanel,
  useUploadContactsPanel,
  useUploadCopyrightPanel,
  useUploadEditPanel,
  useUploadRadioPanel,
  useUploadTagPanel,
} from '@/shared/model/useUploadEditPanel'
import { CheckboxGroupPanelProps, PanelItemsProps, ViewType } from '@/shared/types/editPanel'
import styles from './assetEditPanel.module.scss'

const { TextArea } = Input

export const PanelTitle = ({ panel, isImageType }: { panel: PanelItemsProps; isImageType?: boolean }) => {
  const { handleApplyAll } = useApplyAll(panel)
  return (
    <div className={styles.panelTitle}>
      <p>{panel.title}</p>
      {isImageType && (
        <Button
          color='default'
          variant='text'
          icon={<SyncOutlined />}
          value={panel.type}
          size='small'
          onClick={e => {
            e.stopPropagation()
            handleApplyAll()
          }}
        >
          Apply all
        </Button>
      )}
    </div>
  )
}

export const InfoEditPanel = ({ isImageType, viewType }: { isImageType?: boolean; viewType: ViewType }) => {
  const uploadPanel = useUploadEditPanel()
  const assetPanel = useAssetEditPanel()

  const { name, setName, description, setDescription, isConfidential, handleConfidential, handleBlur } =
    viewType === 'upload' ? uploadPanel : assetPanel

  return (
    <div className={styles.infoEditPanel}>
      <dl>
        <dt>Asset name</dt>
        <dd>
          <Input value={name} onBlur={() => handleBlur()} onChange={e => setName(e.target.value)} />
        </dd>
        <dt>Description</dt>
        <dd>
          <TextArea value={description} onBlur={() => handleBlur()} onChange={e => setDescription(e.target.value)} />
        </dd>
      </dl>
      {!isImageType && (
        <p>
          <Checkbox checked={isConfidential} onChange={handleConfidential}>
            Mark as confidential document
          </Checkbox>
        </p>
      )}
    </div>
  )
}
export const TagEditPanel = (panel: PanelItemsProps) => {
  const { viewType } = panel

  const uploadPanel = useUploadTagPanel(panel.id, panel.data)
  const assetPanel = useAssetTagPanel(panel.id, panel.data)

  const {
    inputValue,
    setInputValue,
    isExpanded,
    setIsExpanded,
    showToggleButton,
    tagListRef,
    handleTagClick,
    handleAddTag,
    panelData,
  } = viewType === 'upload' ? uploadPanel : assetPanel

  const matchedTag = panelData?.tags.find(tag => tag.tag_id === panel.id)
  const tagData = matchedTag?.child_tags ?? []

  return (
    <div className={styles.tagEditPanel}>
      <dl>
        <dt>Tags added:</dt>
        <dd>
          <div className={styles.addTag}>
            <div className={styles.tagList}>
              {tagData
                .filter(item => item.is_selected === 1)
                .map((item, index) => (
                  <Tag key={index} className={styles.tag} onClick={() => handleTagClick(item?.tag_id ?? 0)}>
                    {item.tag_name}
                    <CloseOutlined />
                  </Tag>
                ))}
            </div>
          </div>
        </dd>
      </dl>
      <div className={styles.addTagInput}>
        <Input
          placeholder='Add tags'
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className={styles.input}
        />
        <Button type='text' icon={<PlusOutlined />} className={styles.addButton} onClick={handleAddTag} />
      </div>
      <dl>
        <dt>Tags suggested:</dt>
        <dd>
          <div className={styles.addTag}>
            <div
              ref={tagListRef}
              className={`${styles.tagList} ${styles.addTagList} ${isExpanded ? styles.expanded : ''}`}
            >
              {tagData
                .filter(item => !item.is_selected || item.is_selected === 0)
                .map((item, index) => (
                  <Tag
                    key={index}
                    color='default'
                    className={styles.addTag}
                    onClick={() => handleTagClick(item?.tag_id ?? 0)}
                  >
                    {item.tag_name}
                    <PlusOutlined />
                  </Tag>
                ))}
            </div>
            {showToggleButton && (
              <Button
                type='text'
                className={styles.showMore}
                icon={isExpanded ? <UpOutlined /> : <DownOutlined />}
                size='small'
                onClick={() => setIsExpanded(prev => !prev)}
              >
                {isExpanded ? 'Show less' : 'Show more'}
              </Button>
            )}
          </div>
        </dd>
      </dl>
    </div>
  )
}

export const RadioEditPanel = (panel: PanelItemsProps) => {
  const uploadPanel = useUploadRadioPanel(panel)
  const assetPanel = useAssetRadioPanel(panel)
  const { panelData, selected, handleChange } = panel.viewType === 'upload' ? uploadPanel : assetPanel

  const matchedProperty = panelData?.properties.find(property => property.property_category_id === panel.id)
  const propertyData = matchedProperty?.options ?? []
  return (
    <div className={styles.radioEditPanel}>
      <Radio.Group
        options={propertyData.map(item => ({
          label: item.option_name,
          value: item.property_option_id,
        }))}
        value={selected && 'property_option_id' in selected ? selected.property_option_id : undefined}
        onChange={e => handleChange(Number(e.target.value))}
      />
    </div>
  )
}
export const CheckboxEditPanel = (panel: PanelItemsProps) => {
  const uploadPanel = useUploadCheckboxPanel(panel)
  const assetPanel = useAssetCheckboxPanel(panel)
  const { panelData, selectedIds, handleChange } = panel.viewType === 'upload' ? uploadPanel : assetPanel

  const matchedProperty = panelData?.properties.find(p => p.property_category_id === panel.id)
  const propertyOptions = matchedProperty?.options ?? []

  return (
    <div className={styles.checkboxEditPanel}>
      <Checkbox.Group
        style={{ display: 'flex', flexDirection: 'column' }}
        options={propertyOptions.map(item => ({
          label: item.option_name,
          value: item.property_option_id.toString(),
        }))}
        value={selectedIds}
        onChange={handleChange}
      />
    </div>
  )
}

export const SelectEditPanel = (panel: PanelItemsProps) => {
  return (
    <Select
      style={{ width: '100%', height: '40px' }}
      options={panel.data.map(item => ({ value: item.value, label: item.id }))}
    />
  )
}

export const CheckboxGroupEditPanel = ({ panelData }: CheckboxGroupPanelProps) => {
  const items = panelData.map(panel => {
    return {
      key: panel.title,
      label: panel.title,
      children: (
        <Checkbox.Group
          style={{ display: 'flex', flexDirection: 'column' }}
          options={panel.data.map(item => ({ label: item.value, value: item.id.toString() }))}
          defaultValue={['Apple']}
        />
      ),
    }
  })
  return (
    <div className={styles.checkboxGroupEditPanel}>
      <Collapse
        className={styles.collapseGroup}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ fontSize: '12px' }} />}
        items={items}
      />
    </div>
  )
}

export const ContactsEditPanel = (panel: PanelItemsProps) => {
  const uploadPanel = useUploadContactsPanel()
  const assetPanel = useAssetContactsPanel()
  const isUpload = panel.viewType === 'upload'
  const { user } = useAuth()
  const { asset, handleChange } = isUpload ? uploadPanel : assetPanel

  return (
    <div className={styles.contactsEditPanel}>
      <dl>
        <dt>Uploader</dt>
        <dd>
          <Input placeholder='Uploader name' value={isUpload ? user?.username : asset?.uploader_name} disabled />
          {/* <Input placeholder='Contact number' value={isUpload ? user?.phone : asset?.uploader_contact_number} disabled /> */}
          <Input placeholder='Email address' value={isUpload ? user?.email : asset?.uploader_email} disabled />
        </dd>
        <dt>Are you the asset owner?</dt>
        <dd>
          <Radio.Group
            value={asset?.is_owner}
            onChange={e => handleChange('is_owner', e.target.value)}
            options={[
              { label: 'Yes', value: 1 },
              { label: 'No', value: 0 },
            ]}
          />
        </dd>

        <dt>Asset owner</dt>
        <dd>
          <Input
            placeholder='Owner name'
            value={asset?.owner_name}
            onChange={e => handleChange('owner_name', e.target.value)}
          />
          <Input
            placeholder='Email address'
            value={asset?.owner_email}
            onChange={e => handleChange('owner_email', e.target.value)}
          />
        </dd>

        <dt>Agency contact</dt>
        <dd>
          <Input
            placeholder='Agency name'
            value={asset?.agency_name}
            onChange={e => handleChange('agency_name', e.target.value)}
          />
          <Input
            placeholder='Contact name'
            value={asset?.agency_contact_name}
            onChange={e => handleChange('agency_contact_name', e.target.value)}
          />
        </dd>
      </dl>
    </div>
  )
}

export const CopyrightEditPanel = (panel: PanelItemsProps) => {
  const uploadPanel = useUploadCopyrightPanel()
  const assetPanel = useAssetCopyrightPanel()
  const { copyrightText, setCopyrightText, handleBlur } = panel.viewType === 'upload' ? uploadPanel : assetPanel

  return (
    <div className={styles.copyrightEditPanel}>
      <TextArea
        placeholder='Enter copyright info...'
        value={copyrightText}
        onChange={e => setCopyrightText(e.target.value)}
        onBlur={handleBlur}
        autoSize={{ minRows: 3, maxRows: 6 }}
      />
    </div>
  )
}
