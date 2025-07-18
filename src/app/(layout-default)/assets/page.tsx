'use client'

import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import AssetWidget from '@/widgets/assets'

const Assets = () => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <AssetWidget />
    </Suspense>
  )
}

export default Assets
