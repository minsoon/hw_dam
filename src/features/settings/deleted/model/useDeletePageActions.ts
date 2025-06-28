import { useCallback } from 'react'
import { message } from 'antd'
import { useAssetDownloadFileMutation, useAssetsDownloadMutation } from '@/features/assets/model/useAssetQuery'
import { useCollectionDownloadMutation } from '@/features/collections/model/useCollectionQuery'
import { downloadBlobAsFile } from '@/shared/lib/download'
import { useSettingDeleteStore } from './settingDeleteStore'
import {
  useAssetVersionDownloadMutation,
  useAssetsQuery,
  useCollectionQuery,
  useDeletedAllAssetsMutation,
  useDeletedAllCollectionsMutation,
  useDeletedAllFilesMutation,
  useDeletedAllVersionsMutation,
  useDeletedAssetMutation,
  useDeletedCollectionMutation,
  useDeletedFileMutation,
  useDeletedVersionMutation,
  useFilesQuery,
  useVersionsQuery,
} from './useDeletedQuery'

export const useDeletePageActions = () => {
  const { params } = useSettingDeleteStore()

  const { refetch: refetchAssets } = useAssetsQuery(params, { enabled: false, queryKey: ['deletedAssets'] })
  const { refetch: refetchCollections } = useCollectionQuery(params, {
    enabled: false,
    queryKey: ['deletedCollections'],
  })
  const { refetch: refetchFiles } = useFilesQuery(params, { enabled: false, queryKey: ['deletedFiles'] })
  const { refetch: refetchVersions } = useVersionsQuery(params, { enabled: false, queryKey: ['deletedVersions'] })

  const { mutate: deleteAsset } = useDeletedAssetMutation()
  const { mutate: deleteCollection } = useDeletedCollectionMutation()
  const { mutate: deleteFile } = useDeletedFileMutation()
  const { mutate: deleteVersion } = useDeletedVersionMutation()

  const { mutate: downloadAssets } = useAssetsDownloadMutation()
  const { mutate: downloadCollection } = useCollectionDownloadMutation()
  const { mutate: downloadFile } = useAssetDownloadFileMutation()
  const { mutate: downloadAssetVersion } = useAssetVersionDownloadMutation()

  const { mutate: deleteAllAssets } = useDeletedAllAssetsMutation()
  const { mutate: deleteAllCollections } = useDeletedAllCollectionsMutation()
  const { mutate: deleteAllFiles } = useDeletedAllFilesMutation()
  const { mutate: deleteAllVersions } = useDeletedAllVersionsMutation()

  const handleDelete = useCallback(
    (id: number) => {
      switch (params.tabActiveKey) {
        case 'assets':
          deleteAsset(
            { id },
            {
              onSuccess: () => refetchAssets(),
              onError: () => message.error('Failed to delete asset'),
            }
          )
          break
        case 'versions':
          deleteVersion(
            { id },
            {
              onSuccess: () => refetchVersions(),
              onError: () => message.error('Failed to delete version'),
            }
          )
          break
        case 'collections':
          deleteCollection(
            { id },
            {
              onSuccess: () => refetchCollections(),
              onError: () => message.error('Failed to delete collection'),
            }
          )
          break
        case 'files':
          deleteFile(
            { id },
            {
              onSuccess: () => refetchFiles(),
              onError: () => message.error('Failed to delete file'),
            }
          )
          break
      }
    },
    [
      params.tabActiveKey,
      deleteAsset,
      deleteVersion,
      deleteCollection,
      deleteFile,
      refetchAssets,
      refetchVersions,
      refetchCollections,
      refetchFiles,
    ]
  )

  const handleDownload = useCallback(
    (id: number, file_id?: number) => {
      switch (params.tabActiveKey) {
        case 'assets':
          downloadAssets(
            { asset_ids: id.toString(), is_with_working: false },
            {
              onSuccess: res => downloadBlobAsFile(res.data, res.fileName),
              onError: () => message.error('Failed to download asset'),
            }
          )
          break

        case 'versions':
          downloadAssetVersion(
            { asset_id: id, asset_version_id: file_id! },
            {
              onSuccess: res => downloadBlobAsFile(res.data, res.fileName),
              onError: () => message.error('Failed to download asset version'),
            }
          )
          break
        case 'collections':
          downloadCollection(
            { collection_id: id, is_with_working: false },
            {
              onSuccess: res => downloadBlobAsFile(res.data, res.fileName),
              onError: () => message.error('Failed to download collection'),
            }
          )
          break
        case 'files':
          downloadFile(
            { asset_id: id, file_id: file_id! },
            {
              onSuccess: res => downloadBlobAsFile(res.data, 'test.pdf', res.contentType),
              onError: () => message.error('Failed to download file'),
            }
          )
          break
      }
    },
    [params.tabActiveKey, downloadAssets, downloadCollection, downloadFile, downloadAssetVersion]
  )

  const handleAllDelete = useCallback(() => {
    if (confirm('Are you sure you want to delete all files?')) {
      switch (params.tabActiveKey) {
        case 'assets':
          deleteAllAssets(undefined, {
            onSuccess: () => refetchAssets(),
            onError: () => message.error('Failed to delete all assets'),
          })
          break
        case 'collections':
          deleteAllCollections(undefined, {
            onSuccess: () => refetchCollections(),
            onError: () => message.error('Failed to delete all collections'),
          })
          break
        case 'versions':
          deleteAllVersions(undefined, {
            onSuccess: () => refetchVersions(),
            onError: () => message.error('Failed to delete all versions'),
          })
          break
        case 'files':
          deleteAllFiles(undefined, {
            onSuccess: () => refetchFiles(),
            onError: () => message.error('Failed to delete all files'),
          })
          break
      }
    }
  }, [
    params.tabActiveKey,
    refetchAssets,
    refetchCollections,
    refetchFiles,
    refetchVersions,
    deleteAllAssets,
    deleteAllCollections,
    deleteAllFiles,
    deleteAllVersions,
  ])

  const getRowKey = useCallback(() => {
    switch (params.tabActiveKey) {
      case 'assets':
        return 'asset_id'
      case 'collections':
        return 'collection_id'
      case 'versions':
        return 'asset_version_id'
      case 'files':
        return 'asset_file_id'
    }
  }, [params.tabActiveKey])

  const refetchByTab = useCallback(() => {
    switch (params.tabActiveKey) {
      case 'assets':
        return refetchAssets()
      case 'collections':
        return refetchCollections()
      case 'versions':
        return refetchVersions()
      case 'files':
        return refetchFiles()
    }
  }, [params.tabActiveKey, refetchAssets, refetchCollections, refetchFiles, refetchVersions])

  return {
    handleDelete,
    handleAllDelete,
    handleDownload,
    refetchByTab,
    getRowKey,
  }
}
