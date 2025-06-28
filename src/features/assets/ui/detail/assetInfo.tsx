'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Collapse } from 'antd'
import { DownloadOutlined, EditOutlined, RightOutlined } from '@ant-design/icons'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { useAssetInfoItems } from '@/features/assets/model/useAssetInfoItems'
import { Modal, ModalType } from '@/features/modal'
import { formatDateTime } from '@/shared/lib/formatDate'
import styles from './assetInfo.module.scss'

export const AssetInfo: React.FC<{
  isPublic: boolean
  isShare: boolean
  version?: string | null
  hasToken: boolean
}> = ({ isPublic, isShare, version, hasToken }) => {
  const { asset, currentVersionId } = useAssetDetailStore()
  const { current_version: currentVersion } = asset || {}
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const isVisibleToUser = (!isShare || hasToken) && !isPublic
  const items = useAssetInfoItems({ isVisibleToUser })
  const router = useRouter()

  if (!asset || !currentVersion) return <></>

  return (
    <div className={`${styles.assetInfo} ${isPublic || currentVersionId !== null ? styles.darkInfo : ''}`}>
      <div className={styles.infoBox}>
        <div className={styles.info}>
          <div className={styles.title}>
            {currentVersion?.asset_name}
            {isVisibleToUser && (
              <span>
                {currentVersion?.version} / {formatDateTime(currentVersion?.created_at, 'YYYYMMDD')}
              </span>
            )}
          </div>
          {isVisibleToUser && !version && (
            <div className={styles.editButton}>
              <Button icon={<EditOutlined />} block onClick={() => router.push(`/assets/modify/${asset.asset_id}`)}>
                Edit asset
              </Button>
            </div>
          )}
          <div className={styles.description}>{currentVersion?.description}</div>
          <div className={styles.infoList}>
            <dl>
              <dt>Asset type</dt>
              <dd>{asset.asset_type_name}</dd>
            </dl>
            <dl>
              <dt>File type(s)</dt>
              <dd>{asset.file_type_summary}</dd>
            </dl>
            {currentVersion?.properties?.map(property => (
              <dl key={property.category_id}>
                <dt>{property.category_name}</dt>
                <dd>{property.options.map(option => option.option_name).join(', ')}</dd>
              </dl>
            ))}
            <dl>
              <dt>Copyright (License*)</dt>
              <dd>{currentVersion?.copyright}</dd>
            </dl>
            <dl>
              <dt>Date created</dt>
              <dd>{formatDateTime(currentVersion?.created_at)}</dd>
            </dl>
            <dl>
              <dt>Date updated</dt>
              <dd>{formatDateTime(currentVersion?.updated_at)}</dd>
            </dl>
          </div>
        </div>
        <div className={styles.panel}>
          <Collapse
            expandIconPosition='end'
            expandIcon={({ isActive }) => (
              <RightOutlined
                style={{
                  transition: 'transform 0.3s',
                  transform: `rotate(${isActive ? -90 : 90}deg)`,
                }}
              />
            )}
            className={styles.collapse}
            bordered={false}
            items={items}
          />
        </div>
      </div>
      <div className={styles.downloadButton}>
        <Button
          color='primary'
          variant='solid'
          icon={<DownloadOutlined />}
          block
          onClick={() => setActiveModal(ModalType.DOWNLOAD)}
        >
          Download all ({asset.file_count})
        </Button>
      </div>

      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={() => setActiveModal(ModalType.NONE)}
        assetIds={asset?.asset_id}
        downloadType={'asset'}
      />
    </div>
  )
}
