export interface CollectionDeleteRequest {
  /** 컬렉션 ID 목록(콤마 구분) */
  collection_ids?: string;
}

export interface CollectionAssetDeleteRequest {
  /** Collection ID */
  collection_id?: number;
  /** Asset IDs(콤마 구분) */
  asset_ids?: string;
}

export interface CollectionAssetsDataResponse {
  /** 에셋 ID */
  asset_id: number;
  /** 에셋 이름 */
  asset_name: string;
  /** 에셋 타입 이름 */
  asset_type_name: string;
  /** 썸네일 이미지 URL */
  thumbnail: string;
  /** 파일 개수 */
  file_count: number;
  /** 전체 파일 개수 */
  total_file_count: number;
  /** 파일 타입 요약 (예: png, jpg +2) */
  file_type_summary: string;
  /** 즐겨찾기 여부 */
  is_favorite: boolean;
  /** 숨김 여부 */
  is_hidden: number;
  /** 공용 공유 URL */
  share_url_anyone: string;
  /** 사용자 공유 URL */
  share_url_user: string;
}

export interface CollectionsSearchRequest {
  /**
   * 페이지 번호
   * @default 1
   */
  page?: number;
  /**
   * 페이지당 항목 수
   * @default 10
   */
  limit?: number;
  /** 검색어 (에셋 이름 기준) */
  keyword?: string;
  /**
   * 정렬 방법 (newest: 최신순, oldest: 오래된순, a-z: 이름 오름차순, z-a: 이름 내림차순)
   * @default "newest"
   */
  sort?: "newest" | "oldest" | "a-z" | "z-a";
  /** 태그 ID 필터 (콤마로 구분, 예: 1,2,3) */
  tag_ids?: string;
  /** 검색 타입 (master: 마스터 컬렉션, my: 내 컬렉션) */
  search_type?: "master" | "my";
}

export interface CollectionAssetListDataResponse {
  /** 컬렉션 ID */
  collection_id: number;
  /** 컬렉션 이름 */
  name: string;
  /** 컬렉션 설명 */
  description: string;
  /** 마스터 여부 */
  is_master: number;
  /** 생성일시 */
  created_at: string;
  /** 생성자 */
  created_by: string;
  /** 수정일시 */
  updated_at: string;
  /** 공유 해시 */
  share_hash: string;
  /** 공유 URL */
  share_url_user: string;
  /** 공용 공유 URL */
  share_url_anyone: string;
  /** 파일 개수 */
  file_count: number;
  /** 조회 수 */
  view_count: number;
  /** 다운로드 수 */
  download_count: number;
  /** 에셋 개수 */
  asset_count: number;
  /** 삭제일시 */
  deleted_at: string;
  /** 삭제자 */
  deleted_by: string;
  tags: {
    /** 태그 ID */
    tag_id: number;
    /** 태그 이름 */
    tag_name: string;
  }[];
  assets: CollectionAssetsDataResponse[];
}

export interface CollectionDataResponse {
  /** 컬렉션 ID */
  collection_id: number;
  /** 컬렉션 이름 */
  name: string;
  /** 컬렉션 설명 */
  description: string;
  /** 마스터 여부 */
  is_master: number;
  /** 생성일시 */
  created_at: string;
  /** 생성자 */
  created_by: string;
  /** 수정일시 */
  updated_at: string;
  /** 공유 해시 */
  share_hash: string;
  /** 공유 URL */
  share_url_user: string;
  /** 공용 공유 URL */
  share_url_anyone: string;
  /** 파일 개수 */
  file_count: number;
  /** 조회 수 */
  view_count: number;
  /** 다운로드 수 */
  download_count: number;
  /** 에셋 개수 */
  asset_count: number;
  /** 삭제일시 */
  deleted_at: string;
  /** 삭제자 */
  deleted_by: string;
  tags: {
    /** 태그 ID */
    tag_id: number;
    /** 태그 이름 */
    tag_name: string;
  }[];
}

export interface CollectionAssetListResponse {
  data: CollectionAssetListDataResponse[];
  pagination?: {
    /** 전체 데이터 개수 */
    total: number;
    /** 현재 페이지 */
    currentPage: number;
    /** 전체 페이지 수 */
    totalPages: number;
    /** 페이지당 항목 수 */
    limit: number;
    /** 현재 페이지의 오프셋 */
    offset: number;
  };
}

