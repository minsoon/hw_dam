import React, { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Image, Skeleton } from 'antd'
import { CollectionListDataResponse } from '@/entities/types/Collections'
import { MainCollectionsList } from '@/entities/types/Main'
import { CardMenu } from '@/features/collections/ui/card/cardMenu'
import { formatTimeAgo } from '@/shared/lib/formatDate'
import styles from './card.module.scss'

export const CollectionsHomeCard: React.FC<{
  item: CollectionListDataResponse | MainCollectionsList
  type?: string
  refetch: () => void
}> = ({ item, type, refetch }) => {
  const router = useRouter()

  const thumbnails = useMemo(() => {
    return Array.from({ length: 3 }).map((_, index) => ({
      key: index,
      imageUrl: item.thumbnails?.[index] || '/images/logo-default.png',
      hasImage: !!item.thumbnails?.[index],
    }))
  }, [item.thumbnails])

  return (
    <div className={type === 'recent' ? styles.recentCard : styles.card}>
      <div className={styles.cardLink} onClick={() => router.push(`/collections/${item.collection_id}`)}>
        <div className={styles.images}>
          {thumbnails.map(({ key, imageUrl, hasImage }) => (
            <div key={key} className={`${styles.imageBox} ${hasImage ? '' : styles.notImage}`}>
              {hasImage && (
                <Image
                  src={imageUrl}
                  alt={`썸네일${key + 1}`}
                  className={hasImage ? '' : styles.notImage}
                  placeholder={
                    <div className={styles.imageSkeleton}>
                      <Skeleton.Image active />
                    </div>
                  }
                  preview={false}
                />
              )}
            </div>
          ))}
        </div>
        <dl>
          <dt>
            {item.name} {item.is_master === 1 && <p className={styles.tagMaster}>Master</p>}
          </dt>
          <dd>
            <p>{item.file_count} files</p>
            <p>{formatTimeAgo(item.created_at)}</p>
          </dd>
          {item.tags && type !== 'recent' && (
            <dd className={styles.tags}>{item.tags?.map(tag => <span key={tag.tag_id}>{tag.tag_name}</span>)}</dd>
          )}
        </dl>
      </div>
      <CardMenu refetch={refetch} collection={item} collectionIds={item.collection_id} />
    </div>
  )
}
