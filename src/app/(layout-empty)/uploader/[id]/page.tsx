import UploaderWidget from '@/widgets/uploader/uploader'

const UploaderPage = ({ params }: { params: { id: string } }) => {
  return <UploaderWidget id={params.id} />
}

export default UploaderPage
