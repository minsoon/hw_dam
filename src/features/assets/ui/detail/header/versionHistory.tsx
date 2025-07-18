import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Dropdown } from 'antd'
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { formatDateTime } from '@/shared/lib/formatDate'
import styles from './versionHistory.module.scss'

export const VersionHistory = () => {
  const { asset, setCurrentVersionId, currentVersionId, removeCurrentImage } = useAssetDetailStore()
  const { all_versions: versions } = asset || {}
  const router = useRouter()

  const handleClick = useCallback(
    (key: number) => {
      if (key === currentVersionId) return

      const latestVersionId = asset?.all_versions?.[0]?.version_number

      if (key === latestVersionId) {
        router.push(`/assets/${asset?.id_title}`)
      } else {
        router.push(`/assets/${asset?.id_title}?v=${key}`)
      }
      removeCurrentImage()
      setCurrentVersionId(key)
    },
    [asset, currentVersionId, router, setCurrentVersionId, removeCurrentImage]
  )

  if (!asset || !versions) return <></>

  return (
    <Dropdown
      menu={{
        items: versions.map((version, index) => ({
          key: version.version_number,
          type: 'item',
          label: (
            <div className={styles.versionItem}>
              <dl>
                <dt>
                  {version.version} {index === 0 && <span>Current</span>}
                </dt>
                <dd>
                  <span>{formatDateTime(version.created_at, 'YYYYMMDD')}</span>
                  <span>Updated by {version.created_by}</span>
                </dd>
              </dl>
              <CheckOutlined />
            </div>
          ),
        })),

        selectedKeys: [(currentVersionId ?? asset?.all_versions?.[0]?.version_number ?? '').toString()],
        onClick: info => handleClick(Number(info.key)),
      }}
      trigger={['click']}
      placement='bottomRight'
      overlayClassName={styles.dropdown}
    >
      <Button icon={<ClockCircleOutlined />}>Version history</Button>
    </Dropdown>
  )
}
