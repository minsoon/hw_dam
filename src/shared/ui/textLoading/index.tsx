import React from 'react'

export const TextLoading = ({ isDark }: { isDark?: boolean }) => {
  return <div className={`textLoading ${isDark ? 'darkText' : ''}`}></div>
}
