'use client'

import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import CollectionsWidget from '@/widgets/collections'

const Collections = () => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <CollectionsWidget />
    </Suspense>
  )
}

export default Collections
