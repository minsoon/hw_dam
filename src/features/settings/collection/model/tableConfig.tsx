import { Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { CollectionTagResponse } from '@/entities/types/CollectionTags'
import { formatDateTime } from '@/shared/lib/formatDate'

export const tableConfig = (
  onEdit: (record: CollectionTagResponse) => void,
  onDelete: (record: CollectionTagResponse) => void
): {
  columns: ColumnsType<CollectionTagResponse>
} => ({
  columns: [
    {
      title: 'Tag name',
      dataIndex: 'tag_name',
      sorter: (a: CollectionTagResponse, b: CollectionTagResponse) => a.tag_name.localeCompare(b.tag_name),
    },
    {
      title: 'Created by',
      dataIndex: 'created_by',
    },
    {
      title: 'Used',
      dataIndex: 'used_count',
    },
    {
      title: 'Date created',
      dataIndex: 'created_at',
      render: (value: string) => formatDateTime(value),
    },
    {
      title: '',
      key: 'action',
      width: 80,
      align: 'right',
      render: (_: CollectionTagResponse, record: CollectionTagResponse) => (
        <div style={{ display: 'flex' }}>
          <Button type='text' icon={<EditOutlined style={{ fontSize: 18 }} />} onClick={() => onEdit(record)} />
          <Button type='text' icon={<DeleteOutlined style={{ fontSize: 18 }} />} onClick={() => onDelete(record)} />
        </div>
      ),
    },
  ],
})
