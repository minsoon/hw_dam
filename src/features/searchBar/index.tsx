import { useEffect, useState } from 'react'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { SearchBarProps } from './types'

export const SearchBar = ({ placeholder, onChange, searchValue }: SearchBarProps) => {
  const [value, setValue] = useState(searchValue || '')

  useEffect(() => {
    setValue(searchValue || '')
  }, [searchValue])

  return (
    <>
      <Input
        value={value}
        placeholder={placeholder}
        style={{ width: '280px' }}
        prefix={<SearchOutlined style={{ fontSize: '18px', color: '#5C5C5C' }} />}
        onChange={e => setValue(e.target.value)}
        onPressEnter={event => {
          if (event.key === 'Enter' && onChange) {
            onChange(event as unknown as React.ChangeEvent<HTMLInputElement>)
          }
        }}
      />
    </>
  )
}
