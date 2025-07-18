'use client'

import { useState } from 'react'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { SearchBar } from '@/features/searchBar'
import { useSettingCollectionStore } from '@/features/settings/collection/model/useCollectionStore'
import { PathHeader } from '@/shared/ui/pageHeader/pathHeader'
import ModalAddNew from './modal/addNew'

const SettingCollectionHeader = () => {
  const { setKeyword } = useSettingCollectionStore()
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)

  const handleAddNew = () => {
    setIsAddNewModalOpen(true)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value)
  }

  return (
    <>
      <PathHeader
        title='Collection tags'
        path='Settings'
        rightSlot={
          <>
            <Space>
              <SearchBar placeholder='Search...' onChange={handleSearchChange} />
              <Button icon={<PlusOutlined />} color='primary' variant='solid' onClick={handleAddNew}>
                New Collection Tag
              </Button>
            </Space>
          </>
        }
      />
      <ModalAddNew isOpen={isAddNewModalOpen} onClose={() => setIsAddNewModalOpen(false)} />
    </>
  )
}

export default SettingCollectionHeader
