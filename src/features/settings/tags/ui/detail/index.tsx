'use client'

import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { TagResponse } from '@/entities/types/Tags'
import { tagDetailTableConfig } from '@/features/settings/tags/model/tableConfig'
import { useTagsDetailQuery } from '@/features/settings/tags/model/useTagsQuery'
import { useTagsStore } from '@/features/settings/tags/model/useTagsStore'
import { TablePageLayout } from '@/shared/ui/settingTable'
import ModalDelete from '../modal/delete'
import ModalEditTag from '../modal/editTag'

const SettingTagDetail = ({ id }: { id: string }) => {
  const { detail, removeStore } = useTagsStore()
  const { items, keyword } = detail
  const [currentTag, setCurrentTag] = useState<TagResponse | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditTagModalOpen, setIsEditTagModalOpen] = useState(false)

  const onEdit = (record: TagResponse) => {
    setCurrentTag(record)
    setIsEditTagModalOpen(true)
  }
  const onDelete = (record: TagResponse) => {
    setCurrentTag(record)
    setIsDeleteModalOpen(true)
  }
  useTagsDetailQuery(Number(id), keyword)

  const { columns } = tagDetailTableConfig(onEdit, onDelete)

  useEffect(() => {
    return () => {
      removeStore('detail')
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
      />
      <ModalDelete
        isOpen={isDeleteModalOpen}
        categoryId={id}
        currentTagId={currentTag?.tag_id}
        onClose={() => setIsDeleteModalOpen(false)}
      />
      <ModalEditTag
        isOpen={isEditTagModalOpen}
        categoryId={id}
        currentTag={currentTag}
        onClose={() => setIsEditTagModalOpen(false)}
      />
    </>
  )
}

export default SettingTagDetail
