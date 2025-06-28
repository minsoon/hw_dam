import { useCallback, useEffect, useState } from 'react'
import { Button, message } from 'antd'
import { DeleteOutlined, DownloadOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons'
import { useAssetStore } from '@/features/assets/model/assetsStore'
import { useUpdateAssetFavoriteQuery } from '@/features/assets/model/useAssetQuery'
import { ModalType } from '@/features/modal'
import { Modal } from '@/features/modal'
import { useSelectionActions } from '@/shared/model/useSelectionActions'
import { SelectionBar } from '@/shared/ui/selectionBar'

export const AssetSelectionBar = ({ refetch }: { refetch: () => void }) => {
  const { assets, checkedIds, setChecked } = useAssetStore()
  const [isActive, setIsActive] = useState(true)
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const { selectAll, deselectAll } = useSelectionActions(assets, 'asset_id', setChecked)
  const { mutate: updateFavorite } = useUpdateAssetFavoriteQuery()

  const handleFavourite = useCallback(
    (assetIds: number[]) => {
      updateFavorite(
        {
          asset_ids: assetIds.join(','),
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

  const handleModalOpen = useCallback((modalType: ModalType) => {
    setActiveModal(modalType)
  }, [])

  useEffect(() => {
    setIsActive(checkedIds.length > 0)
  }, [checkedIds, assets])

  return (
    <>
      <SelectionBar
        isActive={isActive && checkedIds.length > 0}
        count={checkedIds.length}
        setIsActive={setIsActive}
        secondaryActions={
          <>
            <Button variant='text' ghost onClick={selectAll}>
              Select all
            </Button>
            <Button variant='text' ghost onClick={deselectAll}>
              Deselect all
            </Button>
          </>
        }
        mainActions={
          <>
            <Button variant='text' ghost icon={<StarOutlined />} onClick={() => handleFavourite(checkedIds)}>
              Favourite
            </Button>
            <Button
              variant='text'
              ghost
              icon={<PlusOutlined />}
              onClick={() => handleModalOpen(ModalType.ADD_TO_COLLECTION)}
            >
              Add to collection
            </Button>
            <Button
              variant='text'
              ghost
              icon={<DownloadOutlined />}
              onClick={() => handleModalOpen(ModalType.DOWNLOAD)}
            >
              Download
            </Button>
            <Button
              variant='text'
              ghost
              icon={<DeleteOutlined />}
              onClick={() => handleModalOpen(ModalType.DELETE_SELECTED)}
            >
              Delete selected
            </Button>
          </>
        }
      />

      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={() => setActiveModal(ModalType.NONE)}
        assetIds={checkedIds}
        refetch={refetch}
      />
    </>
  )
}
