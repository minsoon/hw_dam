'use client'

import { Button } from 'antd'
import { CloudUploadOutlined, PlusOutlined } from '@ant-design/icons'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'
import { useAssetTypeDetailQuery } from '@/features/uploader/model/useUploadQuery'
import { useUploaderDropzone } from '@/features/uploader/model/useUploaderDropzone'
import styles from './fileUploader.module.scss'

export const FileUploader = ({ id, isImageType }: { id: string; isImageType: boolean }) => {
  const { assetTypeDetailLoading } = useUploaderStore()
  const { getRootProps, getInputProps } = useUploaderDropzone(isImageType)

  useAssetTypeDetailQuery(id)

  return (
    <>
      <div {...getRootProps()} className={styles.fileBox}>
        <input {...getInputProps()} />
        <CloudUploadOutlined className={styles.icon} />
        <Button icon={<PlusOutlined />} color='primary' variant='solid'>
          Add assets
        </Button>
        <dl>
          <dt>Upload images here and we will generate variations for you</dt>
          <dd>
            Supported formats:{' '}
            {assetTypeDetailLoading ? (
              <>...</>
            ) : isImageType ? (
              'JPG and PNG'
            ) : (
              'JPG, PNG and working files (PSD, AI...)'
            )}
          </dd>
        </dl>
      </div>
    </>
  )
}
