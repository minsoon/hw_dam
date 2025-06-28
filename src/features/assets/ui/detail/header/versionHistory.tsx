import { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Dropdown } from 'antd'
import { CheckOutlined, ClockCircleOutlined } from '@ant-design/icons'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { formatDateTime } from '@/shared/lib/formatDate'
import styles from './versionHistory.module.scss'

export const VersionHistory = () => {
  const { asset, setCurrentVersionId, currentVersionId } = useAssetDetailStore()
  const { all_versions: versions } = asset || {}
  const router = useRouter()
  const handleClick = useCallback(
    (key: string) => {
      const selectedVersionId = Number(key)
      if (selectedVersionId === currentVersionId) return

      const latestVersionId = asset?.all_versions?.[0]?.asset_version_id

      if (selectedVersionId === latestVersionId) {
        // 최신 버전 → 쿼리 파라미터 없이 이동
        router.push(`/assets/${asset?.asset_id}`)
      } else {
        // 과거 버전 → 쿼리 포함
        router.push(`/assets/${asset?.asset_id}?version=${key}`)
      }

      setCurrentVersionId(selectedVersionId)
    },
    [asset, currentVersionId, router, setCurrentVersionId]
  )

  if (!asset || !versions) return <></>

  return (
    <Dropdown
      menu={{
        items: versions.map((version, index) => ({
          key: version.asset_version_id?.toString() || index.toString(),
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

        selectedKeys: [(currentVersionId ?? asset?.all_versions?.[0]?.asset_version_id)?.toString() ?? ''],
        onClick: info => handleClick(info.key),
      }}
      trigger={['click']}
      placement='bottomRight'
      overlayClassName={styles.dropdown}
    >
      <Button icon={<ClockCircleOutlined />}>Version history</Button>
    </Dropdown>
  )
}
