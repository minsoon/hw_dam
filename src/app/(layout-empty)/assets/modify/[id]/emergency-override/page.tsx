'use client'

import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import AssetModifyWidget from '@/widgets/assets/modify'

const AssetsView = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <AssetModifyWidget id={params.id} isEmergencyOverride={true} />
    </Suspense>
  )
}

export default AssetsView
