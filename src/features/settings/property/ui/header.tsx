import { Space } from 'antd'
import { SearchBar } from '@/features/searchBar'
import { PathHeader } from '@/shared/ui/pageHeader/pathHeader'
import { usePropertyStore } from '../model/usePropertyStore'

const SettingPropertyHeader = () => {
  const { categoriesKeyword, setKeyword } = usePropertyStore()
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword('categories', event.target.value)
  }
  return (
    <PathHeader
      title='Property management'
      path='Settings'
      rightSlot={
        <>
          <Space>
            <SearchBar searchValue={categoriesKeyword} placeholder='Search...' onChange={handleSearchChange} />
          </Space>
        </>
      }
    />
  )
}

export default SettingPropertyHeader
