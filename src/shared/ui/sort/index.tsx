import React from 'react'
import { Select } from 'antd'
import { SwapOutlined } from '@ant-design/icons'
import styles from './sort.module.scss'

export type SortValue = 'newest' | 'oldest' | 'a-z' | 'z-a'

export const Sort = ({ onChange }: { onChange: (value: SortValue) => void }) => {
  const options = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'a-z', label: 'Alphabetical (A - Z)' },
    { value: 'z-a', label: 'Alphabetical (Z - A)' },
  ]
  return (
    <Select
      title='sort'
      defaultValue='newest'
      className={styles.sort}
      suffixIcon={<SwapOutlined />}
      options={options}
      optionLabelProp='label'
      onChange={onChange}
    />
  )
}
