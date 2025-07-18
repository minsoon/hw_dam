import { AssetDetailResponse, AssetListDataResponse } from '@/entities/types/Assets'
import { CollectionAssetListDataResponse, CollectionListDataResponse } from '@/entities/types/Collections'
import { MainAssetsList, MainCollectionsList } from '@/entities/types/Main'
import { ModalAddToCollection } from './addToCollection'
import { ModalAddedTags } from './addedTags'
import { ModalCreateNewVersion } from './createNewVersion'
import { ModalDeleteAsset } from './deleteAsset'
import { ModalDeleteAssetVersion } from './deleteAssetVersion'
import { ModalDeleteCollection } from './deleteCollection'
import { ModalDeleteSelected } from './deleteSelected'
import { ModalDownload } from './download'
import { ModalDuplicateCollection } from './duplicateCollection'
import { ModalEditCollection } from './editCollection'
import { ModalFilters } from './filters'
import { ModalHideAsset } from './hideAsset'
import { ModalOverrideCurrentVersion } from './overrideCurrentVersion'
import { ModalRemoveAsset } from './removeAsset'
import { ModalShare } from './share'
import { ModalUploadSuccess } from './uploadSuccess'
import { ModalUploaderLoading } from './uploaderLoding'

export enum ModalType {
  NONE = 'none',
  FAVOURITE = 'favourite',
  EDIT_ASSET = 'editAsset',
  ADD_TO_COLLECTION = 'addToCollection',
  SHARE = 'share',
  DOWNLOAD = 'download',
  REMOVE_ASSET = 'removeAsset',
  DELETE_SELECTED = 'deleteSelected',
  EDIT_COLLECTION = 'editCollection',
  DUPLICATE_COLLECTION = 'duplicateCollection',
  SHARE_COLLECTION = 'shareCollection',
  DELETE_COLLECTION = 'deleteCollection',
  HIDE_ASSET = 'hideAsset',
  DELETE_ASSET = 'deleteAsset',
  ASSET_FILTERS = 'assetFilters',
  EMERGENCY_OVERRIDE = 'emergencyOverride',
  CREATE_NEW_VERSION = 'createNewVersion',
  OVERRIDE_CURRENT_VERSION = 'overrideCurrentVersion',
  UPLOAD_SUCCESS = 'uploadSuccess',
  DELETE_ASSET_VERSION = 'deleteAssetVersion',
  ADDED_TAGS = 'addedTags',
  UPLOADER_LOADING = 'uploaderLoading',
}

interface ModalProps {
  title?: string
  collectionId?: number
  description?: string
  assetIds?: number | number[]
  collection?: CollectionListDataResponse | CollectionAssetListDataResponse | MainCollectionsList
  collectionIds?: number[] | number
  item?:
    | AssetListDataResponse
    | CollectionListDataResponse
    | CollectionAssetListDataResponse
    | AssetDetailResponse
    | MainAssetsList
  downloadType?: 'asset' | 'collection'
  isEdit?: boolean
  isEmergencyOverride?: boolean
  isWorkingFile?: number
  refetch?: () => void
  type: ModalType
  isOpen: boolean
  isBack?: boolean
  onClose: () => void
}

export const Modal = (props: ModalProps) => {
  const { type, isOpen, onClose } = props

  switch (type) {
    case ModalType.ADD_TO_COLLECTION:
      return (
        <ModalAddToCollection isOpen={isOpen} refetch={props.refetch!} assetId={props.assetIds!} onClose={onClose} />
      )
    case ModalType.SHARE:
      return (
        <ModalShare
          title={props.title!}
          isOpen={isOpen}
          shareItem={props.item! || props.collection!}
          onClose={onClose}
        />
      )
    case ModalType.REMOVE_ASSET:
      return (
        <ModalRemoveAsset
          isOpen={isOpen}
          onClose={onClose}
          refetch={props.refetch!}
          collectionId={props.collectionId!}
          assetIds={props.assetIds!}
        />
      )
    case ModalType.DOWNLOAD:
      return (
        <ModalDownload
          isOpen={isOpen}
          onClose={onClose}
          assetIds={props.assetIds!}
          collectionId={props.collectionId!}
          downloadType={props.downloadType!}
          isWorkingFile={props.isWorkingFile || 0}
        />
      )
    case ModalType.DELETE_SELECTED:
      return (
        <ModalDeleteSelected isOpen={isOpen} onClose={onClose} refetch={props.refetch!} assetIds={props.assetIds!} />
      )
    case ModalType.EDIT_COLLECTION:
      return (
        <ModalEditCollection
          isOpen={isOpen}
          collection={props.collection!}
          refetch={props.refetch!}
          onClose={onClose}
        />
      )
    case ModalType.DUPLICATE_COLLECTION:
      return (
        <ModalDuplicateCollection
          isOpen={isOpen}
          collection={props.collection!}
          isEdit={props.isEdit!}
          refetch={props.refetch!}
          onClose={onClose}
        />
      )
    case ModalType.DELETE_COLLECTION:
      return (
        <ModalDeleteCollection
          isOpen={isOpen}
          collectionIds={props.collectionIds!}
          refetch={props.refetch!}
          onClose={onClose}
          isBack={props.isBack}
        />
      )
    case ModalType.DELETE_ASSET:
      return <ModalDeleteAsset isOpen={isOpen} onClose={onClose} />
    case ModalType.ASSET_FILTERS:
      return <ModalFilters isOpen={isOpen} onClose={onClose} />
    case ModalType.HIDE_ASSET:
      return (
        <ModalHideAsset
          isOpen={isOpen}
          onClose={onClose}
          refetch={props.refetch!}
          asset={props.item as AssetDetailResponse}
        />
      )
    case ModalType.CREATE_NEW_VERSION:
      return <ModalCreateNewVersion isOpen={isOpen} onClose={onClose} />
    case ModalType.OVERRIDE_CURRENT_VERSION:
      return (
        <ModalOverrideCurrentVersion
          isOpen={isOpen}
          onClose={onClose}
          isEmergencyOverride={props.isEmergencyOverride}
        />
      )
    case ModalType.UPLOAD_SUCCESS:
      return <ModalUploadSuccess isOpen={isOpen} onClose={onClose} />
    case ModalType.DELETE_ASSET_VERSION:
      return <ModalDeleteAssetVersion isOpen={isOpen} onClose={onClose} />
    case ModalType.ADDED_TAGS:
      return <ModalAddedTags isOpen={isOpen} onClose={onClose} />
    case ModalType.UPLOADER_LOADING:
      return <ModalUploaderLoading isOpen={isOpen} />
    default:
      return null
  }
}
