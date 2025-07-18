'use client'

import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import CollectionDetailShareWidget from '@/widgets/collections/share'

const CollectionShareView = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <CollectionDetailShareWidget id={params.id} />
    </Suspense>
  )
}

export default CollectionShareView
