import { Pagination } from 'antd'
import styles from './pagination.module.scss'

interface PaginationProps {
  currentPage: number | undefined
  totalPages: number | undefined
  pageSize?: number
  onChange: (page: number) => void
}

export const CustomPagination = ({ currentPage, totalPages, pageSize = 10, onChange }: PaginationProps) => {
  if (totalPages && pageSize && totalPages > pageSize) {
    return (
      <Pagination
        className={styles.pagination}
        current={currentPage}
        onChange={onChange}
        total={totalPages}
        pageSize={pageSize}
        showSizeChanger={false}
      />
    )
  }
  return null
}
