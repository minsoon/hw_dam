'use client'

import { useCallback, useEffect } from 'react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import { Button } from 'antd'
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import { useSettingAssetStore } from '@/features/settings/asset/model/useAssetStore'
import { formatFileSize } from '@/shared/lib/fileHelpers'
import styles from './upsert.module.scss'

const AssetTypeIcon = () => {
  const { detail, file, setFile } = useSettingAssetStore()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const fileWithUrl = {
        file: acceptedFiles[0],
        url: URL.createObjectURL(acceptedFiles[0]),
        size: formatFileSize(acceptedFiles[0].size),
        name: acceptedFiles[0].name,
      }
      setFile(fileWithUrl)
    },
    [setFile]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: { 'image/*': [] },
  })

  const handleDelete = useCallback(() => {
    if (file?.url) {
      URL.revokeObjectURL(file.url)
    }
    setFile(null)
  }, [file, setFile])

  useEffect(() => {
    if (detail?.icon_path) {
      setFile({
        file: null,
        name: detail.icon_name || '',
        url: detail.icon_path,
        size: formatFileSize(Number(detail.icon_file_size)),
      })
    }
  }, [detail, setFile])

  useEffect(() => {
    return () => {
      if (file?.url) {
        URL.revokeObjectURL(file.url)
        setFile(null)
      }
    }
  }, [file?.url, setFile])

  return (
    <>
      <div className={styles.title}>Asset type icon</div>
      <div className={styles.assetTypeIcon}>
        <dl>
          <dt>Upload icon here</dt>
          <dd>
            {file ? (
              <div className={styles.uploadIcon} {...getRootProps()}>
                <div className={styles.iconInfo}>
                  <Image src={file.url} alt='icon' width={40} height={40} />
                  <div className={styles.iconInfoText}>
                    <p>{file.file?.name || file.name}</p>
                    <span>{file.size}</span>
                  </div>
                </div>
                <Button
                  icon={<DeleteOutlined style={{ fontSize: 18 }} />}
                  color='default'
                  variant='text'
                  onClick={handleDelete}
                />
              </div>
            ) : (
              <div className={styles.uploadButton} {...getRootProps()}>
                <p>No file attached</p>
                <div>
                  <input {...getInputProps()} />
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </div>
              </div>
            )}
          </dd>
        </dl>
        <p className={styles.uploadLimit}>Upload images up to 100MB</p>
      </div>
    </>
  )
}

export default AssetTypeIcon
