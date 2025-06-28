'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Table } from 'antd'
import { PropertyCategoryResponse } from '@/entities/types/Properties'
import { categoryTableConfig } from '@/features/settings/property/model/tableConfig'
import { useCategoriesQuery } from '@/features/settings/property/model/usePropertyQuery'
import { usePropertyStore } from '@/features/settings/property/model/usePropertyStore'
import { TablePageLayout } from '@/shared/ui/settingTable'
import ModalEditCategory from './modal/editCategory'

const SettingProperty = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { categoriesItems, categoriesKeyword, setDetailTitle, removeStore } = usePropertyStore()
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState<PropertyCategoryResponse | null>(null)

  useCategoriesQuery(categoriesKeyword)

  const onEdit = useCallback((record: PropertyCategoryResponse) => {
    setCurrentCategory(record)
    setIsEditCategoryModalOpen(true)
  }, [])

  const onDetail = useCallback(
    (record: PropertyCategoryResponse) => {
      setDetailTitle(record.category_name)
      router.push(`/setting/property/${record.property_category_id}?name=${encodeURIComponent(record.category_name)}`)
    },
    [router, setDetailTitle]
  )

  const onClose = useCallback(() => {
    setIsEditCategoryModalOpen(false)
  }, [])

  const { columns } = categoryTableConfig(onEdit, onDetail)

  useEffect(() => {
    return () => {
      if (!pathname?.includes('/setting/property/')) {
        removeStore()
      }
    }
  }, [removeStore, pathname])

  return (
    <>
      <TablePageLayout
        table={
          <Table<PropertyCategoryResponse>
            columns={columns}
            dataSource={categoriesItems}
            rowKey='property_category_id'
            showSorterTooltip={{ target: 'sorter-icon' }}
            pagination={false}
          />
        }
      />
      <ModalEditCategory isOpen={isEditCategoryModalOpen} onClose={onClose} currentCategory={currentCategory} />
    </>
  )
}

export default SettingProperty
