import { useEffect } from 'react'
import { UseQueryOptions, useMutation, useQuery } from '@tanstack/react-query'
import { fetchAssetVersionDownload } from '@/entities/api/assets'
import {
  fetchAllDeletedAssets,
  fetchAllDeletedCollections,
  fetchAllDeletedFiles,
  fetchAllDeletedVersions,
  fetchAssets,
  fetchCollections,
  fetchDeletedAsset,
  fetchDeletedCollection,
  fetchDeletedFile,
  fetchDeletedVersion,
  fetchFiles,
  fetchVersions,
} from '@/entities/api/settings/deleted'
import {
  DeletedAssetListDataResponse,
  DeletedCollectionListDataResponse,
  DeletedFileListDataResponse,
  DeletedVersionListDataResponse,
} from '@/entities/types/Deleted'
import { useSettingDeleteStore } from './settingDeleteStore'
import { DeletedRequest } from './types'

export const useAssetsQuery = (
  payload: DeletedRequest,
  options?: UseQueryOptions<DeletedAssetListDataResponse, Error>
) => {
  const { setData, setParams, params } = useSettingDeleteStore()
  const query = useQuery<DeletedAssetListDataResponse, Error>({
    queryKey: ['deletedAssets', payload],
    queryFn: () => fetchAssets(payload),
    ...options,
  })
  useEffect(() => {
    if (query.data) {
      setData({ assets: query.data })
      setParams({ page: String(query.data.pagination.currentPage), keyword: params.keyword, limit: params.limit })
    }
  }, [query.data, setData, setParams, params.keyword, params.limit])
  return query
}

export const useCollectionQuery = (
  payload: DeletedRequest,
  options?: UseQueryOptions<DeletedCollectionListDataResponse, Error>
) => {
  const { setData, setParams, params } = useSettingDeleteStore()
  const query = useQuery<DeletedCollectionListDataResponse, Error>({
    queryKey: ['deletedCollections', payload],
    queryFn: () => fetchCollections(payload),
    ...options,
  })
  useEffect(() => {
    if (query.data) {
      setData({ collections: query.data })
      setParams({ page: String(query.data.pagination.currentPage), keyword: params.keyword, limit: params.limit })
    }
  }, [query.data, setData, setParams, params.keyword, params.limit])
  return query
}

export const useFilesQuery = (
  payload: DeletedRequest,
  options?: UseQueryOptions<DeletedFileListDataResponse, Error>
) => {
  const { setData, setParams, params } = useSettingDeleteStore()
  const query = useQuery<DeletedFileListDataResponse, Error>({
    queryKey: ['deletedFiles', payload],
    queryFn: () => fetchFiles(payload),
    ...options,
  })

  useEffect(() => {
    if (query.data) {
      setData({ files: query.data })
      setParams({ page: String(query.data.pagination.currentPage), keyword: params.keyword, limit: params.limit })
    }
  }, [query.data, setData, setParams, params.keyword, params.limit])
  return query
}

export const useVersionsQuery = (
  payload: DeletedRequest,
  options?: UseQueryOptions<DeletedVersionListDataResponse, Error>
) => {
  const { setData, setParams, params } = useSettingDeleteStore()
  const query = useQuery<DeletedVersionListDataResponse, Error>({
    queryKey: ['deletedVersions', payload],
    queryFn: () => fetchVersions(payload),
    ...options,
  })
  useEffect(() => {
    if (query.data) {
      setData({ versions: query.data })
      setParams({ page: String(query.data.pagination.currentPage), keyword: params.keyword, limit: params.limit })
    }
  }, [query.data, setData, setParams, params.keyword, params.limit])
  return query
}

export const useDeletedAssetMutation = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeletedAsset(id),
  })
}

export const useDeletedCollectionMutation = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeletedCollection(id),
  })
}

export const useDeletedFileMutation = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeletedFile(id),
  })
}

export const useDeletedVersionMutation = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeletedVersion(id),
  })
}

export const useDeletedAllAssetsMutation = () => {
  return useMutation({
    mutationFn: () => fetchAllDeletedAssets(),
  })
}

export const useDeletedAllCollectionsMutation = () => {
  return useMutation({
    mutationFn: () => fetchAllDeletedCollections(),
  })
}

export const useDeletedAllFilesMutation = () => {
  return useMutation({
    mutationFn: () => fetchAllDeletedFiles(),
  })
}

export const useDeletedAllVersionsMutation = () => {
  return useMutation({
    mutationFn: () => fetchAllDeletedVersions(),
  })
}

export const useAssetVersionDownloadMutation = () => {
  return useMutation({
    mutationFn: (payload: { asset_id: number; asset_version_id: number }) => fetchAssetVersionDownload(payload),
  })
}
