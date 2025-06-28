'use client'

import AssetModifyWidget from '@/widgets/assets/modify'

const AssetsView = ({ params }: { params: { id: string } }) => {
  return <AssetModifyWidget id={params.id} />
}

export default AssetsView
