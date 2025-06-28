'use client'

import { useHomeQuery } from '@/features/home/model/useHomeQuery'
import { AssetGallery } from '@/features/home/ui/assetGallery'
import { DataTypeSearch } from '@/features/home/ui/dataTypeSearch'
import { RecentItems } from '@/features/home/ui/recentItems'
import { SearchBanner } from '@/features/home/ui/searchBanner'
import { SpinLoading } from '@/shared/ui/spinLoading'

const Home = () => {
  const { isLoading, refetch } = useHomeQuery()

  if (isLoading) {
    return <SpinLoading />
  }
  return (
    <>
      <SearchBanner />
      <AssetGallery refetch={refetch} />
      <DataTypeSearch />
      <RecentItems refetch={refetch} />
    </>
  )
}

export default Home
