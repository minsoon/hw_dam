import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button, Skeleton } from 'antd'
import { DownloadOutlined, ShareAltOutlined } from '@ant-design/icons'
import { useCollectionStore } from '@/features/collections/model/collectionStore'
import { CardMenu } from '@/features/collections/ui/card/cardMenu'
import { ModalType } from '@/features/modal'
import { Modal } from '@/features/modal'
import { PathHeader } from '@/shared/ui/pageHeader/pathHeader'

const Header = ({
  refetch,
  isShare,
  hasToken,
  isNumericId,
  isLoading,
}: {
  refetch: () => void
  isShare: boolean
  hasToken: boolean
  isNumericId: boolean
  isLoading: boolean
}) => {
  const router = useRouter()
  const { collectionDetail } = useCollectionStore()
  const [activeModal, setActiveModal] = useState<ModalType>(ModalType.NONE)
  const menuItems = [ModalType.EDIT_COLLECTION, ModalType.DUPLICATE_COLLECTION, ModalType.DELETE_COLLECTION]
  const handleGoBack = useCallback(() => {
    if (hasToken) {
      router.push('/collections')
    } else {
      router.back()
    }
  }, [router, hasToken])

  return (
    <>
      <PathHeader
        title={collectionDetail?.name || ''}
        path='All collections'
        pathClick={() => router.push('/collections')}
        isMaster={!!collectionDetail?.is_master}
        isShare={isShare}
        isNumericId={isNumericId}
        handleGoBack={handleGoBack}
        isLoading={isLoading}
        rightSlot={
          <>
            {isLoading ? (
              <Skeleton.Button
                active
                style={{
                  width: 150,
                  height: 40,
                  backgroundColor: !isNumericId ? '#4a4a4a' : undefined,
                  borderColor: !isNumericId ? '#666' : undefined,
                }}
              />
            ) : (
              <>
                {(!isShare || hasToken) && isNumericId && (
                  <>
                    <CardMenu
                      menuItems={menuItems}
                      refetch={refetch}
                      size='middle'
                      isEdit={false}
                      collection={collectionDetail!}
                      collectionIds={collectionDetail?.collection_id}
                      isBack={true}
                    />
                    <Button icon={<ShareAltOutlined />} onClick={() => setActiveModal(ModalType.SHARE)}>
                      Share
                    </Button>
                  </>
                )}
                <Button
                  color='primary'
                  variant='solid'
                  icon={<DownloadOutlined />}
                  onClick={() => setActiveModal(ModalType.DOWNLOAD)}
                >
                  Download all ({collectionDetail?.file_count})
                </Button>
              </>
            )}
          </>
        }
      />

      <Modal
        type={activeModal}
        isOpen={activeModal !== ModalType.NONE}
        onClose={() => setActiveModal(ModalType.NONE)}
        title='Share collection'
        collection={collectionDetail!}
        downloadType={'collection'}
        collectionId={collectionDetail?.collection_id}
        isWorkingFile={collectionDetail?.is_working_file}
      />
    </>
  )
}

export default Header
