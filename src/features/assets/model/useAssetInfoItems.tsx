'use client'

import React, { useCallback, useRef } from 'react'
import { Button, CollapseProps, Image, Input, InputRef, Tag, message } from 'antd'
import { AppstoreAddOutlined, DownloadOutlined, LinkOutlined, TagOutlined, TeamOutlined } from '@ant-design/icons'
import { useAssetDetailStore } from '@/features/assets/model/assetDetailStore'
import { useAssetDownloadFileMutation } from '@/features/assets/model/useAssetQuery'
import { downloadBlobAsFile } from '@/shared/lib/download'
import { formatFileSize, isImageFile } from '@/shared/lib/fileHelpers'
import useCopyUrl from '@/shared/model/useCopyText'
import styles from '../ui/detail/assetInfo.module.scss'

export const useAssetInfoItems = ({ isVisibleToUser }: { isVisibleToUser: boolean }): CollapseProps['items'] => {
  const { asset, currentImage, setCurrentImage } = useAssetDetailStore()
  const { current_version: currentVersion } = asset || {}
  const { mutate: downloadFile } = useAssetDownloadFileMutation()
  const inputRef = useRef<InputRef>(null)
  const copyUrl = useCopyUrl()
  // const isDownloadable = asset && (!('access_type' in asset) || asset?.access_type === 'D')

  const productSeries = currentVersion?.properties?.find(property => property.category_name === 'Product Series')

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
    ...(isVisibleToUser && currentVersion?.is_confidential === 0
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
                value={asset.share_url_user || ''}
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
                        <div className={styles.image}>
                          <Image src={file.file_path} alt={file.file_name || 'thumbnail'} preview={false} />
                        </div>
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
                      {/* {isDownloadable && ( */}
                      <Button type='text' icon={<DownloadOutlined />} onClick={() => handleDownloadFile(file)} />
                      {/* )} */}
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
        ]
      : []),
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
          {currentVersion.tags && currentVersion.tags.length > 0
            ? currentVersion.tags
                ?.flatMap(tag => tag.child_tags || [])
                .map(tag => <Tag key={tag.tag_id}>{tag.tag_name}</Tag>)
            : '-'}
        </div>
      ),
    },
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
                {currentVersion?.product_segments && currentVersion?.product_segments?.length > 0
                  ? currentVersion?.product_segments?.map(segment => (
                      <Tag key={segment.product_segment_id}>{segment.spec_name}</Tag>
                    ))
                  : '-'}
              </div>
            </dd>
          </dl>
          <dl>
            <dt>Product models</dt>
            <dd>
              {currentVersion?.product_models
                ?.map((model: { product_model: string }) => model.product_model)
                .join(', ') || '-'}
            </dd>
          </dl>
          <dl>
            <dt>Product series</dt>
            <dd>{productSeries ? productSeries.options.map(option => option.option_name).join(', ') : '-'}</dd>
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
              {currentVersion?.uploader_name ||
              currentVersion?.uploader_contact_number ||
              currentVersion?.uploader_email ? (
                <>
                  {currentVersion?.uploader_name}
                  <br />
                  {currentVersion?.uploader_contact_number}
                  <br />
                  {currentVersion?.uploader_email}
                </>
              ) : (
                '-'
              )}
            </dd>
          </dl>
          <dl>
            <dt>Asset Owner</dt>
            <dd>
              {currentVersion?.owner_name || currentVersion?.owner_email ? (
                <>
                  {currentVersion?.owner_name}
                  <br />
                  {currentVersion?.owner_email}
                </>
              ) : (
                '-'
              )}
            </dd>
          </dl>
          <dl>
            <dt>Agency contact</dt>
            <dd>
              {currentVersion?.agency_name || currentVersion?.agency_contact_name ? (
                <>
                  {currentVersion?.agency_name}
                  <br />
                  {currentVersion?.agency_contact_name}
                </>
              ) : (
                '-'
              )}
            </dd>
          </dl>
        </div>
      ),
    },
  ].filter(Boolean)
}
