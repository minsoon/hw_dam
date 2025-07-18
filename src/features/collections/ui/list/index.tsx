'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button, Space } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { useCollectionQuery } from '@/features/collections/model/useCollectionQuery'
import { CollectionCardList } from '@/features/collections/ui/list/cardList'
import { FilterControls } from '@/features/collections/ui/list/filterControls'
import { FilterSummary } from '@/features/collections/ui/list/filterSummary'
import { CollectionSelectionBar } from '@/features/collections/ui/list/selectionBar'
import { ModalCreateNewCollection } from '@/features/modal/createNewCollection'
import { SearchBar } from '@/features/searchBar'
import { DefaultHeader } from '@/shared/ui/pageHeader/defaultHeader'
import { SpinLoading } from '@/shared/ui/spinLoading'

const Collections = () => {
  const {
    tabActiveKey,
    collectionParams,
    setCollectionParams,
    setActiveTab,
    removeCollection,
    isReady,
    markReady,
    pagination,
  } = useCollectionStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isLoading, refetch: originalRefetch } = useCollectionQuery(collectionParams, { enabled: isReady })
  const refetch = useCallback(() => {
    originalRefetch()
  }, [originalRefetch])

  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab)
      setCollectionParams({ search_type: tab === 'all' ? undefined : (tab as 'master' | 'my'), page: 1 })
    },
    [setActiveTab, setCollectionParams]
  )

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCollectionParams({ keyword: event.target.value, page: 1 })
    },
    [setCollectionParams]
  )

  useEffect(() => {
    if (keyword) {
      setCollectionParams({ keyword })
    }
    markReady()
  }, [keyword, setCollectionParams, markReady])

  useEffect(() => {
    return () => {
      if (!window.location.pathname.startsWith('/collections')) {
        removeCollection()
      }
    }
  }, [removeCollection])

  return (
    <>
      <DefaultHeader
        title='Collections'
        tabs={[
          { key: 'all', label: `All (${pagination.all_count || 0})` },
          { key: 'master', label: `Master (${pagination.master_count || 0})` },
          { key: 'my', label: `My Collection (${pagination.my_count || 0})` },
        ]}
        activeTab={tabActiveKey}
        onTabChange={handleTabChange}
        rightSlot={
          <>
            <Space>
              <SearchBar onChange={handleSearch} placeholder='Search collections...' searchValue={keyword || ''} />
              <Button icon={<PlusOutlined />} color='primary' variant='solid' onClick={() => setIsModalOpen(true)}>
                New collection
              </Button>
            </Space>
            <ModalCreateNewCollection isOpen={isModalOpen} refetch={refetch} onClose={() => setIsModalOpen(false)} />
          </>
        }
      />
      <FilterControls />
      <FilterSummary />
      {isLoading ? <SpinLoading /> : <CollectionCardList refetch={refetch} />}
      <CollectionSelectionBar refetch={refetch} />
    </>
  )
}

export default Collections
