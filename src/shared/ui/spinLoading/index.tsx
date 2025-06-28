import React from 'react'
import { Spin } from 'antd'

export const SpinLoading = ({ size }: { size?: 'small' | 'default' | 'large' }) => {
  return (
    <div className='loadingOverlay'>
      <Spin size={size || 'large'} />
    </div>
  )
}
