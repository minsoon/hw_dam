import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useAssetUpdateStore } from '@/features/assets/model/assetUpdateStore'
import { useUploaderStore } from '@/features/uploader/model/uploaderStore'

export const useUploaderDropzone = (isImageType: boolean) => {
  const { assets, addAssets, files } = useUploaderStore()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      addAssets(acceptedFiles)
    },
    [addAssets]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: isImageType ? { 'image/*': [] } : undefined,
  })

  useEffect(() => {
    return () => {
      setTimeout(() => {
        files.forEach(p => URL.revokeObjectURL(p.url))
      })
    }
  }, [files])

  return {
    getRootProps,
    getInputProps,
    assets,
  }
}

export const useUploaderDropzoneModify = (key?: number) => {
  const { replaceFileByKey } = useAssetUpdateStore()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (key) {
        replaceFileByKey(key, acceptedFiles[0])
      } else {
        replaceFileByKey(null, acceptedFiles[0])
      }
    },
    [replaceFileByKey, key]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  })

  return {
    getRootProps,
    getInputProps,
  }
}

export const useUploaderDropzoneModifyPopup = (key?: number) => {
  const { replaceFileByKey } = useAssetUpdateStore()
  const [fileInfo, setFileInfo] = useState<{ file: File; url: string } | null>(null)
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFileInfo({ file: acceptedFiles[0], url: URL.createObjectURL(acceptedFiles[0]) })
  }, [])
  const onDropFile = useCallback(() => {
    if (!fileInfo) return
    if (key) {
      replaceFileByKey(key, fileInfo.file)
    } else {
      replaceFileByKey(null, fileInfo.file)
    }
  }, [replaceFileByKey, key, fileInfo])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  })

  const deleteFile = useCallback(() => {
    setFileInfo(null)
  }, [])

  return {
    fileInfo,
    deleteFile,
    onDropFile,
    getRootProps,
    getInputProps,
  }
}
