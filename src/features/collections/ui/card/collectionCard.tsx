import React from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox } from 'antd'
import { CollectionListDataResponse } from '@/entities/types/Collections'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { CardMenu } from '@/features/collections/ui/card/cardMenu'
import { formatTimeAgo } from '@/shared/lib/formatDate'
import styles from './card.module.scss'

export const CollectionsCard: React.FC<{ item: CollectionListDataResponse; refetch: () => void }> = ({
  item,
  refetch,
}) => {
  const { checkedIds, setChecked } = useCollectionStore()
  const isChecked = checkedIds.includes(item.collection_id)

  const router = useRouter()

  return (
    <div className={`${styles.card} ${isChecked ? styles.checked : ''}`}>
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
          {item.tags && (
            <dd className={styles.tags}>
              {item.tags.map(tag => (
                <span key={tag.tag_id}>{tag.tag_name}</span>
              ))}
            </dd>
          )}
        </dl>
      </div>
      <div className={`${styles.checkbox} ${checkedIds.length > 0 ? styles.checked : ''}`}>
        <Checkbox checked={checkedIds?.includes(item.collection_id)} onChange={() => setChecked(item.collection_id)} />
      </div>
      <CardMenu refetch={refetch} collection={item} collectionIds={item.collection_id} isEdit={true} />
    </div>
  )
}
