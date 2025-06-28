import { useState } from 'react'
import { Button, Checkbox, Dropdown, Input } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import styles from './searchChecked.module.scss'

export const SearchChecked = ({
  title,
  options,
  onChange,
  value = [],
}: {
  title: string
  options: { key: number; value: string }[]
  onChange: (key: string) => (value: string[]) => void
  value?: string[]
}) => {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const filteredTags = options.filter(tag => tag.value.toLowerCase().includes(search.toLowerCase()))
  const content = (
    <div className={styles.checkboxContainer}>
      <Input placeholder='Search for tag' value={search} onChange={e => setSearch(e.target.value)} />
      <Checkbox.Group value={value} onChange={onChange(title)} className={styles.checkboxGroup}>
        {filteredTags.map(opt => (
          <Checkbox key={opt.key} value={opt.key}>
            {opt.value}
          </Checkbox>
        ))}
      </Checkbox.Group>
    </div>
  )

  return (
    <Dropdown
      dropdownRender={() => content}
      trigger={['click']}
      placement='bottomLeft'
      open={open}
      onOpenChange={setOpen}
    >
      <Button>
        {title} <DownOutlined className={`${styles.icon} ${open ? styles.rotate : ''}`} />
      </Button>
    </Dropdown>
  )
}
