'use client'

import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import AssetDetailWidget from '@/widgets/assets/detail'

const AssetsView = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <AssetDetailWidget id={params.id} />
    </Suspense>
  )
}

export default AssetsView
