'use client'

// import { useEffect } from 'react'
// import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { Modal, ModalType } from '@/features/modal'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import { UploadedFile } from '@/shared/types/editCard'
import styles from './editCard.module.scss'

export const AssetCard: React.FC<{
  index: number
  item: UploadedFile
}> = ({ index, item }) => {
  const { assets, removeAsset, setCurrentIndex, currentIndex } = useUploaderStore()
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const fileType = item.file.name?.split('.').pop()?.toUpperCase() || ''
  const isEditing = currentIndex === index
  const asset = assets[index]

  if (!asset) return null

  return (
    <div className={`${styles.editCard} ${isEditing ? styles.editorChecked : ''}`}>
      <div className={styles.thumbnail} style={{ backgroundImage: `url(${item.url})` }}>
        <span className={styles.fileName}>{item.file.name}</span>
        {item.file.name && <span className={styles.type}>{fileType}</span>}
        <div className={styles.actionsBtn}>
          <Button className={styles.delete} onClick={() => removeAsset(index)}>
            <DeleteOutlined />
          </Button>
        </div>
      </div>
      <dl className={styles.fileInfo}>
        <dt>{asset.asset_name || 'asset-name-#'}</dt>
        <dd>
          <dl>
            <dt>All tags</dt>
            <dd>
              <div className={styles.tagWrapper}>
                {asset.tags_list?.length === 0 && <>None</>}
                {asset.tags_list?.slice(0, 6).map((tag, i) => (
                  <span key={i} className={styles.tagItem}>
                    {tag.tag_name}
                  </span>
                ))}
                {asset.tags_list && asset.tags_list.length > 7 && (
                  <a href='#' onClick={() => setActiveModal(ModalType.ADDED_TAGS)}>
                    +{asset.tags_list.length - 6} more
                  </a>
                )}
              </div>
            </dd>
          </dl>
        </dd>
      </dl>
      <div className={styles.editBtn}>
        <Button block onClick={() => setCurrentIndex(index)}>
          Edit info
        </Button>
      </div>

      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={() => setActiveModal(ModalType.NONE)}
      />
    </div>
  )
}
