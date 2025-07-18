import React, { useState } from 'react'
import { Button, Checkbox } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { CollectionAssetsDataResponse } from '@/entities/types/Collections'
import { AssetCardContent } from '@/features/assets/ui/card/assetCardContent'
import { CardMenu } from '@/features/assets/ui/card/cardMenu'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { Modal, ModalType } from '@/features/modal'
import styles from './card.module.scss'

export const CollectionCard = React.memo(
  ({
    item,
    isShare,
    hasToken,
    refetch,
    isNumericId,
  }: {
    item: CollectionAssetsDataResponse
    isShare: boolean
    hasToken: boolean
    refetch: () => void
    isNumericId: boolean
  }) => {
    const collectionDetail = useCollectionStore(state => state.collectionDetail)
    const setChecked = useCollectionStore(state => state.setChecked)
    const isChecked = useCollectionStore(state => state.checkedIds.has(item.asset_id))
    const menuItems = [ModalType.ADD_TO_COLLECTION, ModalType.REMOVE_ASSET, ModalType.DOWNLOAD, ModalType.SHARE]
    const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)

    const handleModalClose = () => {
      setActiveModal(ModalType.NONE)
    }

    return (
      <div className={`${styles.card} ${isChecked ? styles.checked : ''} ${!isNumericId ? styles.darkCard : ''}`}>
        <AssetCardContent item={item} notLink={true} />
        {!isShare && (
          <div className={`${styles.checkbox} ${isChecked ? styles.checked : ''}`}>
            <Checkbox checked={isChecked} onChange={() => setChecked(item.asset_id)} />
          </div>
        )}
        {(!isShare || hasToken) && isNumericId && (
          <CardMenu
            item={item}
            collectionId={collectionDetail?.collection_id}
            refetch={refetch}
            menuItems={menuItems}
            downloadType={'asset'}
            showBookmark={false}
          />
        )}
        {isShare && !isNumericId && (
          <>
            <div className={styles.download}>
              <Button icon={<DownloadOutlined />} onClick={() => setActiveModal(ModalType.DOWNLOAD)} />
            </div>

            <Modal
              type={activeModal}
              isOpen={activeModal !== ModalType.NONE}
              onClose={handleModalClose}
              assetIds={item.asset_id}
              collectionId={collectionDetail?.collection_id}
              downloadType={'asset'}
              isWorkingFile={item.is_working_file}
            />
          </>
        )}
      </div>
    )
  }
)
CollectionCard.displayName = 'CollectionCard'
