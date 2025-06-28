'use client'

import AssetModify from '@/features/assets/ui/modify'

const AssetModifyWidget = ({ id, isEmergencyOverride }: { id: string; isEmergencyOverride?: boolean }) => {
  return (
    <>
      <AssetModify id={id} isEmergencyOverride={isEmergencyOverride} />
    </>
  )
}

export default AssetModifyWidget
