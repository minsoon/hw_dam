import { useCallback } from 'react'
import { message } from 'antd'

const useCopyUrl = () => {
  const copyUrl = useCallback(async (url: string) => {
    try {
      await navigator.clipboard.writeText(url)
      message.success('Link copied successfully.')
    } catch (err) {
      console.error(err)
      message.error('Failed to copy the link.')
    }
  }, [])

  return copyUrl
}

export default useCopyUrl
