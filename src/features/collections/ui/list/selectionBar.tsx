import { useCallback, useEffect, useState } from 'react'
import { Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { ModalType } from '@/features/modal'
import { Modal } from '@/features/modal'
import { useSelectionActions } from '@/shared/model/useSelectionActions'
import { SelectionBar } from '@/shared/ui/selectionBar'

export const CollectionSelectionBar = ({ refetch }: { refetch: () => void }) => {
  const collections = useCollectionStore(state => state.collections)
  const checkedIds = useCollectionStore(state => state.checkedIds)
  const setChecked = useCollectionStore(state => state.setChecked)

  const [isActive, setIsActive] = useState(true)
  const { selectAll, deselectAll } = useSelectionActions(collections, 'collection_id', setChecked)
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)

  const onClose = useCallback(() => {
    setActiveModal(ModalType.NONE)
    setChecked([])
  }, [setChecked, setActiveModal])

  useEffect(() => {
    setIsActive(checkedIds.size > 0)
  }, [checkedIds, collections])

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
              icon={<DeleteOutlined />}
              onClick={() => setActiveModal(ModalType.DELETE_COLLECTION)}
            >
              Delete selected
            </Button>
          </>
        }
      />

      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={onClose}
        collectionIds={Array.from(checkedIds)}
        refetch={refetch!}
      />
    </>
  )
}
