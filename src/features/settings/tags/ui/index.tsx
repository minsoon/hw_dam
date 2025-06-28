'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table } from 'antd'
import { TagResponse } from '@/entities/types/Tags'
import { categoryTableConfig } from '@/features/settings/tags/model/tableConfig'
import { useTagsQuery } from '@/features/settings/tags/model/useTagsQuery'
import { useTagsStore } from '@/features/settings/tags/model/useTagsStore'
import { CustomPagination } from '@/shared/ui/pagination'
import { TablePageLayout } from '@/shared/ui/settingTable'
import ModalEditCategory from './modal/editCategory'

const SettingTags = () => {
  const router = useRouter()
  const { tags, setPagination, removeStore, setParentTag } = useTagsStore()
  const { items, keyword, pagination } = tags
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false)
  const [currentTag, setCurrentTag] = useState<TagResponse | null>(null)
  const onEdit = (record: TagResponse) => {
    setCurrentTag(record)
    setIsEditCategoryModalOpen(true)
  }
  const onDetail = (record: TagResponse) => {
    setParentTag(record)
    router.push(`/setting/tags/${record.tag_id}?categoryName=${record.category}`)
  }

  const changePage = useCallback(
    (page: number) => {
      setPagination({ currentPage: page })
    },
    [setPagination]
  )

  useTagsQuery(pagination.currentPage, keyword)

  const { columns } = categoryTableConfig(onEdit, onDetail)

  useEffect(() => {
    return () => {
      removeStore()
    }
  }, [removeStore])

  return (
    <>
      <TablePageLayout
        table={
          <Table<TagResponse>
            columns={columns}
            dataSource={items}
            rowKey='tag_id'
            showSorterTooltip={{ target: 'sorter-icon' }}
            pagination={false}
          />
        }
        pagination={
          <CustomPagination currentPage={pagination.currentPage} totalPages={pagination.total} onChange={changePage} />
        }
      />
      <ModalEditCategory
        isOpen={isEditCategoryModalOpen}
        currentTag={currentTag}
        onClose={() => setIsEditCategoryModalOpen(false)}
      />
    </>
  )
}

export default SettingTags
