'use client'

import React, { useRef } from 'react'
import { Button } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { HomeAssetCard } from '@/features/assets/ui/card/homeAssetCard'
import { CollectionsHomeCard } from '@/features/collections/ui/card/homeCard'
import { useHomeStore } from '@/features/home/model/homeStore'
import styles from './home.module.scss'

export const AssetGallery: React.FC<{ refetch: () => void }> = ({ refetch }) => {
  const {
    home: { recentDownloads, masterCollections },
  } = useHomeStore()

  const assetRef = useRef<Slider>(null)
  const collectionsRef = useRef<Slider>(null)

  const settings = {
    dots: false,
    arrows: false,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
  }

  const handleCarousel = (direction: 'prev' | 'next', type: 'recent' | 'master') => {
    const ref = type === 'recent' ? assetRef.current : collectionsRef.current
    if (ref) {
      if (direction === 'prev') {
        ref.slickPrev?.()
      } else {
        ref.slickNext?.()
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
              <Slider ref={assetRef} {...settings} infinite={recentDownloads.length > 5}>
                {recentDownloads.map(asset => (
                  <HomeAssetCard key={asset.asset_id} item={asset} />
                ))}
              </Slider>
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
              <Slider ref={collectionsRef} {...settings} infinite={masterCollections.length > 5}>
                {masterCollections.map(collection => (
                  <CollectionsHomeCard key={collection.collection_id} item={collection} refetch={refetch} />
                ))}
              </Slider>
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
