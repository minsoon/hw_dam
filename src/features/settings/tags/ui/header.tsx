import { Space } from 'antd'
import { SearchBar } from '@/features/searchBar'
import { PathHeader } from '@/shared/ui/pageHeader/pathHeader'
import { useTagsStore } from '../model/useTagsStore'

const SettingTagsHeader = () => {
  const { tags, setKeyword } = useTagsStore()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword('tags', event.target.value)
  }
  return (
    <PathHeader
      title='Tag management'
      path='Settings'
      rightSlot={
        <>
          <Space>
            <SearchBar searchValue={tags.keyword} placeholder='Search...' onChange={handleSearchChange} />
          </Space>
        </>
      }
    />
  )
}

export default SettingTagsHeader