export interface CollectionListDataResponse {
  /** 컬렉션 ID */
  collection_id: number;
  /** 컬렉션 이름 */
  name: string;
  /** 컬렉션 설명 */
  description?: string;
  /** 마스터 여부 */
  is_master: number;
  /** 조회 수 */
  view_count: number;
  /** 다운로드 수 */
  download_count: number;
  /** 파일 수 */
  file_count: number;
  /** 에셋 수 */
  asset_count: number;
  /** 삭제 여부 */
  is_deleted?: number;
  /**
   * 삭제일시
   * @format date-time
   */
  deleted_at?: string;
  /** 삭제자 */
  deleted_by?: string;
  /** 생성자 */
  created_by: string;
  /**
   * 생성일시
   * @format date-time
   */
  created_at: string;
  /**
   * 수정일시
   * @format date-time
   */
  updated_at: string;
  /** 공유 해시 */
  share_hash: string;
  /** 공유 링크 URL(누구나 볼 수 있음) */
  share_url_anyone: string;
  /** 공유 링크 URL(로그인한 사용자만 볼 수 있음) */
  share_url_user: string;
  /** 컬렉션 태그 목록 */
  tags: {
    /** 태그 ID */
    tag_id: number;
    /** 태그 이름 */
    tag_name: string;
  }[];
  /** 컬렉션 썸네일 파일 경로 목록 */
  thumbnails?: string[];
}

export interface CollectionAssetPostRequest {
  /** 컬렉션 ID */
  collection_id: number;
  /** 컬렉션에 포함할 에셋 ID 콤마 구분(1,2,3) */
  asset_ids: string;
  /** 태그 ID 목록 콤마 구분('A','B','C') */
  tag_ids: string;
  /** 새로운 태그 목록 콤마 구분('A','B','C') */
  new_tags: string;
  /** 새로운 컬렉션 여부 */
  is_new_collection: boolean;
  /** 컬렉션 이름 */
  name: string;
  /** 컬렉션 설명 */
  description: string;
  /** 마스터 여부 */
  is_master: number;
}

export interface CollectionsListResponse {
  data: CollectionListDataResponse[];
  pagination: {
    /** 전체 데이터 수 */
    total: number;
    /** 현재 페이지 */
    currentPage: number;
    /** 전체 페이지 수 */
    totalPages: number;
    /** 페이지당 데이터 수 */
    limit: number;
    /** 오프셋 */
    offset: number;
  };
}

export interface CollectionPutRequest {
  /**
   * 컬렉션 이름
   * @default "update collection name"
   */
  name: string;
  /**
   * 컬렉션 설명
   * @default "update collection description"
   */
  description?: string;
  /**
   * 마스터 여부
   * @default false
   */
  is_master?: boolean;
  /**
   * 태그 ID 목록 콤마 구분('A','B','C')
   * @default "38,39,40"
   */
  tag_ids?: string;
  /**
   * 새로운 태그 목록 콤마 구분('A','B','C')
   * @default "41,42,43"
   */
  new_tags?: string;
}

export interface CollectionCopyRequest {
  /**
   * 컬렉션 이름
   * @default "copy collection name"
   */
  name: string;
  /**
   * 컬렉션 설명
   * @default "copy collection description"
   */
  description: string;
  /**
   * 마스터 여부
   * @default false
   */
  is_master: number;
  /**
   * 태그 ID 목록 콤마 구분('A','B','C')
   * @default "41,42,43"
   */
  tag_ids?: string;
  /**
   * 새로운 태그 목록 콤마 구분('A','B','C')
   * @default "44,45,46"
   */
  new_tags?: string;
}

export interface CollectionPostRequest {
  /** 컬렉션 이름 */
  name: string;
  /** 컬렉션 설명 */
  description?: string;
  /**
   * 마스터 여부
   * @default false
   */
  is_master?: number;
  /** 태그 ID 목록 콤마 구분('A','B','C') */
  tag_ids?: string;
  /** 새로운 태그 목록 콤마 구분('A','B','C') */
  new_tags?: string;
}

