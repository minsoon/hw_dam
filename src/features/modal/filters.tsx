import { useCallback } from 'react'
import { Button, Modal, Select } from 'antd'
import { useAssetStore } from '@/features/assets/model/assetsStore'
import { useAssetFilterSubmit } from '../assets/model/useAssetFilterSubmit'
import styles from './modal.module.scss'

export const ModalFilters = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { filters, filterOptions, setFilters, removeFilter } = useAssetStore()
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

  const handleClose = useCallback(() => {
    submitFilters()
    onClose()
  }, [onClose, submitFilters])

  const handleSubmit = useCallback(() => {
    submitFilters()
    onClose()
  }, [onClose, submitFilters])

  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={800}
      title='Filters'
      footer={[
        <div className={styles.modalFiltersFooter} key='submit'>
          <Button className={styles.clearAllBtn} color='default' variant='link' onClick={() => removeFilter(null)}>
            Clear all
          </Button>
          <Button type='primary' onClick={handleSubmit}>
            Search
          </Button>
        </div>,
      ]}
    >
      <div className={styles.modalFilters}>
        {filterOptions?.properties.map(property => (
          <dl key={property.property_category_id}>
            <dt>{property.category_name}</dt>
            <dd>
              <Select
                title={property.category_name}
                mode='multiple'
                value={filters?.[property.category_name.replace(/\s+/g, '')]?.data ?? []}
                options={property.options.map(option => ({
                  label: option.option_name,
                  value: option.property_option_id,
                }))}
                placeholder='Select...'
                onChange={value => handleChange(property.category_name.trim())(value)}
              />
            </dd>
          </dl>
        ))}
      </div>
    </Modal>
  )
}
