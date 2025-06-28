import { useEffect, useState } from 'react'
import { Button } from 'antd'
import { DeleteOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { ModalType } from '@/features/modal'
import { Modal } from '@/features/modal'
import { useSelectionActions } from '@/shared/model/useSelectionActions'
import { SelectionBar } from '@/shared/ui/selectionBar'

export const SelectionDetailBar = ({ refetch }: { refetch: () => void }) => {
  const { collectionDetail, checkedIds, setChecked } = useCollectionStore()
  const [isActive, setIsActive] = useState(true)
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const { selectAll, deselectAll } = useSelectionActions(collectionDetail?.assets, 'asset_id', setChecked)

  useEffect(() => {
    setIsActive(checkedIds.length > 0)
  }, [checkedIds, collectionDetail])

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
            <Button
              variant='text'
              ghost
              icon={<DeleteOutlined />}
              onClick={() => setActiveModal(ModalType.REMOVE_ASSET)}
            >
              Remove asset
            </Button>
            <Button
              variant='text'
              ghost
              icon={<PlusOutlined />}
              onClick={() => setActiveModal(ModalType.ADD_TO_COLLECTION)}
            >
              Add to collection
            </Button>
            <Button variant='text' ghost icon={<DownloadOutlined />} onClick={() => setActiveModal(ModalType.DOWNLOAD)}>
              Download
            </Button>
          </>
        }
      />

      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={() => setActiveModal(ModalType.NONE)}
        refetch={refetch!}
        collectionId={collectionDetail?.collection_id || 0}
        assetIds={checkedIds}
      />
    </>
  )
}
