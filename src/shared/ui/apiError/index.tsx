import { Modal } from 'antd'

export const handleApiError = (errorMessage: string, type: string) => {
  let title, content
  switch (type) {
    case '401':
      title = 'Authentication Error'
      content = 'Your session has expired. Please log in again to continue.'
      break
    case '500':
      title = 'Server Error'
      content = 'An unexpected error occurred. Please try again later or contact support if the problem persists.'
      break
    default:
      title = 'Unknown Error'
      content = 'An unexpected error occurred. Please try again later.'
      break
  }

  Modal.error({
    title,
    content,
    onOk() {
      // TODO: 로그인 페이지로 이동 추가 필요
      history.back()
    },
  })

  console.error(`Error: ${type} - ${errorMessage}`)
}
