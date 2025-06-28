import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMain } from '@/entities/api/home'
import { MainResponse } from '@/entities/types/Main'
import { useHomeStore } from './homeStore'

export const useHomeQuery = () => {
  const { setHome } = useHomeStore()
  const query = useQuery<MainResponse, Error>({
    queryKey: ['home'],
    queryFn: () => fetchMain(),
    staleTime: 1000,
  })
  useEffect(() => {
    if (query.data) {
      setHome(query.data)
    }
  }, [setHome, query.data])
  return query
}
