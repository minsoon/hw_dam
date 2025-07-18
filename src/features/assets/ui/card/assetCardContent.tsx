import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Skeleton } from 'antd'
import { Image } from 'antd'
import { EyeInvisibleOutlined } from '@ant-design/icons'
import { AssetListDataResponse } from '@/entities/types/Assets'
import { MainAssetsList } from '@/entities/types/Main'
import styles from './card.module.scss'

export const AssetCardContent: React.FC<{ item: AssetListDataResponse | MainAssetsList; notLink?: boolean }> = ({
  item,
  notLink,
}) => {
  const router = useRouter()
  const [imgError, setImgError] = useState(false)

  const handleClick = () => {
    if (notLink) return
    router.push(`/assets/${item.id_title}`)
  }

  return (
    <div className={`${styles.cardLink} ${notLink ? styles.notLink : ''}`} onClick={handleClick}>
      <div>
        {item.thumbnail ? (
          <div className={styles.image}>
            {!imgError ? (
              <Image
                src={item.thumbnail}
                alt={item.asset_name || 'Asset thumbnail'}
                onError={() => setImgError(true)}
                placeholder={
                  <div className={styles.imageSkeleton}>
                    <Skeleton.Image active />
                  </div>
                }
                preview={false}
              />
            ) : (
              <div className={styles.notImage} />
            )}
          </div>
        ) : (
          <div className={styles.notImage}></div>
        )}
      </div>
      <dl>
        <dt>{item.asset_name}</dt>
        <dd>
          <p>{item.asset_type_name}</p>
          <p>{item.file_count} files</p>
          {item.is_hidden && (
            <p>
              <span className={styles.hidden}>
                <EyeInvisibleOutlined />
                Hidden
              </span>
            </p>
          )}
          {item.file_type_summary && <p className={styles.fileType}>{item.file_type_summary.toUpperCase()}</p>}
        </dd>
      </dl>
    </div>
  )
}
