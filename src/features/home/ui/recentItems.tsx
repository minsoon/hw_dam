'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import { RightOutlined } from '@ant-design/icons'
import { HomeAssetCard } from '@/features/assets/ui/card/homeAssetCard'
import { CollectionsHomeCard } from '@/features/collections/ui/card/homeCard'
import { useHomeStore } from '../model/homeStore'
import styles from './home.module.scss'

export const RecentItems: React.FC<{ refetch: () => void }> = ({ refetch }) => {
  const router = useRouter()
  const {
    home: { recentAddedAssets, recentUpdatedCollections },
  } = useHomeStore()
  return (
    <div className={styles.recentItems}>
      <div className={styles.box}>
        <dl>
          <dt>
            <p>Recently added assets</p>
            <Button color='default' variant='text' icon={<RightOutlined />} onClick={() => router.push('/assets')}>
              View all
            </Button>
          </dt>
          <dd>
            {recentAddedAssets && recentAddedAssets.length > 0 ? (
              <>
                {recentAddedAssets.map(asset => (
                  <HomeAssetCard key={asset.asset_id} type={'recent'} item={asset} />
                ))}
              </>
            ) : (
              <div className={styles.noData}>No Data</div>
            )}
          </dd>
        </dl>
      </div>
      <div className={styles.box}>
        <dl>
          <dt>
            <p>Recently updated collections</p>
            <Button color='default' variant='text' icon={<RightOutlined />} onClick={() => router.push('/collections')}>
              View all
            </Button>
          </dt>
          <dd>
            {recentUpdatedCollections && recentUpdatedCollections.length > 0 ? (
              <>
                {recentUpdatedCollections.map(collection => (
                  <CollectionsHomeCard
                    key={collection.collection_id}
                    type={'recent'}
                    item={collection}
                    refetch={refetch}
                  />
                ))}
              </>
            ) : (
              <div className={styles.noData}>No Data</div>
            )}
          </dd>
        </dl>
      </div>
    </div>
  )
}
