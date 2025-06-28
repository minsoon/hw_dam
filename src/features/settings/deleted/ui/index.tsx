'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { useSettingDeleteStore } from '@/features/settings/deleted/model/settingDeleteStore'
import { settingTableConfig } from '@/features/settings/deleted/model/tableConfig'
import type { SettingTableRow, TabKey } from '@/features/settings/deleted/model/types'
import { CustomPagination } from '@/shared/ui/pagination'
import { TablePageLayout } from '@/shared/ui/settingTable'
import { useDeletePageActions } from '../model/useDeletePageActions'
import ModalDelete from './modal/delete'

const SettingDelete = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { data, params, setParams, removeStore } = useSettingDeleteStore()
  const { handleDelete, handleDownload, refetchByTab, getRowKey } = useDeletePageActions()

  const { columns } = settingTableConfig[params.tabActiveKey as TabKey](handleDelete, handleDownload)

  const setCurrentPage = useCallback(
    (page: number) => {
      setParams({ page: String(page) })
    },
    [setParams]
  )

  useEffect(() => {
    refetchByTab()
  }, [params.tabActiveKey, params.keyword, params.page, refetchByTab])

  useEffect(() => {
    return () => {
      removeStore()
    }
  }, [removeStore])

  return (
    <>
      <TablePageLayout
        count={data[params.tabActiveKey as TabKey]?.pagination.total}
        table={
          <Table<SettingTableRow>
            columns={columns as ColumnsType<SettingTableRow>}
            dataSource={data[params.tabActiveKey as TabKey]?.data as SettingTableRow[]}
            rowKey={getRowKey()}
            showSorterTooltip={{ target: 'sorter-icon' }}
            pagination={false}
          />
        }
        pagination={
          <CustomPagination
            currentPage={Number(params.page)}
            totalPages={data[params.tabActiveKey as TabKey]?.pagination.total}
            onChange={setCurrentPage}
          />
        }
      />
      <ModalDelete isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} handleSubmit={() => {}} />
    </>
  )
}

export default SettingDelete
