'use client'

import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import { CloseOutlined, EyeInvisibleOutlined, StarFilled } from '@ant-design/icons'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import styles from './detailHeader.module.scss'

const ReadonlyHeader = () => {
  const { asset } = useAssetDetailStore()
  const router = useRouter()

  return (
    <header className={`emptyHeader ${styles.readonlyHeader}`}>
      <div className={styles.title}>
        {asset && asset.current_version && (
          <dl>
            <dt>
              {asset.current_version.asset_name} {asset.is_favorite && <StarFilled />}
            </dt>
            <dd>
              <span>{asset.asset_type_name}</span>
              <span>{asset.file_count} files</span>
              <span>{asset.view_count} views</span>
              <span>{asset.download_count} downloads</span>
              {asset.is_hidden ? (
                <span>
                  <span className={styles.hidden}>
                    <EyeInvisibleOutlined />
                    hidden
                  </span>
                </span>
              ) : (
                ''
              )}
            </dd>
          </dl>
        )}
      </div>
      <div className={styles.closeButton}>
        <Button
          color='default'
          variant='text'
          size='small'
          icon={<CloseOutlined />}
          onClick={() => router.back()}
        ></Button>
      </div>
    </header>
  )
}

export default ReadonlyHeader
