'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Table } from 'antd'
import { AssetTypeResponse } from '@/entities/types/AssetManagement'
import { tableConfig } from '@/features/settings/asset/model/tableConfig'
import { TablePageLayout } from '@/shared/ui/settingTable'
import { useAssetManagementQuery } from '../model/useAssetQuery'
import { useSettingAssetStore } from '../model/useAssetStore'
import ModalDelete from './modal/delete'

const SettingAsset = () => {
  const router = useRouter()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const { items, keyword, removeStore } = useSettingAssetStore()

  const onEdit = useCallback(
    (record: AssetTypeResponse) => {
      router.push(`/setting/asset/upsert/${record.asset_type_id}`)
    },
    [router]
  )

  useAssetManagementQuery(keyword)

  const { columns } = tableConfig(onEdit)

  useEffect(() => {
    return () => {
      removeStore()
    }
  }, [removeStore])

  return (
    <>
      <TablePageLayout
        table={
          <Table<AssetTypeResponse>
            columns={columns}
            dataSource={items}
            rowKey='asset_type_id'
            showSorterTooltip={{ target: 'sorter-icon' }}
            pagination={false}
          />
        }
      />
      <ModalDelete isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} handleSubmit={() => {}} />
    </>
  )
}

export default SettingAsset
