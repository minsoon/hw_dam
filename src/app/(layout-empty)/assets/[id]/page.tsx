'use client'

import AssetDetailWidget from '@/widgets/assets/detail'

const AssetsView = ({ params }: { params: { id: string } }) => {
  return <AssetDetailWidget id={params.id} />
}

export default AssetsView
