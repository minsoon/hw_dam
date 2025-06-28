'use client'

import React, { useCallback, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from 'antd'
import { EditOutlined, StarFilled } from '@ant-design/icons'
import { useAssetUpdateStore } from '@/features/assets/model/assetUpdateStore'
import { ModalType } from '@/features/modal'
import { Modal } from '@/features/modal'
import styles from './modifyHeader.module.scss'

const ModifyHeader = ({ refetch, isEmergencyOverride }: { refetch: () => void; isEmergencyOverride?: boolean }) => {
  const { asset } = useAssetUpdateStore()
  const { current_version, is_favorite } = asset || {}
  const router = useRouter()
  const searchParams = useSearchParams()
  const newVersion = searchParams.get('newVersion')
  const handleGoBack = useCallback(() => {
    router.back()
  }, [router])
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const handleSaveUpdates = useCallback(() => {
    setActiveModal(newVersion ? ModalType.CREATE_NEW_VERSION : ModalType.OVERRIDE_CURRENT_VERSION)
  }, [newVersion])

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
        <Button onClick={handleGoBack}>Center</Button>
        <Button color='primary' variant='solid' onClick={handleSaveUpdates}>
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
