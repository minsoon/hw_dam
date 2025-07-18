import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  fetchAssetByHash,
  fetchAssetById,
  fetchAssetDownloadFile,
  fetchAssetRefs,
  fetchAssets,
  fetchAssetsDownload,
  fetchCreateAssetEmergency,
  fetchCreateAssetVersion,
  fetchDeleteAsset,
  fetchHideAsset,
  fetchUpdateAsset,
  fetchUpdateAssetFavorite,
  fetchUpdateAssetInfo,
} from '@/entities/api/assets'
import { fetchCollections, fetchCreateCollectionAsset } from '@/entities/api/collections'
import { fetchCollectionTags } from '@/entities/api/settings/collectionTags'
import {
  AssetDetailResponse,
  AssetFavoriteRequest,
  AssetHiddenRequest,
  AssetListRequest,
  AssetListResponse,
  AssetRefsResponse,
  AssetRequest,
  AssetUpdateInfoResponse,
} from '@/entities/types/Assets'
import { PaginatedResponse } from '@/entities/types/CollectionTags'
import { CollectionAssetPostRequest, CollectionsListResponse } from '@/entities/types/Collections'
import { useAssetDetailStore } from './assetDetailStore'
import { useAssetUpdateStore } from './assetUpdateStore'
import { useAssetStore } from './assetsStore'

// import { useAssetStore } from '@/features/asset/model/assetsStore'

export const useAssetQuery = (payload: AssetListRequest, options?: { enabled?: boolean }) => {
  const { setAssets } = useAssetStore()
  const query = useQuery<AssetListResponse, Error>({
    queryKey: ['assets', payload],
    queryFn: () => fetchAssets(payload),
    staleTime: 10 * 1000,
    ...options,
  })
  useEffect(() => {
    if (query.data) {
      setAssets(query.data)
    }
  }, [setAssets, query.data])

  return query
}

export const useAssetRefsQuery = () => {
  const { setFilterOptions } = useAssetStore()
  const query = useQuery<AssetRefsResponse, Error>({
    queryKey: ['assetRefs'],
    queryFn: () => fetchAssetRefs(),
    staleTime: 10 * 60 * 1000,
  })

  useEffect(() => {
    if (query.data) {
      setFilterOptions(query.data)
    }
  }, [query.data, setFilterOptions])

  return query
}

export const useAssetByIdQuery = (id: number, v?: number | null, options?: { enabled?: boolean }) => {
  const { setAsset } = useAssetDetailStore()
  const query = useQuery<AssetDetailResponse, Error>({
    queryKey: ['assetById', id, v],
    queryFn: () => fetchAssetById(id, v),
    staleTime: 0,
    refetchOnMount: true,
    initialData: undefined,
    ...options,
  })

  useEffect(() => {
    if (query.data && query.isFetched) {
      setAsset(query.data)
    }
  }, [setAsset, query.data, query.isFetched])

  return query
}

export const useAssetByHashQuery = (hash: string, v?: string | null, options?: { enabled?: boolean }) => {
  const { setAsset } = useAssetDetailStore()
  const query = useQuery<AssetDetailResponse, Error>({
    queryKey: ['assetByHash', hash],
    queryFn: () => fetchAssetByHash(hash, v),
    staleTime: 0,
    refetchOnMount: true,
    initialData: undefined,
    ...options,
  })

  useEffect(() => {
    if (query.data && query.isFetched) {
      setAsset(query.data)
    }
  }, [setAsset, query.data, query.isFetched])

  return query
}

export const useUpdateAssetInfoQuery = (id: number) => {
  const { setAsset } = useAssetUpdateStore()
  const query = useQuery<AssetUpdateInfoResponse, Error>({
    queryKey: ['assetUpdateInfo', id],
    queryFn: () => fetchUpdateAssetInfo(id),
    staleTime: 0,
    refetchOnMount: true,
    initialData: undefined,
  })

  useEffect(() => {
    if (query.data) {
      setAsset(query.data)
    }
  }, [setAsset, query.data])

  return query
}

export const useUpdateAssetMutation = (id: number) => {
  return useMutation({
    mutationFn: (payload: AssetRequest) => fetchUpdateAsset(id, payload),
  })
}

export const useCreateAssetVersionMutation = () => {
  return useMutation({
    mutationFn: (payload: { id: number; formData: FormData }) => fetchCreateAssetVersion(payload.id, payload.formData),
  })
}

export const useCreateAssetEmergencyMutation = () => {
  return useMutation({
    mutationFn: (payload: { id: number; formData: FormData }) =>
      fetchCreateAssetEmergency(payload.id, payload.formData),
  })
}

export const useUpdateAssetFavoriteQuery = () => {
  const query = useMutation({
    mutationFn: (payload: AssetFavoriteRequest) => fetchUpdateAssetFavorite(payload),
  })

  return query
}

export const useHideAssetMutation = () => {
  return useMutation({
    mutationFn: (payload: AssetHiddenRequest) => fetchHideAsset(payload),
  })
}

export const useAssetDeleteMutation = () => {
  return useMutation({
    mutationFn: (payload: { asset_ids: string; asset_version_id?: number }) =>
      fetchDeleteAsset(payload.asset_ids, payload.asset_version_id),
  })
}

export const useCollectionTagsQuery = (page = 1, keyword = '', limit = 99999) => {
  const query = useQuery<PaginatedResponse, Error>({
    queryKey: ['collectionTags', page, keyword],
    queryFn: () => fetchCollectionTags(page, keyword, limit),
    staleTime: 10 * 60 * 1000,
  })
  return query
}

export const useCollectionsQuery = (limit = 99999) => {
  const query = useQuery<CollectionsListResponse, Error>({
    queryKey: ['collections', limit],
    queryFn: () => fetchCollections({ page: 1, limit }),
    staleTime: 10 * 1000,
  })
  return query
}

export const useCreateCollectionAssetMutation = () => {
  const query = useMutation({
    mutationFn: (payload: CollectionAssetPostRequest) => fetchCreateCollectionAsset(payload),
  })
  return query
}

export const useAssetsDownloadMutation = () => {
  return useMutation({
    mutationFn: (payload: { asset_ids: string; is_with_working: boolean }) => fetchAssetsDownload(payload),
  })
}

export const useAssetDownloadFileMutation = () => {
  return useMutation({
    mutationFn: (payload: { asset_id: number; file_id: number }) => fetchAssetDownloadFile(payload),
  })
}
