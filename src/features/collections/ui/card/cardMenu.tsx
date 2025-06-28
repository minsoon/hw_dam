import React, { useCallback, useState } from 'react'
import { Button, ButtonProps, Dropdown } from 'antd'
import { CopyOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, ShareAltOutlined } from '@ant-design/icons'
import { CollectionAssetListDataResponse, CollectionListDataResponse } from '@/entities/types/Collections'
import { MainCollectionsList } from '@/entities/types/Main'
import { Modal, ModalType } from '@/features/modal'
import styles from './card.module.scss'

export const CardMenu: React.FC<{
  size?: ButtonProps['size']
  collection: CollectionListDataResponse | CollectionAssetListDataResponse | MainCollectionsList
  collectionIds?: number
  isEdit?: boolean
  refetch?: () => void
  menuItems?: ModalType[]
}> = ({
  size = 'small',
  collection,
  collectionIds,
  isEdit,
  refetch,
  menuItems = [ModalType.EDIT_COLLECTION, ModalType.DUPLICATE_COLLECTION, ModalType.SHARE, ModalType.DELETE_COLLECTION],
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)

  const handleModalOpen = useCallback((modalType: ModalType) => {
    setActiveModal(modalType)
  }, [])

  const getMenuLabel = (modalType: ModalType) => {
    switch (modalType) {
      case ModalType.EDIT_COLLECTION:
        return (
          <div onClick={() => handleModalOpen(ModalType.EDIT_COLLECTION)}>
            <EditOutlined />
            Edit collection
          </div>
        )
      case ModalType.DUPLICATE_COLLECTION:
        return (
          <div onClick={() => handleModalOpen(ModalType.DUPLICATE_COLLECTION)}>
            <CopyOutlined />
            Duplicate to collection
          </div>
        )
      case ModalType.SHARE:
        return (
          <div onClick={() => handleModalOpen(ModalType.SHARE)}>
            <ShareAltOutlined />
            Share collection
          </div>
        )
      case ModalType.DELETE_COLLECTION:
        return (
          <div onClick={() => handleModalOpen(ModalType.DELETE_COLLECTION)}>
            <DeleteOutlined />
            Delete collection
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
    <div className={`${styles.cardMenu} ${isOpen ? styles.open : ''}`}>
      <Dropdown
        menu={{ items }}
        className={styles.btnMenu}
        overlayClassName={styles.dropdown}
        placement='bottomRight'
        align={{ offset: [0, 5] }}
        onOpenChange={open => setIsOpen(open)}
      >
        <Button
          color='default'
          variant='outlined'
          size={size}
          icon={<EllipsisOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />}
        />
      </Dropdown>
      <Modal
        title={activeModal === ModalType.SHARE ? 'Share collection' : undefined}
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        collection={collection}
        collectionIds={collectionIds}
        isEdit={isEdit}
        refetch={refetch}
        onClose={() => setActiveModal(ModalType.NONE)}
      />
    </div>
  )
}
