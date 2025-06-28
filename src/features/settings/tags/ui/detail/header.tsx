'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { SearchBar } from '@/features/searchBar'
import { PathHeader } from '@/shared/ui/pageHeader/pathHeader'
import { useTagsStore } from '../../model/useTagsStore'
import ModalAddNew from '../modal/addNew'

const SettingTagDetailHeader = ({ id }: { id: string }) => {
  const searchParams = useSearchParams()
  const categoryName = searchParams.get('categoryName')
  const { setKeyword } = useTagsStore()
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword('detail', event.target.value)
  }

  const handleAddNew = () => {
    setIsAddNewModalOpen(true)
  }

  return (
    <>
      <PathHeader
        title={categoryName || ''}
        path='Settings / Tag management'
        rightSlot={
          <>
            <Space>
              <SearchBar placeholder='Search tags' onChange={handleSearchChange} />
              <Button icon={<PlusOutlined />} color='primary' variant='solid' onClick={handleAddNew}>
                Add tag
              </Button>
            </Space>
          </>
        }
      />
      <ModalAddNew isOpen={isAddNewModalOpen} categoryId={id} onClose={() => setIsAddNewModalOpen(false)} />
    </>
  )
}

export default SettingTagDetailHeader
