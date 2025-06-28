'use client'

import AssetDetailShareWidget from '@/widgets/assets/share'

const AssetsShareView = ({ params }: { params: { id: string } }) => {
  return <AssetDetailShareWidget id={params.id} />
}

export default AssetsShareView
