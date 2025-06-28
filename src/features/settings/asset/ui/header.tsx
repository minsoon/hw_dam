'use client'

// import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { Space } from 'antd'
// import { PlusOutlined } from '@ant-design/icons'
import { SearchBar } from '@/features/searchBar'
import { PathHeader } from '@/shared/ui/pageHeader/pathHeader'
import { useSettingAssetStore } from '../model/useAssetStore'

const SettingAssetHeader = () => {
  const { keyword, setKeyword } = useSettingAssetStore()
  // const router = useRouter()
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value)
    },
    [setKeyword]
  )
  return (
    <PathHeader
      title='Asset management'
      path='Settings'
      rightSlot={
        <>
          <Space>
            <SearchBar searchValue={keyword} placeholder='Search...' onChange={handleSearchChange} />
            {/* <Button
              icon={<PlusOutlined />}
              color='primary'
              variant='solid'
              onClick={() => router.push('/setting/asset/upsert')}
            >
              Add new
            </Button> */}
          </Space>
        </>
      }
    />
  )
}

export default SettingAssetHeader
