'use client'

import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Skeleton } from 'antd'
import {
  CloseOutlined,
  DeleteOutlined,
  EyeInvisibleOutlined,
  HistoryOutlined,
  PlusOutlined,
  ShareAltOutlined,
  StarFilled,
} from '@ant-design/icons'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { AssetActions } from '@/features/assets/ui/detail/header/assetActions'
import { VersionHistory } from '@/features/assets/ui/detail/header/versionHistory'
import { Modal, ModalType } from '@/features/modal'
import styles from './detailHeader.module.scss'

const DefaultHeader = ({
  isLoading,
  refetch,
  isShare,
  hasToken,
}: {
  isLoading: boolean
  refetch: () => void
  isShare: boolean
  hasToken: boolean
}) => {
  const { asset, currentVersionId } = useAssetDetailStore()
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const router = useRouter()

  const handleGoBack = useCallback(() => {
    if (hasToken) {
      router.push('/assets')
    } else {
      router.back()
    }
  }, [router, hasToken])

  const handleCurrentVersion = useCallback(() => {
    router.push(`/assets/${asset?.asset_id}`)
  }, [router, asset?.asset_id])

  return (
    <header className={`emptyHeader ${styles.defaultHeader} ${currentVersionId !== null ? styles.readonlyHeader : ''}`}>
      <div className={styles.closeButton}>
        {currentVersionId === null ? (
          <Button color='default' variant='text' size='small' icon={<CloseOutlined />} onClick={handleGoBack}></Button>
        ) : (
          <Button
            color='default'
            variant='text'
            size='small'
            icon={<HistoryOutlined />}
            onClick={handleCurrentVersion}
          ></Button>
        )}
      </div>
      <div className={styles.title}>
        {isLoading ? (
          <Skeleton className={styles.compactSkeleton} style={{ width: 500 }} active paragraph={{ rows: 1 }} />
        ) : (
          <>
            {asset && asset.current_version && (
              <dl>
                <dt>
                  {asset.current_version.asset_name} {asset.is_favorite && <StarFilled />}
                </dt>
                <dd>
                  {currentVersionId === null && (
                    <>
                      <span>{asset.asset_type_name}</span>
                      <span>{asset.file_count} files</span>
                      <span>{asset.view_count} views</span>
                      <span>{asset.download_count} downloads</span>
                      {asset.is_hidden ? (
                        <span>
                          <span className={styles.hidden}>
                            <EyeInvisibleOutlined />
                            hidden
                          </span>
                        </span>
                      ) : (
                        ''
                      )}
                    </>
                  )}
                </dd>
              </dl>
            )}
          </>
        )}
      </div>
      <div className={styles.infoButton}>
        {(!isShare || hasToken) && (
          <>
            {isLoading ? (
              <Skeleton.Button />
            ) : (
              <>
                {currentVersionId === null ? (
                  <>
                    <AssetActions refetch={refetch} />
                    <Button icon={<ShareAltOutlined />} onClick={() => setActiveModal(ModalType.SHARE)}>
                      Share
                    </Button>
                  </>
                ) : (
                  <Button
                    icon={<DeleteOutlined style={{ fontSize: '18px' }} />}
                    onClick={() => setActiveModal(ModalType.DELETE_ASSET_VERSION)}
                  ></Button>
                )}
                <VersionHistory />
                {currentVersionId === null && (
                  <Button
                    color='default'
                    variant='solid'
                    icon={<PlusOutlined />}
                    onClick={() => router.push(`/assets/modify/${asset?.asset_id}?newVersion=true`)}
                  >
                    New version
                  </Button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        item={asset!}
        onClose={() => setActiveModal(ModalType.NONE)}
      />
    </header>
  )
}

export default DefaultHeader
