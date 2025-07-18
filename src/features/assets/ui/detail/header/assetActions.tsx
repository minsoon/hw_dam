import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Dropdown, message } from 'antd'
import {
  DeleteOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  ExclamationCircleOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  StarOutlined,
} from '@ant-design/icons'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { useUpdateAssetFavoriteQuery } from '@/features/assets/model/useAssetQuery'
import { Modal, ModalType } from '@/features/modal'
import styles from './assetActions.module.scss'

export const AssetActions: React.FC<{ refetch: () => void; menuItems?: ModalType[] }> = ({
  refetch,
  menuItems = [
    ModalType.FAVOURITE,
    ModalType.ADD_TO_COLLECTION,
    ModalType.HIDE_ASSET,
    ModalType.DOWNLOAD,
    ModalType.EMERGENCY_OVERRIDE,
    ModalType.DELETE_ASSET,
  ],
}) => {
  const router = useRouter()
  const { asset } = useAssetDetailStore()
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const { mutate: updateFavorite } = useUpdateAssetFavoriteQuery()
  const handleModalOpen = useCallback((modalType: ModalType) => {
    setActiveModal(modalType)
  }, [])

  const handleFavourite = useCallback(
    (assetId: number) => {
      updateFavorite(
        {
          asset_ids: assetId.toString() || '',
          is_favorite: 'Y',
        },
        {
          onSuccess: () => {
            refetch()
          },
          onError: () => {
            message.error('Failed to update bookmark')
          },
        }
      )
    },
    [updateFavorite, refetch]
  )

  const getMenuLabel = (modalType: ModalType) => {
    switch (modalType) {
      case ModalType.FAVOURITE:
        return (
          <div onClick={() => handleFavourite(asset?.asset_id || 0)}>
            <StarOutlined />
            Favourite
          </div>
        )
      case ModalType.ADD_TO_COLLECTION:
        return (
          <div onClick={() => handleModalOpen(ModalType.ADD_TO_COLLECTION)}>
            <PlusCircleOutlined />
            Add to collection
          </div>
        )
      case ModalType.HIDE_ASSET:
        return (
          <div onClick={() => handleModalOpen(ModalType.HIDE_ASSET)}>
            {asset?.is_hidden ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            {asset?.is_hidden ? 'Unhide asset' : 'Hide asset'}
          </div>
        )
      case ModalType.DOWNLOAD:
        return (
          <div onClick={() => handleModalOpen(ModalType.DOWNLOAD)}>
            <DownloadOutlined />
            Download
          </div>
        )
      case ModalType.EMERGENCY_OVERRIDE:
        return (
          <div onClick={() => router.push(`/assets/modify/${asset?.asset_id}/emergency-override`)}>
            <ExclamationCircleOutlined />
            Emergency override
          </div>
        )
      case ModalType.DELETE_ASSET:
        return (
          <div onClick={() => handleModalOpen(ModalType.DELETE_ASSET)}>
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
  return (
    <div>
      <Dropdown
        menu={{ items }}
        className={`${styles.btnMenu}`}
        overlayClassName={styles.dropdown}
        placement='bottomRight'
      >
        <Button icon={<EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />} />
      </Dropdown>
      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={() => setActiveModal(ModalType.NONE)}
        refetch={() => {
          if (activeModal === ModalType.DELETE_SELECTED) {
            router.push('/assets')
          } else {
            refetch()
          }
        }}
        assetIds={asset?.asset_id}
        item={asset!}
        downloadType={'asset'}
        isWorkingFile={asset?.is_working_file}
      />
    </div>
  )
}
