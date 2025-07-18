import { useCallback, useState } from 'react'
import { Button } from 'antd'
import { FilterOutlined } from '@ant-design/icons'
import { useAssetStore } from '@/features/assets/model/assetsStore'
import { useAssetRefsQuery } from '@/features/assets/model/useAssetQuery'
import { ModalType } from '@/features/modal'
import { Modal } from '@/features/modal'
import { mapToSelectOptions } from '@/shared/lib/optionMappers'
import { SearchChecked } from '@/shared/ui/searchChecked'
import { SelectChecked } from '@/shared/ui/selectChecked'
import { Sort, type SortValue } from '@/shared/ui/sort'
import { useAssetFilterSubmit } from '../../model/useAssetFilterSubmit'
import styles from './filterControls.module.scss'

export const FilterControls = () => {
  const { filters, filterOptions, setFilters, setAssetParams } = useAssetStore()
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const submitFilters = useAssetFilterSubmit()

  const handleChange = useCallback(
    (key: string) => (value: number[]) => {
      setFilters(key.replace(/\s+/g, ''), {
        title: key,
        data: value,
      })
      submitFilters()
    },
    [setFilters, submitFilters]
  )
  const handleSortChange = useCallback(
    (value: SortValue) => {
      setAssetParams({ sort: value })
    },
    [setAssetParams]
  )

  useAssetRefsQuery()
  return (
    <div className={styles.filterControls}>
      <div className={styles.filter}>
        <SelectChecked
          title='Asset type'
          options={mapToSelectOptions(filterOptions?.asset_types, 'asset_type_id', 'name')}
          onChange={handleChange}
          value={Array.isArray(filters?.Assettype?.data) ? filters.Assettype.data : []}
        />
        <SearchChecked
          title='Tags'
          options={mapToSelectOptions(
            filterOptions?.tags?.flatMap(tag => tag.child_tags || []),
            'tag_id',
            'tag_name'
          )}
          onChange={handleChange}
          value={Array.isArray(filters?.Tags?.data) ? filters.Tags.data : []}
        />
        <Button icon={<FilterOutlined />} size='middle' onClick={() => setActiveModal(ModalType.ASSET_FILTERS)}>
          Filters
        </Button>
      </div>
      <Sort onChange={handleSortChange} />

      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={() => setActiveModal(ModalType.NONE)}
      />
    </div>
  )
}
