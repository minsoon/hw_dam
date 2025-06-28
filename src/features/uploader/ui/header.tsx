'use client'

import { useCallback, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Skeleton, Tooltip, message } from 'antd'
import { QuestionCircleOutlined, RedoOutlined, SyncOutlined } from '@ant-design/icons'
import { ModalType } from '@/features/modal'
import { Modal } from '@/features/modal'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import { useCreateAssetQuery } from '@/features/uploader/model/useUploadQuery'
import { TextLoading } from '@/shared/ui/textLoading'
import { AssetPostInfo } from '../model/types'
import styles from './header.module.scss'

const UploaderHeader = () => {
  const { assets, files, assetTypeDetail, assetTypeDetailLoading, clearAssets } = useUploaderStore()
  const router = useRouter()
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isAuto = assetTypeDetail?.default_type === 'Auto'
  const { mutate: createAsset } = useCreateAssetQuery()
  const requiredFields: (keyof AssetPostInfo)[] = [
    'asset_name',
    'description',
    'owner_name',
    'owner_email',
    'agency_name',
    'agency_contact_name',
    'copyright',
  ]
  const isValid =
    assets.length > 0 &&
    (isAuto
      ? assets.every(asset => requiredFields.every(field => asset[field]?.toString().trim() !== ''))
      : requiredFields.every(field => assets[0]?.[field]?.toString().trim() !== '') &&
        files.some(file => file.is_thumbnail === 1))
  // files.every(file => file.variation_id != null))

  const handleRefresh = useCallback(() => {
    clearAssets()
  }, [clearAssets])

  const handleCreateAsset = useCallback(() => {
    if (!assetTypeDetail?.asset_type_id || !assets || !files) return

    const mergedAssets =
      assetTypeDetail.default_type === 'Auto'
        ? assets
        : [
            {
              ...assets[0],
              file_info: assets.flatMap(asset => asset.file_info ?? []),
            },
          ]

    const formData = new FormData()
    formData.append('asset_type_id', assetTypeDetail.asset_type_id.toString())
    formData.append('assetPostInfos', JSON.stringify(mergedAssets))
    files.forEach(file => {
      formData.append('files', file.file)
    })

    setIsSubmitting(true)
    createAsset(formData, {
      onSuccess: () => {
        setActiveModal(ModalType.UPLOAD_SUCCESS)
      },
      onError: () => {
        message.error('Failed to create asset')
      },
      onSettled: () => {
        setIsSubmitting(false)
      },
    })
  }, [createAsset, assetTypeDetail, assets, files])

  return (
    <header className={`emptyHeader ${styles.uploadHeader}`}>
      <div className={styles.logo}>
        <div className={styles.logoImage}>
          <Image src='/images/logo-default.png' alt='' width={26} height={26} />
        </div>
        {assets && assets.length > 0 && (
          <Button
            style={{ background: 'transparent' }}
            variant='outlined'
            className={styles.refresh}
            onClick={handleRefresh}
          >
            <RedoOutlined />
          </Button>
        )}
        {assetTypeDetailLoading ? (
          <TextLoading isDark={true} />
        ) : (
          <p>{assetTypeDetail ? `${assetTypeDetail.name} uploader` : 'Uploader home'}</p>
        )}
      </div>
      <div className={styles.actions}>
        {assetTypeDetailLoading ? (
          <Skeleton.Button
            active
            style={{
              width: 116,
              height: 40,
              backgroundColor: '#4a4a4a',
              borderColor: '#666',
            }}
          />
        ) : (
          <>
            <Tooltip title={assetTypeDetail?.upload_instruction}>
              <QuestionCircleOutlined />
            </Tooltip>
            <Button style={{ background: 'transparent' }} variant='outlined' onClick={() => router.push('/')}>
              Exit uploader
            </Button>
            {assetTypeDetail && (
              <Button
                color='primary'
                variant='solid'
                className={styles.submit}
                onClick={handleCreateAsset}
                disabled={!isValid}
                loading={isSubmitting && { icon: <SyncOutlined style={{ fontSize: '16px' }} spin /> }}
              >
                {isSubmitting ? 'Saving..' : 'Save assets'}
              </Button>
            )}
          </>
        )}
      </div>
      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={() => setActiveModal(ModalType.NONE)}
      />
    </header>
  )
}

export default UploaderHeader
