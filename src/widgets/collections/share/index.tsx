'use client'

import CollectionDetail from '@/features/collections/ui/detail'
import { useAuth } from '@/shared/contexts/AuthContext'

const CollectionDetailShareWidget = ({ id }: { id: string }) => {
  const { hasToken } = useAuth()

  return (
    <>
      <CollectionDetail isShare={true} id={id} hasToken={hasToken} />
    </>
  )
}
export default CollectionDetailShareWidget
