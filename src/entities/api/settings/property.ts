import { apiInstance } from '@/shared/api/axios-instance'
import { PropertyCategoryResponse, PropertyOptionResponse } from '../../types/Properties'

export const fetchCategories = async (keyword: string): Promise<PropertyCategoryResponse[]> => {
  const { data } = await apiInstance.get(`/api/v1/properties/categories?keyword=${keyword}`)
  return data
}

export const fetchCategoriesById = async (id: string): Promise<PropertyCategoryResponse> => {
  const { data } = await apiInstance.get(`/api/v1/properties/categories/${id}`)
  return data
}

export const fetchUpdateCategories = async (
  id: number,
  payload: Partial<PropertyCategoryResponse>
): Promise<PropertyCategoryResponse> => {
  const { data } = await apiInstance.put(`/api/v1/properties/categories/${id}`, payload)
  return data
}

export const fetchDeleteCategories = async (id: number): Promise<void> => {
  await apiInstance.delete(`/api/v1/properties/categories/${id}`)
}

export const fetchOptions = async (id: number, keyword: string): Promise<PropertyOptionResponse[]> => {
  const { data } = await apiInstance.get(`/api/v1/properties/options?keyword=${keyword}&property_category_id=${id}`)
  return data
}

export const fetchCreateOptions = async (payload: Partial<PropertyOptionResponse>): Promise<PropertyOptionResponse> => {
  const { data } = await apiInstance.post('/api/v1/properties/options', payload)
  return data
}

export const fetchOptionsById = async (id: string): Promise<PropertyOptionResponse> => {
  const { data } = await apiInstance.get(`/api/v1/properties/options/${id}`)
  return data
}

export const fetchUpdateOptions = async (
  id: number,
  payload: Partial<PropertyOptionResponse>
): Promise<PropertyOptionResponse> => {
  const { data } = await apiInstance.put(`/api/v1/properties/options/${id}`, payload)
  return data
}

export const fetchDeleteOptions = async (id: number): Promise<void> => {
  await apiInstance.delete(`/api/v1/properties/options/${id}`)
}
