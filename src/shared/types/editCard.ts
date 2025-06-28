export interface UploadedFile {
  key: number
  file: File
  url: string
  isImage: boolean
  is_thumbnail: number
  variation_id: number | null
  asset_file_id: number
}
