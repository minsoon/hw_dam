'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Table } from 'antd'
import { PropertyOptionResponse } from '@/entities/types/Properties'
import { optionsTableConfig } from '@/features/settings/property/model/tableConfig'
import { useOptionsQuery } from '@/features/settings/property/model/usePropertyQuery'
import { usePropertyStore } from '@/features/settings/property/model/usePropertyStore'
import { TablePageLayout } from '@/shared/ui/settingTable'
import ModalEditProperty from '../modal/editProperty'
import ModalDelete from './../modal/delete'

const SettingPropertyDetail = ({ id }: { id: string }) => {
  const { optionsItems, optionsKeyword, removeOptionsStore } = usePropertyStore()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditPropertyModalOpen, setIsEditPropertyModalOpen] = useState(false)
  const [currentOption, setCurrentOption] = useState<PropertyOptionResponse | null>(null)

  const onEdit = useCallback((record: PropertyOptionResponse) => {
    setCurrentOption(record)
    setIsEditPropertyModalOpen(true)
  }, [])

  const onDelete = useCallback((record: PropertyOptionResponse) => {
    setCurrentOption(record)
    setIsDeleteModalOpen(true)
  }, [])

  const onCloseDelete = useCallback(() => {
    setIsDeleteModalOpen(false)
  }, [])

  const onCloseEdit = useCallback(() => {
    setIsEditPropertyModalOpen(false)
  }, [])

  const { columns } = optionsTableConfig(onEdit, onDelete)

  useOptionsQuery(Number(id), optionsKeyword)

  useEffect(() => {
    return () => {
      removeOptionsStore()
    }
  }, [removeOptionsStore])

  return (
    <>
      <TablePageLayout
        table={
          <Table<PropertyOptionResponse>
            columns={columns}
            dataSource={optionsItems}
            rowKey='property_option_id'
            showSorterTooltip={{ target: 'sorter-icon' }}
            pagination={false}
          />
        }
      />
      <ModalDelete
        isOpen={isDeleteModalOpen}
        categoryId={Number(id)}
        optionId={currentOption?.property_option_id ?? 0}
        onClose={onCloseDelete}
      />
      <ModalEditProperty
        isOpen={isEditPropertyModalOpen}
        categoryId={Number(id)}
        currentOption={currentOption}
        onClose={onCloseEdit}
      />
    </>
  )
}

export default SettingPropertyDetail
