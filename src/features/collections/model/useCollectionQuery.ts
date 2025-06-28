import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  fetchCollectionByHash,
  fetchCollectionById,
  fetchCollectionDownload,
  fetchCollections,
  fetchCopyCollection,
  fetchCreateCollection,
  fetchDeleteCollection,
  fetchDeleteCollectionAsset,
  fetchUpdateCollection,
} from '@/entities/api/collections'
import { fetchCollectionTags } from '@/entities/api/settings/collectionTags'
import { PaginatedResponse } from '@/entities/types/CollectionTags'
import {
  CollectionAssetListDataResponse,
  CollectionPostRequest,
  CollectionPutRequest,
  CollectionsListResponse,
  CollectionsSearchRequest,
} from '@/entities/types/Collections'
import { useCollectionStore } from './collectionStore'
import { CollectionDetailHashParams, CollectionDetailParams } from './types'

export const useCollectionQuery = (payload: CollectionsSearchRequest, options?: { enabled?: boolean }) => {
  const { setCollections } = useCollectionStore()
  const query = useQuery<CollectionsListResponse, Error>({
    queryKey: ['collections', payload],
    queryFn: () => fetchCollections(payload),
    staleTime: 1000,
    ...options,
  })
  useEffect(() => {
    if (query.data) {
      setCollections(query.data)
    }
  }, [setCollections, query.data])

  return query
}

export const useCreateCollectionMutation = () => {
  const query = useMutation({
    mutationFn: (payload: CollectionPostRequest) => fetchCreateCollection(payload),
  })
  return query
}

export const useCollectionTagsQuery = (limit = 99999) => {
  const { setCollectionTags } = useCollectionStore()
  const query = useQuery<PaginatedResponse, Error>({
    queryKey: ['collectionTags'],
    queryFn: () => fetchCollectionTags(1, '', limit),
    staleTime: 1000 * 60 * 60,
  })

  useEffect(() => {
    if (query.data) {
      setCollectionTags(query.data.data)
    }
  }, [setCollectionTags, query.data])

  return query
}

export const useCollectionDetailQuery = (payload: CollectionDetailParams, options?: { enabled?: boolean }) => {
  const { setCollectionDetail } = useCollectionStore()
  const query = useQuery<CollectionAssetListDataResponse, Error>({
    queryKey: ['collectionDetail', payload],
    queryFn: () => fetchCollectionById(payload),
    ...options,
  })

  useEffect(() => {
    if (query.data) {
      setCollectionDetail(query.data)
    }
  }, [setCollectionDetail, query.data])

  return query
}

export const useCollectionDetailByHashQuery = (
  payload: CollectionDetailHashParams,
  options?: { enabled?: boolean }
) => {
  const { setCollectionDetail } = useCollectionStore()
  const query = useQuery<CollectionAssetListDataResponse, Error>({
    queryKey: ['collectionDetailByHash', payload],
    queryFn: () => fetchCollectionByHash(payload),
    ...options,
  })

  useEffect(() => {
    if (query.data) {
      setCollectionDetail(query.data)
    }
  }, [setCollectionDetail, query.data])

  return query
}

export const useUpdateCollectionMutation = () => {
  const query = useMutation({
    mutationFn: ({ collection_id, payload }: { collection_id: number; payload: CollectionPutRequest }) =>
      fetchUpdateCollection(collection_id, payload),
  })
  return query
}

export const useCopyCollectionMutation = () => {
  const query = useMutation({
    mutationFn: ({ collection_id, payload }: { collection_id: number; payload: CollectionPostRequest }) =>
      fetchCopyCollection(collection_id, payload),
  })
  return query
}

export const useCollectionDownloadMutation = () => {
  const query = useMutation({
    mutationFn: (payload: { collection_id: number; is_with_working: boolean }) => fetchCollectionDownload(payload),
  })
  return query
}

export const useDeleteCollectionMutation = () => {
  const query = useMutation({
    mutationFn: (collection_ids: string) => fetchDeleteCollection(collection_ids),
  })
  return query
}

export const useDeleteCollectionAssetMutation = () => {
  const query = useMutation({
    mutationFn: (payload: { collection_id: number; asset_ids: string }) =>
      fetchDeleteCollectionAsset(payload.collection_id, payload.asset_ids),
  })
  return query
}
