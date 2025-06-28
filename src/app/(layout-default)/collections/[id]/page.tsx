import CollectionDetailWidget from '@/widgets/collections/detail'

const CollectionsView = ({ params }: { params: { id: string } }) => {
  return <CollectionDetailWidget id={params.id} />
}

export default CollectionsView
