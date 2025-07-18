import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Dropdown, message } from 'antd'
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusCircleOutlined,
  ShareAltOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons'
import { AssetListDataResponse } from '@/entities/types/Assets'
import { MainAssetsList } from '@/entities/types/Main'
import { useUpdateAssetFavoriteQuery } from '@/features/assets/model/useAssetQuery'
import { Modal, ModalType } from '@/features/modal'
import styles from './card.module.scss'

export const CardMenu: React.FC<{
  item: AssetListDataResponse | MainAssetsList
  isRecent?: boolean
  collectionId?: number
  refetch: () => void
  showBookmark?: boolean
  menuItems?: ModalType[]
  downloadType?: 'asset' | 'collection'
}> = ({
  item,
  isRecent,
  collectionId,
  showBookmark = true,
  refetch,
  menuItems = [
    ModalType.EDIT_ASSET,
    ModalType.ADD_TO_COLLECTION,
    ModalType.DOWNLOAD,
    ModalType.SHARE,
    ModalType.DELETE_SELECTED,
  ],
  downloadType,
}) => {
  const [isBookmark, setIsBookmark] = useState(false)
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const [isOpen, setIsOpen] = useState(false)
  const { mutate: updateAssetFavorite } = useUpdateAssetFavoriteQuery()
  const router = useRouter()

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open)
  }, [])

  const handleBookmarkClick = useCallback(() => {
    updateAssetFavorite(
      {
        asset_ids: String(item.asset_id),
        is_favorite: !isBookmark ? 'Y' : 'N',
      },
      {
        onSuccess: () => {
          setIsBookmark(prev => !prev)
          refetch()
        },
        onError: () => {
          message.error('Failed to update bookmark')
        },
      }
    )
  }, [item.asset_id, isBookmark, updateAssetFavorite, refetch])

  const handleModalOpen = useCallback((modalType: ModalType) => {
    setActiveModal(modalType)
  }, [])
  const handleModalClose = useCallback(() => {
    setActiveModal(ModalType.NONE)
  }, [])

  const getMenuLabel = (modalType: ModalType) => {
    switch (modalType) {
      case ModalType.EDIT_ASSET:
        return (
          <div onClick={() => router.push(`/assets/modify/${item.asset_id}`)}>
            <EditOutlined />
            Edit asset
          </div>
        )
      case ModalType.ADD_TO_COLLECTION:
        return (
          <div onClick={() => handleModalOpen(ModalType.ADD_TO_COLLECTION)}>
            <PlusCircleOutlined />
            Add to collection
          </div>
        )
      case ModalType.REMOVE_ASSET:
        return (
          <div onClick={() => handleModalOpen(ModalType.REMOVE_ASSET)}>
            <DeleteOutlined />
            Remove asset
          </div>
        )
      case ModalType.DOWNLOAD:
        return (
          <div onClick={() => handleModalOpen(ModalType.DOWNLOAD)}>
            <DownloadOutlined />
            Download
          </div>
        )
      case ModalType.SHARE:
        return (
          <div onClick={() => handleModalOpen(ModalType.SHARE)}>
            <ShareAltOutlined />
            Share
          </div>
        )
      case ModalType.DELETE_SELECTED:
        return (
          <div onClick={() => handleModalOpen(ModalType.DELETE_SELECTED)}>
            <DeleteOutlined />
            Delete
          </div>
        )
      default:
        return null
    }
  }

  const items =
    menuItems?.map((item, index) => {
      return {
        key: index,
        label: getMenuLabel(item),
      }
    }) || []

  useEffect(() => {
    setIsBookmark(item.is_favorite)
  }, [item.is_favorite])

  return (
    <div className={`${styles.ritBtn} ${isBookmark ? styles.bookmarked : ''} ${isOpen ? styles.open : ''}`}>
      <Dropdown
        menu={{ items }}
        className={`${styles.btnMenu}`}
        overlayClassName={styles.dropdown}
        placement='bottomRight'
        align={{ offset: [isRecent || !showBookmark ? 0 : 32, 5] }}
        onOpenChange={handleOpenChange}
      >
        <Button
          color='default'
          variant='text'
          size='small'
          className={`${showBookmark ? '' : styles.oneBtn}`}
          icon={<EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />}
        />
      </Dropdown>
      {showBookmark && (
        <Button
          color='default'
          variant='text'
          size='small'
          className={styles.btnBookmark}
          icon={isBookmark ? <StarFilled /> : <StarOutlined />}
          onClick={handleBookmarkClick}
        />
      )}

      <Modal
        title={activeModal === ModalType.SHARE ? 'Share link' : undefined}
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={handleModalClose}
        assetIds={item.asset_id}
        collectionId={collectionId}
        downloadType={downloadType}
        isWorkingFile={item.is_working_file}
        item={item}
        refetch={refetch}
      />
    </div>
  )
}
