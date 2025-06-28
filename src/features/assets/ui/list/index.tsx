'use client'

import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAssetStore } from '@/features/assets/model/assetsStore'
import { useAssetQuery } from '@/features/assets/model/useAssetQuery'
import { CardList } from '@/features/assets/ui/list/cardList'
import { FilterControls } from '@/features/assets/ui/list/filterControls'
import { FilterSummary } from '@/features/assets/ui/list/filterSummary'
import { AssetSelectionBar } from '@/features/assets/ui/list/selectionBar'
import { SearchBar } from '@/features/searchBar'
import { DefaultHeader } from '@/shared/ui/pageHeader/defaultHeader'
import { SpinLoading } from '@/shared/ui/spinLoading'

const Assets = () => {
  const { tabActiveKey, setActiveTab, setAssetParams, removeStore, assetParams, isReady, markReady } = useAssetStore()
  const { isLoading, refetch } = useAssetQuery(assetParams, {
    enabled: isReady,
  })
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')

  const handleTabChange = useCallback(
    (tab: string) => {
      setActiveTab(tab)
      setAssetParams({ is_favorite: tab === 'favourites' ? 'true' : 'false' })
    },
    [setActiveTab, setAssetParams]
  )

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAssetParams({ keyword: event.target.value })
    },
    [setAssetParams]
  )
  useEffect(() => {
    if (keyword) {
      setAssetParams({ keyword })
    }
    markReady()
  }, [keyword, setAssetParams, markReady])

  useEffect(() => {
    return () => removeStore()
  }, [removeStore])

  return (
    <>
      <DefaultHeader
        title='Assets'
        tabs={[
          { key: 'all', label: 'All assets (#)' },
          { key: 'favourites', label: 'Favourites (#)' },
        ]}
        activeTab={tabActiveKey}
        onTabChange={handleTabChange}
        rightSlot={<SearchBar onChange={handleSearch} placeholder='Search assets...' searchValue={keyword || ''} />}
      />
      <FilterControls />
      <FilterSummary />
      {isLoading ? <SpinLoading /> : <CardList refetch={refetch} />}
      <AssetSelectionBar refetch={refetch} />
    </>
  )
}

export default Assets
