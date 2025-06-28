import { useCallback } from 'react'
import { Button, Modal } from 'antd'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import styles from './modal.module.scss'

export const ModalAddedTags = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { panelData, currentIndex } = useUploaderStore()
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])
  return (
    <Modal
      open={isOpen}
      onCancel={handleClose}
      width={600}
      title={'Added tags'}
      footer={[
        <Button key='submit' type='primary' onClick={handleClose}>
          Done
        </Button>,
      ]}
    >
      <div className={styles.modalAddedTags}>
        {panelData?.[currentIndex ?? 0]?.tags?.map((tag, index) => (
          <dl key={index}>
            <dt>{tag.tag_name}</dt>
            <dd>
              {tag.child_tags?.filter(childTag => childTag.is_selected === 1).length > 0 ? (
                tag.child_tags
                  ?.filter(childTag => childTag.is_selected === 1)
                  .map(childTag => <span key={childTag.tag_id}>{childTag.tag_name}</span>)
              ) : (
                <p>None</p>
              )}
            </dd>
          </dl>
        ))}
      </div>
    </Modal>
  )
}
