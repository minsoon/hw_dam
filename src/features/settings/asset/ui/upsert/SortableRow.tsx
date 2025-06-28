import { Button, Input, Select } from 'antd'
import { DeleteOutlined, HolderOutlined } from '@ant-design/icons'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { VariationItem } from '@/features/settings/asset/model/types'
import styles from './upsert.module.scss'

const SortableRow = ({
  item,
  onRemove,
  onChange,
}: {
  item: VariationItem
  onRemove: (id: string) => void
  onChange: (id: string, field: keyof VariationItem, value: string | string[]) => void
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const fileTypeOptions = [
    { value: 'AI', label: 'AI' },
    { value: 'EPS', label: 'EPS' },
    { value: 'PSD', label: 'PSD' },
    { value: 'SVG', label: 'SVG' },
    { value: 'PNG', label: 'PNG' },
    { value: 'JPG', label: 'JPG' },
  ]

  return (
    <tr ref={setNodeRef} style={style}>
      <th>
        <div {...attributes} {...listeners} className={styles.dragHandle}>
          <HolderOutlined />
        </div>
      </th>
      <td>
        <Input value={item.name} placeholder='Name' onChange={e => onChange(item.id, 'name', e.target.value)} />
      </td>
      <td>
        <Select
          mode='multiple'
          value={item.file_type}
          placeholder='Select...'
          options={fileTypeOptions}
          onChange={value => onChange(item.id, 'file_type', value)}
          className={styles.select}
          style={{ width: '100%' }}
        />
      </td>
      <td className={styles.removeButton}>
        <Button icon={<DeleteOutlined style={{ fontSize: 16 }} />} onClick={() => onRemove(item.id)} />
      </td>
    </tr>
  )
}

export default SortableRow
