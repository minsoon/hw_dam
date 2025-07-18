import { Button, Checkbox, Input, Select } from 'antd'
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
  onChange: (id: string, field: keyof VariationItem, value: string | string[] | number) => void
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const fileTypeOptions = [
    { value: 'AI', label: 'AI' },
    { value: 'DOC', label: 'DOC' },
    { value: 'DOCX', label: 'DOCX' },
    { value: 'DOTX', label: 'DOTX' },
    { value: 'EPS', label: 'EPS' },
    { value: 'GIF', label: 'GIF' },
    { value: 'PNG', label: 'PNG' },
    { value: 'JPG', label: 'JPG' },
    { value: 'JPEG', label: 'JPEG' },
    { value: 'INDD', label: 'INDD' },
    { value: 'MOV', label: 'MOV' },
    { value: 'MP4', label: 'MP4' },
    { value: 'MP3', label: 'MP3' },
    { value: 'PDF', label: 'PDF' },
    { value: 'WEBP', label: 'WEBP' },
    { value: 'PSD', label: 'PSD' },
    { value: 'STP(3D)', label: 'STP (3D)' },
    { value: 'PPTX', label: 'PPTX' },
    { value: 'EXCEL', label: 'EXCEL' },
    { value: 'ZIP', label: 'ZIP' },
    { value: 'DWG', label: 'DWG' },
    { value: 'DXF', label: 'DXF' },
    { value: 'RFA', label: 'RFA' },
  ]
  return (
    <tr ref={setNodeRef} style={style}>
      <th>
        <div {...attributes} {...listeners} className={styles.dragHandle}>
          <HolderOutlined />
        </div>
      </th>
      <td>
        <Checkbox
          checked={item.is_working_file === 1}
          onChange={e => onChange(item.id, 'is_working_file', e.target.checked ? 1 : 0)}
        />
      </td>
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
