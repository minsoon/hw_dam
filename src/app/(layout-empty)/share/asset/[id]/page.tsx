'use client'

import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import AssetDetailShareWidget from '@/widgets/assets/share'

const AssetsShareView = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <AssetDetailShareWidget id={params.id} />
    </Suspense>
  )
}

export default AssetsShareView
