'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import { Collapse } from 'antd'
import { CaretRightOutlined } from '@ant-design/icons'
import { useAssetUpdateStore } from '@/features/assets/model/assetUpdateStore'
import { createEditPanelItems } from '@/shared/lib/createEditPanelItems'
import { formatDateTime } from '@/shared/lib/formatDate'
import { InfoEditPanel } from '@/shared/ui/editPanel/assetEditPanel'
import styles from './assetEdit.module.scss'

export const AssetEdit: React.FC<{ isImageType: boolean; isEmergencyOverride?: boolean }> = ({
  isImageType,
  isEmergencyOverride,
}) => {
  const { asset, panelItems } = useAssetUpdateStore()
  const { current_version } = asset || {}
  const searchParams = useSearchParams()
  const newVersion = searchParams.get('newVersion')
  const items = createEditPanelItems(panelItems)

  if (!current_version) return null
  return (
    <div className={styles.assetInfo}>
      <div className={styles.title}>
        <dl>
          <dt>
            Edit asset info <span>{newVersion ? 'New version' : 'Current version'}</span>
          </dt>
          <dd>
            {newVersion
              ? `v${String(Number((current_version?.version ?? 'v01').replace(/\D/g, '')) + 1).padStart(2, '0')}`
              : (current_version?.version ?? 'v01')}{' '}
            / {formatDateTime(newVersion ? new Date().toISOString() : current_version?.created_at, 'YYYYMMDD')}
          </dd>
        </dl>
      </div>
      <div className={styles.info}>
        <InfoEditPanel isImageType={isImageType} viewType={'edit'} isEmergencyOverride={isEmergencyOverride} />
        <Collapse
          className={styles.collapse}
          bordered={false}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} style={{ fontSize: '12px' }} />}
          items={items}
        />
      </div>
    </div>
  )
}
