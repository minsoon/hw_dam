'use client'

import React, { useRef } from 'react'
import { Button, Collapse, CollapseProps, Input, InputRef, Tag, message } from 'antd'
import { AppstoreAddOutlined, LinkOutlined, RightOutlined } from '@ant-design/icons'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { formatDateTime } from '@/shared/lib/formatDate'
import useCopyUrl from '@/shared/model/useCopyText'
import styles from './detail.module.scss'

export const CollectionInfo: React.FC<{ hasToken: boolean; isNumericId: boolean }> = ({ hasToken, isNumericId }) => {
  const inputRef = useRef<InputRef>(null)
  const { collectionDetail } = useCollectionStore()
  const copyUrl = useCopyUrl()
  const handleCopy = async () => {
    if (inputRef.current?.input) {
      copyUrl(inputRef.current.input.value)
    } else {
      message.error('Failed to copy the link.')
    }
  }

  const items: CollapseProps['items'] = [
    ...(hasToken && isNumericId
      ? [
          {
            key: '1',
            label: (
              <div className={styles.label}>
                <LinkOutlined />
                Link to collection
              </div>
            ),
            children: (
              <Input
                readOnly
                value={collectionDetail?.share_url_user}
                ref={inputRef}
                className={styles.linkInput}
                suffix={<Button type='text' icon={<LinkOutlined />} onClick={handleCopy} />}
              />
            ),
          },
        ]
      : []),
    {
      key: '2',
      label: (
        <div className={styles.label}>
          <AppstoreAddOutlined />
          Statistics
        </div>
      ),
      children: (
        <div className={styles.statistics}>
          <dl>
            <dt>Assets</dt>
            <dd>{collectionDetail?.asset_count}</dd>
          </dl>
          <dl>
            <dt>Views</dt>
            <dd>{collectionDetail?.view_count}</dd>
          </dl>
          <dl>
            <dt>Downloads</dt>
            <dd>{collectionDetail?.download_count}</dd>
          </dl>
        </div>
      ),
    },
  ]
  return (
    <div className={`${styles.assetInfo} ${!isNumericId ? styles.darkAssetInfo : ''}`}>
      <div className={styles.infoBox}>
        <div className={styles.info}>
          <div className={styles.title}>Collection info</div>
          <div className={styles.description}>{collectionDetail?.description}</div>
          <div className={styles.infoList}>
            <dl>
              <dt>Collection tags</dt>
              <dd>
                <div className={styles.tagList}>
                  {collectionDetail?.tags?.map(tag => {
                    return <Tag key={tag.tag_id}>{tag.tag_name}</Tag>
                  })}
                </div>
              </dd>
            </dl>
            <dl>
              <dt>Date created</dt>
              <dd>{formatDateTime(collectionDetail?.created_at)}</dd>
            </dl>
            <dl>
              <dt>Date updated</dt>
              <dd>{formatDateTime(collectionDetail?.updated_at)}</dd>
            </dl>
            <dl>
              <dt>Owner</dt>
              <dd>{collectionDetail?.created_by || '-'}</dd>
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
    </div>
  )
}
