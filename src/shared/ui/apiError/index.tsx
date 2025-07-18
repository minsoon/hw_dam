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
    case '403':
      title = 'Access Denied'
      content = 'You are not authorized to access this resource.'
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
      history.back()
    },
  })

  console.error(`Error: ${type} - ${errorMessage}`)
}
