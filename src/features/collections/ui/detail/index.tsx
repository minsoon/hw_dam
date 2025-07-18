'use client'

import { useCallback, useEffect } from 'react'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import {
  useCollectionDetailByHashQuery,
  useCollectionDetailQuery,
} from '@/features/collections/model/useCollectionQuery'
import CardList from '@/features/collections/ui/detail/cardList'
import Header from '@/features/collections/ui/detail/header'
import { CollectionInfo } from '@/features/collections/ui/detail/info'
import { SelectionDetailBar } from '@/features/collections/ui/detail/selectionBar'
import Toolbar from '@/features/collections/ui/detail/toolbar'
import { SpinLoading } from '@/shared/ui/spinLoading'
import styles from './detail.module.scss'

const CollectionDetail = ({ id, isShare, hasToken }: { id: string; isShare: boolean; hasToken: boolean }) => {
  const { collectionDetailParams, removeCollectionDetail, setCollectionDetailParams } = useCollectionStore()

  const isNumericId = /^\d+$/.test(id)

  const collectionByIdQuery = useCollectionDetailQuery(
    { collection_id: Number(id), sort: collectionDetailParams.sort },
    { enabled: isNumericId }
  )
  const collectionByHashQuery = useCollectionDetailByHashQuery({ hash: id }, { enabled: !isNumericId })

  const { isLoading, refetch: originalRefetch } = isNumericId ? collectionByIdQuery : collectionByHashQuery

  const refetch = useCallback(() => {
    originalRefetch()
  }, [originalRefetch])

  useEffect(() => {
    setCollectionDetailParams({ collection_id: Number(id) })
    return () => {
      removeCollectionDetail()
    }
  }, [removeCollectionDetail, setCollectionDetailParams, id])

  return (
    <>
      <Header isShare={isShare} hasToken={hasToken} isNumericId={isNumericId} isLoading={isLoading} refetch={refetch} />
      <div className={`${isShare ? styles.shareContainer : ''} ${!isNumericId ? styles.darkContainer : ''}`}>
        <Toolbar isShare={isShare} isNumericId={isNumericId} />
        {isLoading ? (
          <SpinLoading />
        ) : (
          <>
            <div className={styles.container}>
              <CardList refetch={refetch} isShare={isShare} hasToken={hasToken} isNumericId={isNumericId} />
              <CollectionInfo hasToken={hasToken} isNumericId={isNumericId} />
            </div>
          </>
        )}
      </div>

      <SelectionDetailBar refetch={refetch} />
    </>
  )
}
export default CollectionDetail
