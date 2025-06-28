'use client'

import React from 'react'
import { Button, Collapse } from 'antd'
import { CaretRightOutlined, CloseOutlined } from '@ant-design/icons'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import { createEditPanelItems } from '@/shared/lib/createEditPanelItems'
import { InfoEditPanel } from '@/shared/ui/editPanel/assetEditPanel'
import styles from './assetEdit.module.scss'

export const AssetEdit: React.FC<{ isImageType: boolean }> = ({ isImageType }) => {
  const { currentIndex, panelItems, setCurrentIndex } = useUploaderStore()
  const items = createEditPanelItems(panelItems, isImageType)

  return (
    <div className={`${styles.assetInfo} ${currentIndex !== null ? styles.onEditor : ''}`}>
      <div className={styles.title}>
        Edit asset info
        {isImageType && (
          <Button
            color='default'
            variant='text'
            size='small'
            className={styles.setting}
            icon={<CloseOutlined />}
            onClick={() => setCurrentIndex(null)}
          ></Button>
        )}
      </div>
      <div className={styles.info}>
        <InfoEditPanel viewType={'upload'} />
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
