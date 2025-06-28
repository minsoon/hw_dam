'use client'

import CollectionDetail from '@/features/collections/ui/detail'
import { useAuth } from '@/shared/contexts/AuthContext'

const CollectionDetailWidget = ({ id }: { id: string }) => {
  const { hasToken } = useAuth()

  return (
    <>
      <CollectionDetail isShare={false} id={id} hasToken={hasToken} />
    </>
  )
}
export default CollectionDetailWidget
