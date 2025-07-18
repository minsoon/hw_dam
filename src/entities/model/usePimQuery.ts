import { useMutation } from '@tanstack/react-query'
import { fetchPimProductSearch } from '@/entities/api/pim'

export const usePimProductSearchMutation = () => {
  return useMutation({
    mutationFn: (payload: string) => fetchPimProductSearch(payload),
  })
}
