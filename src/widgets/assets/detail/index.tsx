'use client'

import AssetDetail from '@/features/assets/ui/detail'
import { useAuth } from '@/shared/contexts/AuthContext'

const AssetDetailWidget = ({ id }: { id: string }) => {
  const { hasToken } = useAuth()

  return (
    <>
      <AssetDetail id={id} isShare={false} hasToken={hasToken} />
    </>
  )
}

export default AssetDetailWidget
