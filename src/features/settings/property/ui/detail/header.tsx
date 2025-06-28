'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { SearchBar } from '@/features/searchBar'
import { usePropertyStore } from '@/features/settings/property/model/usePropertyStore'
import { PathHeader } from '@/shared/ui/pageHeader/pathHeader'
import ModalAddNew from './../modal/addNew'

const SettingPropertyDetailHeader = ({ id }: { id: string }) => {
  const { detailTitle, setDetailTitle, setKeyword } = usePropertyStore()
  const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const name = searchParams.get('name')
    if (name && !detailTitle) {
      setDetailTitle(decodeURIComponent(name))
    }
  }, [searchParams, detailTitle, setDetailTitle])

  const handleAddNew = () => {
    setIsAddNewModalOpen(true)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword('options', event.target.value)
  }

  return (
    <>
      <PathHeader
        title={detailTitle}
        path='Settings / Property management'
        rightSlot={
          <>
            <Space>
              <SearchBar placeholder='Search tags' onChange={handleSearchChange} />
              <Button icon={<PlusOutlined />} color='primary' variant='solid' onClick={handleAddNew}>
                Add option
              </Button>
            </Space>
          </>
        }
      />
      <ModalAddNew isOpen={isAddNewModalOpen} categoryId={Number(id)} onClose={() => setIsAddNewModalOpen(false)} />
    </>
  )
}

export default SettingPropertyDetailHeader
