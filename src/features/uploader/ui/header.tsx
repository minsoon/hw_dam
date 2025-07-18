'use client'

import { useCallback, useMemo, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button, Skeleton, Tooltip, message } from 'antd'
import { QuestionCircleOutlined, RedoOutlined } from '@ant-design/icons'
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

  const { mutate: createAsset } = useCreateAssetQuery()

  const isValid = useMemo(() => {
    if (!assetTypeDetail || assets.length === 0) return false

    const requiredFields: (keyof AssetPostInfo)[] = ['asset_name']
    const isAuto = assetTypeDetail.default_type === 'Auto'

    const allAssetsHaveName = assets.every(asset =>
      requiredFields.every(field => asset[field]?.toString().trim() !== '')
    )
    const firstAssetHasName = requiredFields.every(field => assets[0]?.[field]?.toString().trim() !== '')
    const hasThumbnail = files.some(file => file.is_thumbnail === 1)
    const allFilesHaveVariation = files.every(file => file.variation_id != null)

    if (isAuto) {
      return allAssetsHaveName
    }
    return firstAssetHasName && hasThumbnail && allFilesHaveVariation
  }, [assets, files, assetTypeDetail])

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
    setActiveModal(ModalType.UPLOADER_LOADING)
    createAsset(formData, {
      onSuccess: () => {
        setActiveModal(ModalType.NONE)
        setTimeout(() => {
          setActiveModal(ModalType.UPLOAD_SUCCESS)
        }, 100)
      },
      onError: () => {
        message.error('Failed to create asset')
      },
      onSettled: () => {
        setActiveModal(ModalType.NONE)
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
              >
                Save assets
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
