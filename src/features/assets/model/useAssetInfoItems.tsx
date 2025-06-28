'use client'

import React, { useCallback, useRef } from 'react'
import { Button, CollapseProps, Input, InputRef, Tag, message } from 'antd'
import { AppstoreAddOutlined, DownloadOutlined, LinkOutlined, TagOutlined, TeamOutlined } from '@ant-design/icons'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { useAssetDownloadFileMutation } from '@/features/assets/model/useAssetQuery'
import styles from '@/features/assets/ui/detail/assetInfo.module.scss'
import { downloadBlobAsFile } from '@/shared/lib/download'
import { formatFileSize, isImageFile } from '@/shared/lib/fileHelpers'
import useCopyUrl from '@/shared/model/useCopyText'

export const useAssetInfoItems = ({ isVisibleToUser }: { isVisibleToUser: boolean }): CollapseProps['items'] => {
  const { asset, currentImage, setCurrentImage } = useAssetDetailStore()
  const { current_version: currentVersion } = asset || {}
  const { mutate: downloadFile } = useAssetDownloadFileMutation()
  const inputRef = useRef<InputRef>(null)
  const copyUrl = useCopyUrl()

  const handleCopy = async () => {
    if (inputRef.current?.input) {
      copyUrl(inputRef.current.input.value)
    } else {
      message.error('Failed to copy the link.')
    }
  }
  const changeImage = useCallback(
    (file: { file_path: string; file_extension: string }) => {
      setCurrentImage({ file_path: file.file_path, file_extension: file.file_extension })
    },
    [setCurrentImage]
  )
  const handleDownloadFile = useCallback(
    (file: { asset_file_id: number; file_name: string }) => {
      if (!asset?.asset_id || !file.asset_file_id) return
      downloadFile(
        { asset_id: asset.asset_id, file_id: file.asset_file_id },
        {
          onSuccess: data => {
            downloadBlobAsFile(data.data, file.file_name, data.contentType)
          },
        }
      )
    },
    [asset?.asset_id, downloadFile]
  )

  if (!asset || !currentVersion) return []

  return [
    ...(isVisibleToUser
      ? [
          {
            key: '1',
            label: (
              <div className={styles.label}>
                <LinkOutlined />
                Link to file
              </div>
            ),
            children: (
              <Input
                readOnly
                value={asset.share_url_user}
                ref={inputRef}
                className={styles.linkInput}
                suffix={<Button type='text' icon={<LinkOutlined />} onClick={handleCopy} />}
              />
            ),
          },
        ]
      : []),
    ...(asset.files.length > 0
      ? [
          {
            key: '2',
            label: (
              <div className={styles.label}>
                <DownloadOutlined />
                Available downloads
              </div>
            ),
            children: (
              <div className={styles.downloadList}>
                <ul>
                  {asset.files.map(file => (
                    <li
                      key={file.asset_file_id}
                      onClick={() => changeImage(file)}
                      className={currentImage.file_path === file.file_path ? styles.on : ''}
                    >
                      {isImageFile(file.file_extension) ? (
                        <p style={{ backgroundImage: `url(${file.file_path})` }}></p>
                      ) : (
                        <div className={styles.fileIcon}></div>
                      )}
                      <dl>
                        <dt>{file.file_name}</dt>
                        <dd>
                          {file.file_extension && isImageFile(file.file_extension) && (
                            <span>
                              {file.image_width} x {file.image_height}
                            </span>
                          )}
                          <span>{formatFileSize(Number(file.file_size))}</span>
                        </dd>
                      </dl>
                      <Button type='text' icon={<DownloadOutlined />} onClick={() => handleDownloadFile(file)} />
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
        ]
      : []),
    ...(currentVersion && currentVersion.tags && currentVersion.tags.length > 0
      ? [
          {
            key: '3',
            label: (
              <div className={styles.label}>
                <TagOutlined />
                Tags
              </div>
            ),
            children: (
              <div className={styles.tagList}>
                {currentVersion.tags.map(tag => (
                  <Tag key={tag.tag_id}>{tag.tag_name}</Tag>
                ))}
              </div>
            ),
          },
        ]
      : []),
    {
      key: '4',
      label: (
        <div className={styles.label}>
          <AppstoreAddOutlined />
          Product relations
        </div>
      ),
      children: (
        <div className={styles.infoList}>
          <dl>
            <dt>Product segment</dt>
            <dd>
              <div className={styles.tagList}>
                <Tag>test</Tag>
                <Tag>testtesttest</Tag>
                <Tag>test</Tag>
              </div>
            </dd>
          </dl>
          <dl>
            <dt>AI tags</dt>
            <dd>SLA-T4680DSA, SLA-T4680DA</dd>
          </dl>
          <dl>
            <dt>Product series</dt>
            <dd>P series</dd>
          </dl>
        </div>
      ),
    },
    {
      key: '5',
      label: (
        <div className={styles.label}>
          <TeamOutlined />
          Asset contacts
        </div>
      ),
      children: (
        <div className={styles.infoList}>
          <dl>
            <dt>Uploader</dt>
            <dd>
              {currentVersion?.uploader_name}
              <br />
              {currentVersion?.uploader_contact_number}
              <br />
              {currentVersion?.uploader_email}
            </dd>
          </dl>
          <dl>
            <dt>Asset Owner</dt>
            <dd>
              {currentVersion?.owner_name}
              <br />
              {currentVersion?.owner_email}
            </dd>
          </dl>
          <dl>
            <dt>Agency contact</dt>
            <dd>
              {currentVersion?.agency_name}
              <br />
              {currentVersion?.agency_contact_name}
            </dd>
          </dl>
        </div>
      ),
    },
  ].filter(Boolean)
}
