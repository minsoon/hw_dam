'use client'

import React, { useCallback } from 'react'
import { Button, Space } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { SearchBar } from '@/features/searchBar'
import { useSettingDeleteStore } from '@/features/settings/deleted/model/settingDeleteStore'
import { useDeletePageActions } from '@/features/settings/deleted/model/useDeletePageActions'
import { PathHeader } from '@/shared/ui/pageHeader/pathHeader'

const SettingDeleteHeader = () => {
  const { params, setParams } = useSettingDeleteStore()
  const { handleAllDelete } = useDeletePageActions()

  const handleTabChange = useCallback(
    (tab: string) => {
      setParams({ tabActiveKey: tab })
    },
    [setParams]
  )

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParams({ keyword: event.target.value })
  }

  return (
    <PathHeader
      title='Deleted files'
      path='Settings'
      tabs={[
        { key: 'assets', label: 'Assets (#)' },
        { key: 'files', label: 'Files (#)' },
        { key: 'versions', label: 'Versions (#)' },
        { key: 'collections', label: 'Collections (#)' },
      ]}
      activeTab={params.tabActiveKey}
      onTabChange={handleTabChange}
      rightSlot={
        <>
          <Space>
            <SearchBar placeholder='Search...' searchValue={params.keyword} onChange={handleSearchChange} />
            <Button icon={<DeleteOutlined />} color='primary' variant='solid' onClick={handleAllDelete}>
              Clear all files
            </Button>
          </Space>
        </>
      }
    />
  )
}

export default SettingDeleteHeader
