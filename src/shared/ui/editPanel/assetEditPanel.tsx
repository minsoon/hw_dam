import { Button, Checkbox, Collapse, Input, Radio, Select, Tag } from 'antd'
import {
  CaretRightOutlined,
  CloseOutlined,
  DownOutlined,
  PlusOutlined,
  SyncOutlined,
  UpOutlined,
} from '@ant-design/icons'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import { useAuth } from '@/shared/contexts/AuthContext'
import {
  useAssetCheckboxPanel,
  useAssetContactsPanel,
  useAssetCopyrightPanel,
  useAssetEditPanel,
  useAssetProductModelPanel,
  useAssetProductSegmentPanel,
  useAssetRadioPanel,
  useAssetTagPanel,
} from '@/shared/model/useAssetEditPanel'
import {
  useApplyAll,
  useUploadCheckboxPanel,
  useUploadContactsPanel,
  useUploadCopyrightPanel,
  useUploadEditPanel,
  useUploadProductModelPanel,
  useUploadProductSegmentPanel,
  useUploadRadioPanel,
  useUploadTagPanel,
} from '@/shared/model/useUploadEditPanel'
import { CheckboxGroupPanelProps, PanelItemsProps, ViewType } from '@/shared/types/editPanel'
import styles from './assetEditPanel.module.scss'

const { TextArea } = Input

export const PanelTitle = ({ panel, isImageType }: { panel: PanelItemsProps; isImageType?: boolean }) => {
  const { handleApplyAll } = useApplyAll(panel)
  const { assets } = useUploaderStore()

  return (
    <div className={styles.panelTitle}>
      <p>{panel.title}</p>
      {isImageType && assets.length > 1 && (
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

export const InfoEditPanel = ({
  isImageType,
  viewType,
  isEmergencyOverride,
}: {
  isImageType?: boolean
  viewType: ViewType
  isEmergencyOverride?: boolean
}) => {
  const uploadPanel = useUploadEditPanel()
  const assetPanel = useAssetEditPanel()

  const { name, handleNameChange, description, setDescription, isConfidential, handleConfidential, handleBlur } =
    viewType === 'upload' ? uploadPanel : assetPanel

  return (
    <div className={styles.infoEditPanel}>
      <dl>
        <dt>
          Asset name<span>*</span>
        </dt>
        <dd>
          <Input value={name} onChange={handleNameChange} disabled={isEmergencyOverride} />
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
          onKeyDown={e => {
            if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
              handleAddTag()
            }
          }}
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

export const ProductSegmentEditPanel = (panel: PanelItemsProps) => {
  const uploadPanel = useUploadProductSegmentPanel()
  const assetPanel = useAssetProductSegmentPanel()
  const { panelData, selectedIds, handleChange } = panel.viewType === 'upload' ? uploadPanel : assetPanel

  return (
    <div className={styles.segmentEditPanel}>
      <Checkbox.Group
        style={{ display: 'flex', flexDirection: 'column' }}
        options={panelData?.product_segments?.map(item => ({
          label: item.spec_name,
          value: item.product_segment_id?.toString(),
        }))}
        value={selectedIds}
        onChange={handleChange}
      />
    </div>
  )
}

export const ProductModelEditPanel = (panel: PanelItemsProps) => {
  const uploadPanel = useUploadProductModelPanel()
  const assetPanel = useAssetProductModelPanel()
  const { options, selectedIds, handleSearch, handleChange } = panel.viewType === 'upload' ? uploadPanel : assetPanel

  return (
    <Select
      mode='multiple'
      showSearch
      optionFilterProp='label'
      filterOption={false}
      onSearch={handleSearch}
      style={{ width: '100%' }}
      options={options}
      placeholder='Select Product Model'
      fieldNames={{ label: 'product_model', value: 'product_model_id' }}
      value={selectedIds}
      onChange={handleChange}
    />
  )
}

export const SelectEditPanel = (panel: PanelItemsProps) => {
  return (
    <Select
      showSearch
      optionFilterProp='label'
      filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
      style={{ width: '100%', height: '40px' }}
      options={panel.data.map(item => ({ value: item.id, label: item.value }))}
      placeholder={'Select Product Model'}
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
  const { asset, formValues, handleChange, handleBlur } = isUpload ? uploadPanel : assetPanel

  return (
    <div className={styles.contactsEditPanel}>
      <dl>
        <dt>Uploader</dt>
        <dd>
          <Input placeholder='Uploader name' value={isUpload ? user?.user_name : asset?.uploader_name} disabled />
          {/* <Input placeholder='Contact number' value={isUpload ? user?.phone : asset?.uploader_contact_number} disabled /> */}
          <Input placeholder='Email address' value={isUpload ? user?.email : asset?.uploader_email} disabled />
        </dd>
        <dt>Are you the asset owner?</dt>
        <dd>
          <Radio.Group
            value={formValues.is_owner}
            onChange={e => handleChange('is_owner', e.target.value)}
            onBlur={handleBlur}
            options={[
              { label: 'Yes', value: 1 },
              { label: 'No', value: 0 },
            ]}
          />
        </dd>
        {formValues.is_owner === 0 && (
          <>
            <dt>Asset owner</dt>
            <dd>
              <Input
                placeholder='Owner name'
                value={formValues.owner_name}
                onChange={e => handleChange('owner_name', e.target.value)}
                onBlur={handleBlur}
              />
              <Input
                placeholder='Email address'
                value={formValues.owner_email}
                onChange={e => handleChange('owner_email', e.target.value)}
                onBlur={handleBlur}
              />
            </dd>

            <dt>Agency contact</dt>
            <dd>
              <Input
                placeholder='Agency name'
                value={formValues.agency_name}
                onChange={e => handleChange('agency_name', e.target.value)}
                onBlur={handleBlur}
              />
              <Input
                placeholder='Contact name'
                value={formValues.agency_contact_name}
                onChange={e => handleChange('agency_contact_name', e.target.value)}
                onBlur={handleBlur}
              />
            </dd>
          </>
        )}
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
