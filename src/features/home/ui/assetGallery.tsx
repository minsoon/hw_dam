'use client'

import React, { useRef } from 'react'
import { Button, Carousel } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import type { CarouselRef } from 'antd/es/carousel'
import { HomeAssetCard } from '@/features/assets/ui/card/homeAssetCard'
import { CollectionsHomeCard } from '@/features/collections/ui/card/homeCard'
import { useHomeStore } from '../model/homeStore'
import styles from './home.module.scss'

export const AssetGallery: React.FC<{ refetch: () => void }> = ({ refetch }) => {
  const {
    home: { recentDownloads, masterCollections },
  } = useHomeStore()

  const assetRef = useRef<CarouselRef | null>(null)
  const collectionsRef = useRef<CarouselRef | null>(null)

  const handleCarousel = (direction: 'prev' | 'next', type: 'recent' | 'master') => {
    const ref = type === 'recent' ? assetRef.current : collectionsRef.current
    if (ref) {
      if (direction === 'prev') {
        ref.prev()
      } else {
        ref.next()
      }
    }
  }

  return (
    <div className={styles.assetGallery}>
      <div className={styles.box}>
        <div className={styles.title}>Recent downloads</div>
        <div className={styles.list}>
          {recentDownloads && recentDownloads.length > 0 ? (
            <>
              <Carousel ref={assetRef} slidesToShow={5} slidesToScroll={1} dots={false} arrows={false}>
                {recentDownloads.map(asset => (
                  <HomeAssetCard key={asset.asset_id} item={asset} />
                ))}
              </Carousel>
              {recentDownloads.length > 5 && (
                <div className={styles.btn}>
                  <Button shape='circle' icon={<LeftOutlined />} onClick={() => handleCarousel('prev', 'recent')} />
                  <Button shape='circle' icon={<RightOutlined />} onClick={() => handleCarousel('next', 'recent')} />
                </div>
              )}
            </>
          ) : (
            <div className={styles.noData}>No Data</div>
          )}
        </div>
      </div>
      <div className={styles.box}>
        <div className={styles.title}>Master collections</div>
        <div className={styles.list}>
          {masterCollections && masterCollections.length > 0 ? (
            <>
              <Carousel ref={collectionsRef} slidesToShow={5} slidesToScroll={1} dots={false} arrows={false}>
                {masterCollections.map(collection => (
                  <CollectionsHomeCard key={collection.collection_id} item={collection} refetch={refetch} />
                ))}
              </Carousel>
              {masterCollections.length > 5 && (
                <div className={styles.btn}>
                  <Button shape='circle' icon={<LeftOutlined />} onClick={() => handleCarousel('prev', 'master')} />
                  <Button shape='circle' icon={<RightOutlined />} onClick={() => handleCarousel('next', 'master')} />
                </div>
              )}
            </>
          ) : (
            <div className={styles.noData}>No Data</div>
          )}
        </div>
      </div>
    </div>
  )
}
