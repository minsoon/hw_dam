import { AssetPostRequest } from '@/entities/types/Assets'
import { UploadedFile } from '@/shared/types/editCard'

type FileInfo = AssetPostRequest['assetPostInfos'][0]['file_info'][0]

export function updateFilesAndAssets(
  files: UploadedFile[],
  assets: AssetPostRequest['assetPostInfos'],
  key: number | null,
  updateFile: (file: UploadedFile, isTarget: boolean) => Partial<UploadedFile>,
  updateFileInfo: (info: FileInfo, isTarget: boolean) => Partial<FileInfo>
) {
  const targetIndex = files.findIndex(file => file.key === key)

  const updatedFiles = files.map((file, i) => ({
    ...file,
    ...updateFile(file, i === targetIndex),
  }))

  const updatedAssets = assets.map((asset, i) => {
    const isTarget = i === targetIndex

    return {
      ...asset,
      file_info: asset.file_info.map(info => ({
        ...info,
        ...updateFileInfo(info, isTarget),
      })),
    }
  })

  return {
    updatedFiles,
    updatedAssets,
  }
}
