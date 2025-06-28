import React from 'react'
import { useRouter } from 'next/navigation'
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

  return (
    <div className={type === 'recent' ? styles.recentCard : styles.card}>
      <div className={styles.cardLink} onClick={() => router.push(`/collections/${item.collection_id}`)}>
        <div className={styles.images}>
          {Array.from({ length: 3 }).map((_, index) => (
            <p
              key={index}
              className={`${item.thumbnails?.[index] ? '' : styles.notImage}`}
              style={{
                backgroundImage: `url(${item.thumbnails?.[index] || '/images/not_image.png'})`,
              }}
            ></p>
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
