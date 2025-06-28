import { useEffect } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  fetchCategories,
  fetchCategoriesById,
  fetchCreateOptions,
  fetchDeleteCategories,
  fetchDeleteOptions,
  fetchOptions,
  fetchOptionsById,
  fetchUpdateCategories,
  fetchUpdateOptions,
} from '@/entities/api/settings/property'
import { PropertyCategoryResponse, PropertyOptionResponse } from '@/entities/types/Properties'
import { usePropertyStore } from '@/features/settings/property/model/usePropertyStore'

export const useCategoriesQuery = (keyword: string) => {
  const { setItems } = usePropertyStore()
  const query = useQuery<PropertyCategoryResponse[], Error>({
    queryKey: ['Categories', keyword],
    queryFn: () => fetchCategories(keyword),
    staleTime: 1000,
  })

  useEffect(() => {
    const data = query.data || []
    if (data) {
      setItems('categories', data)
    }
  }, [setItems, query.data])

  return query
}

export const useCategoriesByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['CategoriesById', id],
    queryFn: () => fetchCategoriesById(id),
  })
}

export const useUpdateCategoriesMutation = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<PropertyCategoryResponse> }) =>
      fetchUpdateCategories(id, payload),
  })
}

export const useDeleteCategoriesMutation = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeleteCategories(id),
  })
}

export const useOptionsQuery = (id: number, keyword: string) => {
  const { setItems } = usePropertyStore()
  const query = useQuery<PropertyOptionResponse[], Error>({
    queryKey: ['Options', id, keyword],
    queryFn: () => fetchOptions(id, keyword),
    staleTime: 1000,
  })

  useEffect(() => {
    const data = query.data || []
    if (data) {
      setItems('options', data)
    }
  }, [setItems, query.data])

  return query
}

export const useCreateOptionsMutation = () => {
  return useMutation({
    mutationFn: ({ payload }: { payload: Partial<PropertyOptionResponse> }) => fetchCreateOptions(payload),
  })
}

export const useOptionsByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ['OptionsById', id],
    queryFn: () => fetchOptionsById(id),
  })
}

export const useUpdateOptionsMutation = () => {
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: Partial<PropertyOptionResponse> }) =>
      fetchUpdateOptions(id, payload),
  })
}

export const useDeleteOptionsMutation = () => {
  return useMutation({
    mutationFn: ({ id }: { id: number }) => fetchDeleteOptions(id),
  })
}
