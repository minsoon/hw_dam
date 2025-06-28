import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  fetchCreateTags,
  fetchDeleteTags,
  fetchTags,
  fetchTagsDetailById,
  fetchUpdateTags,
} from '@/entities/api/settings/tags'
import { PaginatedTagResponse, TagInsertRequest, TagResponse, TagUpdateRequest } from '@/entities/types/Tags'
import { useTagsStore } from '@/features/settings/tags/model/useTagsStore'

export const useTagsQuery = (page: number, keyword: string) => {
  const { setItems } = useTagsStore()
  const query = useQuery<PaginatedTagResponse, Error>({
    queryKey: ['tags', page, keyword],
    queryFn: () => fetchTags(page, keyword),
    staleTime: 1000,
  })

  useEffect(() => {
    const { data, pagination } = query.data || { data: [], pagination: undefined }
    if (data && pagination) {
      setItems('tags', { data, pagination })
    }
  }, [query.data, setItems])

  return query
}

export const useUpdateTagsQuery = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<TagUpdateRequest> }) => fetchUpdateTags(id, payload),
  })
}

export const useTagsDetailQuery = (id: number, keyword: string) => {
  const { setItems } = useTagsStore()
  const query = useQuery<TagResponse[], Error>({
    queryKey: ['tagsDetail', id, keyword],
    queryFn: () => fetchTagsDetailById(id, keyword),
    staleTime: 1000,
  })

  useEffect(() => {
    if (query.data) {
      setItems('detail', { data: query.data })
    }
  }, [query.data, setItems])

  return query
}

export const useCreateTagsQuery = () => {
  return useMutation({
    mutationFn: (payload: Partial<TagInsertRequest>) => fetchCreateTags(payload),
  })
}

export const useDeleteTagsQuery = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeleteTags(id),
  })
}
