'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from 'antd'
import { EditOutlined, StarFilled } from '@ant-design/icons'
import { useAssetUpdateStore } from '@/features/assets/model/assetUpdateStore'
import { ModalType } from '@/features/modal'
import { Modal } from '@/features/modal'
import styles from './modifyHeader.module.scss'

const ModifyHeader = ({ refetch, isEmergencyOverride }: { refetch: () => void; isEmergencyOverride?: boolean }) => {
  const { asset } = useAssetUpdateStore()
  const { current_version, default_type, is_favorite, files } = asset || {}
  const router = useRouter()
  const searchParams = useSearchParams()
  const newVersion = searchParams.get('newVersion')
  const isAuto = default_type === 'Auto'
  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const handleSaveUpdates = useCallback(() => {
    setActiveModal(newVersion ? ModalType.CREATE_NEW_VERSION : ModalType.OVERRIDE_CURRENT_VERSION)
  }, [newVersion])

  const isValid = useMemo(() => {
    if (!asset || !current_version || !files) return false

    const hasName = current_version.asset_name.trim() !== ''
    const hasThumbnail = files.some(file => file.is_thumbnail === 1)
    const allFilesHaveVariation = files.every(file => file.variation_id != null)

    if (isAuto) {
      return hasName
    }
    return hasName && hasThumbnail && allFilesHaveVariation
  }, [asset, current_version, isAuto, files])

  return (
    <header className={`emptyHeader ${styles.defaultHeader}`}>
      <div className={styles.pageIcon}>
        <EditOutlined />
      </div>
      <div className={styles.title}>
        <p>
          {current_version?.asset_name} {is_favorite && <StarFilled />}
        </p>
      </div>
      <div className={styles.infoButton}>
        <Button onClick={handleGoBack}>Cancel</Button>
        <Button color='primary' variant='solid' onClick={handleSaveUpdates} disabled={!isValid}>
          Save updates
        </Button>
      </div>
      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        refetch={refetch}
        isEmergencyOverride={isEmergencyOverride}
        onClose={() => setActiveModal(ModalType.NONE)}
      />
    </header>
  )
}

export default ModifyHeader
