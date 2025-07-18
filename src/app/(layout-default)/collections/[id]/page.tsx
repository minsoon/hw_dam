import { Suspense } from 'react'
import { SpinLoading } from '@/shared/ui/spinLoading'
import CollectionDetailWidget from '@/widgets/collections/detail'

const CollectionsView = ({ params }: { params: { id: string } }) => {
  return (
    <Suspense fallback={<SpinLoading size='large' />}>
      <CollectionDetailWidget id={params.id} />
    </Suspense>
  )
}

export default CollectionsView
