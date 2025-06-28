import { useMutation } from '@tanstack/react-query'
import { fetchCreateShare } from '@/entities/api/share'
import { ShareRequest } from '@/entities/types/Share'

export const useCreateShareMutation = () => {
  return useMutation({
    mutationFn: (payload: ShareRequest) => fetchCreateShare(payload),
  })
}
