import React from 'react'
import { useRouter } from 'next/navigation'
import { EyeInvisibleOutlined } from '@ant-design/icons'
import { AssetListDataResponse } from '@/entities/types/Assets'
import { MainAssetsList } from '@/entities/types/Main'
import styles from './card.module.scss'

export const AssetCardContent: React.FC<{ item: AssetListDataResponse | MainAssetsList; notLink?: boolean }> = ({
  item,
  notLink,
}) => {
  const router = useRouter()
  const handleClick = () => {
    if (notLink) return
    router.push(`/assets/${item.asset_id}`)
  }

  return (
    <div className={`${styles.cardLink} ${notLink ? styles.notLink : ''}`} onClick={handleClick}>
      <div>
        {item.thumbnail ? (
          <p className={styles.image} style={{ backgroundImage: `url(${item.thumbnail})` }}></p>
        ) : (
          <p className={styles.notImage}></p>
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
