export interface MainResponse {
  recentDownloads: MainAssetsList[];
  recentAddedAssets: MainAssetsList[];
  recentUpdatedCollections: MainCollectionsList[];
  masterCollections: MainCollectionsList[];
  assetTypes?: MainAssetTypesList[];
}

export interface MainAssetTypesList {
  /** The auto-generated id of the asset type */
  asset_type_id: number;
  /** The name of the asset type */
  name: string;
  /** The default type of the asset type */
  default_type: string;
  /** Path to the icon file */
  icon_path: string;
  /** Upload instruction */
  upload_instruction: string;
}

export interface MainAssetsList {
  /** 에셋 ID */
  asset_id: number;
  /** 에셋 이름 */
  asset_name: string;
  /** 썸네일 URL */
  thumbnail: string;
  /** 에셋 타입명 */
  asset_type_name: string;
  /** 대표 파일 개수 */
  file_count: number;
  /** 전체 파일 개수 */
  total_file_count: number;
  /** 대표 파일 확장자 요약 */
  file_type_summary: string;
  /** 즐겨찾기 여부 */
  is_favorite: boolean;
  /** 숨김 여부 */
  is_hidden: boolean;
  /** 공유 해시 */
  share_hash: string;
  /** 공유 URL (Anyone) */
  share_url_anyone: string;
  /** 공유 URL (User) */
  share_url_user: string;
}

export interface MainCollectionsList {
  /** 컬렉션 ID */
  collection_id: number;
  /** 컬렉션 이름 */
  name: string;
  /** 컬렉션 설명 */
  description: string;
  /** 마스터 컬렉션 여부 (1: 마스터, 0: 일반) */
  is_master: number;
  /** 조회수 */
  view_count: number;
  /**
   * 생성일
   * @format date-time
   */
  created_at: string;
  /**
   * 수정일
   * @format date-time
   */
  updated_at: string;
  /** 생성자 */
  created_by: string;
  /** 에셋 개수 */
  asset_count: number;
  /** 파일 개수 */
  file_count: number;
  /** 공유 해시 */
  share_hash: string;
  /** 공유 URL (Anyone) */
  share_url_anyone: string;
  /** 공유 URL (User) */
  share_url_user: string;
  /** 컬렉션 태그 목록 */
  tags: {
    /** 태그 ID */
    tag_id: number;
    /** 태그 이름 */
    tag_name: string;
  }[];
  thumbnails?: string[];
}

