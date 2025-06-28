'use client'

import CollectionDetailShareWidget from '@/widgets/collections/share'

const CollectionShareView = ({ params }: { params: { id: string } }) => {
  return <CollectionDetailShareWidget id={params.id} />
}

export default CollectionShareView
