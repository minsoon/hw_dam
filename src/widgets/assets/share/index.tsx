'use client'

import AssetDetail from '@/features/assets/ui/detail'
import { useAuth } from '@/shared/contexts/AuthContext'

const AssetDetailShareWidget = ({ id }: { id: string }) => {
  const { hasToken } = useAuth()

  return (
    <>
      <AssetDetail id={id} isShare={true} hasToken={hasToken} />
    </>
  )
}

export default AssetDetailShareWidget
