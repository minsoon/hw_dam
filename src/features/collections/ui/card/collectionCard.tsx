import React, { useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox, Image, Skeleton } from 'antd'
import { CollectionListDataResponse } from '@/entities/types/Collections'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { CardMenu } from '@/features/collections/ui/card/cardMenu'
import { formatTimeAgo } from '@/shared/lib/formatDate'
import styles from './card.module.scss'

export const CollectionsCard = React.memo(
  ({ item, refetch }: { item: CollectionListDataResponse; refetch: () => void }) => {
    const isChecked = useCollectionStore(state => state.checkedIds.has(item.collection_id))
    const setChecked = useCollectionStore(state => state.setChecked)

    const router = useRouter()

    const handleCheck = useCallback(() => {
      setChecked(item.collection_id)
    }, [setChecked, item.collection_id])

    const handleCardClick = useCallback(() => {
      router.push(`/collections/${item.collection_id}`)
    }, [router, item.collection_id])

    const thumbnails = useMemo(() => {
      return Array.from({ length: 3 }).map((_, index) => ({
        key: index,
        imageUrl: item.thumbnails?.[index] || '/images/logo-default.png',
        hasImage: !!item.thumbnails?.[index],
        style: {
          backgroundImage: `url(${item.thumbnails?.[index] || '/images/logo-default.png'})`,
        },
      }))
    }, [item.thumbnails])

    const formattedTime = useMemo(() => {
      return formatTimeAgo(item.created_at)
    }, [item.created_at])

    return (
      <div className={`${styles.card} ${isChecked ? styles.checked : ''}`}>
        <div className={styles.cardLink} onClick={handleCardClick}>
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
              <p>{formattedTime}</p>
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
        <div className={`${styles.checkbox} ${isChecked ? styles.checked : ''}`}>
          <Checkbox checked={isChecked} onChange={handleCheck} />
        </div>
        <CardMenu refetch={refetch} collection={item} collectionIds={item.collection_id} isEdit={true} />
      </div>
    )
  }
)
CollectionsCard.displayName = 'CollectionsCard'
