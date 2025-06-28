'use client'

import Uploader from '@/features/uploader/ui/fileUploader'

const UploaderWidget = ({ id }: { id: string }) => {
  return (
    <>
      <Uploader id={id} />
    </>
  )
}

export default UploaderWidget
