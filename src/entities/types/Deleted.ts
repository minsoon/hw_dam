export interface DeletedVersionListDataResponse {
  data: DeletedVersionListData[];
  pagination: {
    /** 총 데이터 수 */
    total: number;
    /** 현재 페이지 */
    currentPage: number;
    /** 총 페이지 수 */
    totalPages: number;
    /** 페이지당 데이터 수 */
    limit: number;
    /** 오프셋 */
    offset: number;
  };
}

export interface DeletedVersionListData {
  /** 에셋 버전 ID */
  asset_version_id: number;
  /** 에셋 ID */
  asset_id: number;
  /** 버전 */
  version: string;
  /** 상태 */
  status: string;
  /** 생성자 */
  created_by: string;
  /**
   * 생성 일시
   * @format date-time
   */
  created_at: string;
  /**
   * 수정 일시
   * @format date-time
   */
  updated_at: string;
  /** 삭제 여부 */
  is_deleted: boolean;
  /**
   * 삭제 일시
   * @format date-time
   */
  deleted_at?: string;
  /** 삭제자 */
  deleted_by: string;
  /** 에셋 이름 */
  asset_name: string;
  /** 설명 */
  description: string;
  /** 공유 해시 */
  share_hash: string;
  /** 기밀 여부 */
  is_confidential: number;
  /** 업로더 이름 */
  uploader_name: string;
  /** 업로더 연락처 */
  uploader_contact_number: string;
  /** 업로더 이메일 */
  uploader_email: string;
  /** 소유자 여부 */
  is_owner: number;
  /** 소유자 이름 */
  owner_name: string;
  /** 소유자 이메일 */
  owner_email: string;
  /** 에이전시 이름 */
  agency_name: string;
  /** 에이전시 담당자 */
  agency_contact_name: string;
  /** 저작권 */
  copyright: string;
  tbl_files: {
    /** 파일 이름 */
    file_name: string;
    /** 파일 경로 */
    file_path: string;
    /** 파일 확장자 */
    file_extension: string;
  }[];
}

export interface DeletedFileListData {
  /** 파일 ID */
  asset_file_id: number;
  /** 에셋 ID */
  asset_id: number;
  /** 파일 이름 */
  file_name: string;
  /** 파일 경로 */
  file_path: string;
  /** 파일 확장자 */
  file_extension: string;
  /**
   * 삭제 일자
   * @format date-time
   */
  deleted_at: string;
  /** 삭제자 */
  deleted_by: string;
}

export interface DeletedFileListDataResponse {
  data: DeletedFileListData[];
  pagination: {
    /** 총 데이터 수 */
    total: number;
    /** 현재 페이지 */
    currentPage: number;
    /** 총 페이지 수 */
    totalPages: number;
    /** 페이지당 데이터 수 */
    limit: number;
    /** 오프셋 */
    offset: number;
  };
}

export interface DeletedAssetListData {
  /** 에셋 ID */
  asset_id: number;
  /** 에셋 이름 */
  asset_name: string;
  /** 에셋 타입 이름 */
  asset_type_name: string;
  /** 파일 수 */
  file_count: number;
  /** 파일 타입 요약 */
  file_type_summary?: string;
  /**
   * 삭제 일자
   * @format date-time
   */
  deleted_at: string;
  /** 삭제자 */
  deleted_by: string;
  /** 썸네일 */
  thumbnail: string;
}

export interface DeletedAssetListDataResponse {
  data: DeletedAssetListData[];
  pagination: {
    /** 총 데이터 수 */
    total: number;
    /** 현재 페이지 */
    currentPage: number;
    /** 총 페이지 수 */
    totalPages: number;
    /** 페이지당 데이터 수 */
    limit: number;
    /** 오프셋 */
    offset: number;
  };
}

export interface DeletedCollectionListData {
  /** 컬렉션 ID */
  collection_id: number;
  /** 컬렉션 이름 */
  name: string;
  /** 마스터 여부 */
  is_master: number;
  /** 에셋 수 */
  asset_count: number;
  /**
   * 삭제 일자
   * @format date-time
   */
  deleted_at: string;
  /** 삭제자 */
  deleted_by: string;
  /** 썸네일 목록 */
  thumbnails: string[];
}

export interface DeletedCollectionListDataResponse {
  data: DeletedCollectionListData[];
  pagination: {
    /** 총 데이터 수 */
    total: number;
    /** 현재 페이지 */
    currentPage: number;
    /** 총 페이지 수 */
    totalPages: number;
    /** 페이지당 데이터 수 */
    limit: number;
    /** 오프셋 */
    offset: number;
  };
}

