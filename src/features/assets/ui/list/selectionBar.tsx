import { useCallback, useEffect, useMemo, useState } from 'react'
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
  const checkedAssets = useMemo(() => {
    return assets.filter(asset => checkedIds.has(asset.asset_id))
  }, [assets, checkedIds])

  const isWorkingFile = useMemo(() => {
    return checkedAssets.some(asset => asset.is_working_file === 1) ? 1 : 0
  }, [checkedAssets])

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
    setIsActive(checkedIds.size > 0)
  }, [checkedIds, assets])

  return (
    <>
      <SelectionBar
        isActive={isActive && checkedIds.size > 0}
        count={checkedIds.size}
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
            <Button
              variant='text'
              ghost
              icon={<StarOutlined />}
              onClick={() => handleFavourite(Array.from(checkedIds))}
            >
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
        assetIds={Array.from(checkedIds)}
        downloadType='asset'
        isWorkingFile={isWorkingFile}
        refetch={refetch}
      />
    </>
  )
}
