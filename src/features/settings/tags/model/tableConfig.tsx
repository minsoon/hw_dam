import { Button } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import type { TagResponse } from '@/entities/types/Tags'
import { formatDateTime } from '@/shared/lib/formatDate'

export const categoryTableConfig = (
  onEdit: (record: TagResponse) => void,
  onDetail: (record: TagResponse) => void
): {
  columns: ColumnsType<TagResponse>
} => ({
  columns: [
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a: TagResponse, b: TagResponse) => a.category.localeCompare(b.category),
      render: (text: string, record: TagResponse) => <a onClick={() => onDetail(record)}>{text || '-'}</a>,
    },
    {
      title: 'Created by',
      dataIndex: 'created_by',
    },
    {
      title: 'Tags',
      dataIndex: 'tags_count',
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
      render: (_: TagResponse, record: TagResponse) => (
        <div style={{ display: 'flex' }}>
          <Button type='text' icon={<EditOutlined style={{ fontSize: 18 }} />} onClick={() => onEdit(record)} />
        </div>
      ),
    },
  ],
})

export const tagDetailTableConfig = (
  onEdit: (record: TagResponse) => void,
  onDelete: (record: TagResponse) => void
): {
  columns: ColumnsType<TagResponse>
} => ({
  columns: [
    {
      title: 'Tag name',
      dataIndex: 'tag_name',
      sorter: (a: TagResponse, b: TagResponse) => a.tag_name.localeCompare(b.tag_name),
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
      render: (_: TagResponse, record: TagResponse) => (
        <div style={{ display: 'flex' }}>
          <Button type='text' icon={<EditOutlined style={{ fontSize: 18 }} />} onClick={() => onEdit(record)} />
          <Button type='text' icon={<DeleteOutlined style={{ fontSize: 18 }} />} onClick={() => onDelete(record)} />
        </div>
      ),
    },
  ],
})
