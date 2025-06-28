'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Table } from 'antd'
import type { CollectionTagResponse } from '@/entities/types/CollectionTags'
import { tableConfig } from '@/features/settings/collection/model/tableConfig'
import { useCollectionTagsQuery } from '@/features/settings/collection/model/useCollectionQuery'
import { useSettingCollectionStore } from '@/features/settings/collection/model/useCollectionStore'
import { CustomPagination } from '@/shared/ui/pagination'
import { TablePageLayout } from '@/shared/ui/settingTable'
import ModalDelete from './modal/delete'
import ModalEditTag from './modal/editTag'

const SettingCollection = () => {
  const { items, pagination, keyword, setPagination, removeStore } = useSettingCollectionStore()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditTagModalOpen, setIsEditTagModalOpen] = useState(false)
  const [currentTag, setCurrentTag] = useState<CollectionTagResponse | null>(null)

  const onEdit = useCallback(
    (record: CollectionTagResponse) => {
      setCurrentTag(record)
      setIsEditTagModalOpen(true)
    },
    [setIsEditTagModalOpen, setCurrentTag]
  )

  const onDelete = useCallback(
    (record: CollectionTagResponse) => {
      setCurrentTag(record)
      setIsDeleteModalOpen(true)
    },
    [setIsDeleteModalOpen, setCurrentTag]
  )

  const onCloseDelete = useCallback(() => {
    setIsDeleteModalOpen(false)
  }, [])

  const onCloseEdit = useCallback(() => {
    setIsEditTagModalOpen(false)
  }, [])

  const changePage = useCallback(
    (page: number) => {
      setPagination({ currentPage: page })
    },
    [setPagination]
  )

  const { columns } = tableConfig(onEdit, onDelete)

  useCollectionTagsQuery(pagination.currentPage, keyword)

  useEffect(() => {
    return () => {
      removeStore()
    }
  }, [removeStore])

  return (
    <>
      <TablePageLayout
        table={
          <Table<CollectionTagResponse>
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
      <ModalDelete isOpen={isDeleteModalOpen} tagId={currentTag?.tag_id} onClose={onCloseDelete} />
      <ModalEditTag isOpen={isEditTagModalOpen} currentTag={currentTag} onClose={onCloseEdit} />
    </>
  )
}

export default SettingCollection
