export interface SearchBarProps {
  placeholder?: string
  searchValue?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}
