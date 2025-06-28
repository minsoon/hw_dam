'use client'

import AssetModifyWidget from '@/widgets/assets/modify'

const AssetsView = ({ params }: { params: { id: string } }) => {
  return <AssetModifyWidget id={params.id} isEmergencyOverride={true} />
}

export default AssetsView
