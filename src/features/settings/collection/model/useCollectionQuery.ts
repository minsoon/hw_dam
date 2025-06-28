import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  fetchCollectionTagById,
  fetchCollectionTags,
  fetchCreateCollectionTag,
  fetchDeleteCollectionTag,
  fetchUpdateCollectionTag,
} from '@/entities/api/settings/collectionTags'
import { CollectionTagResponse, PaginatedResponse } from '@/entities/types/CollectionTags'
import { useSettingCollectionStore } from '@/features/settings/collection/model/useCollectionStore'

export const useCollectionTagsQuery = (page: number, keyword: string, limit = 10) => {
  const { setPagination, setItems } = useSettingCollectionStore()
  const query = useQuery<PaginatedResponse, Error>({
    queryKey: ['collectionTags', page, keyword],
    queryFn: () => fetchCollectionTags(page, keyword, limit),
    staleTime: 1000,
  })
  const { pagination, data } = query.data || {}

  useEffect(() => {
    if (pagination) {
      setPagination(pagination)
    }
    if (data) {
      setItems(data)
    }
  }, [setPagination, pagination, setItems, data])

  return query
}

export const useCollectionTagByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['collectionTag', id],
    queryFn: () => fetchCollectionTagById(id),
  })
}

export const useCreateCollectionTagMutation = () => {
  return useMutation({
    mutationFn: fetchCreateCollectionTag,
  })
}

export const useUpdateCollectionTagMutation = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<CollectionTagResponse> }) =>
      fetchUpdateCollectionTag(id, payload),
  })
}

export const useDeleteCollectionTagMutation = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeleteCollectionTag(id),
  })
}
