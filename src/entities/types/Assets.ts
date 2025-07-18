export interface AssetDeleteRequest {
  /** Asset ids(콤마 구분) */
  asset_ids?: string;
  /** 버전 ID */
  asset_version_id?: number | null;
}

export interface AssetFavoriteRequest {
  /** 에셋 IDs(콤마로 구분) */
  asset_ids: string;
  /** 즐겨찾기 상태(Y: 즐겨찾기 추가, N: 즐겨찾기 해제) */
  is_favorite: string;
}

export interface AssetHiddenRequest {
  /** 에셋 ID */
  asset_id: number;
  /** 숨김 상태(1: 숨김, 0: 숨김 해제) */
  is_hidden: number;
}

export interface AssetListTypeResponse {
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

export interface PropertyCategoryOptionResponse {
  /** 프로퍼티 카테고리 ID */
  property_category_id: number;
  /** 카테고리 이름 */
  category_name: string;
  /** 카테고리 타입 (single/multi) */
  category_type: string;
  options: {
    /** 프로퍼티 옵션 ID */
    property_option_id: number;
    /** 옵션 이름 */
    option_name: string;
    /** 선택 여부 */
    is_selected?: number;
  }[];
}

export interface AssetDetailResponse {
  /** 에셋 ID */
  asset_id: number;
  /** id title */
  id_title: string;
  /** 에셋 타입 ID */
  asset_type_id: number;
  /** 에셋 타입 이름 */
  asset_type_name: string;
  /** 에셋 타입 기본값(Auto, Custom), auto면 이미지만 가능 */
  default_type?: string;
  /** 숨김 여부 */
  is_hidden: number;
  /** 잠금 여부 */
  is_locked: number;
  /** 잠금 설정자 */
  locked_by: string;
  /**
   * 잠금 설정 시간
   * @format date-time
   */
  locked_at: string;
  /** 공유 해시값 */
  share_hash: string;
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
  /** 조회수 */
  view_count: number;
  /** 다운로드 수 */
  download_count: number;
  /** access type */
  access_type?: string;
  is_working_file: number;
  /** 현재 버전 정보 */
  current_version: {
    /** 에셋 버전 ID */
    asset_version_id: number;
    /** 버전 번호 (v01, v02, ...) */
    version: string;
    /** 에셋 이름 */
    asset_name: string;
    /** 에셋 설명 */
    description: string;
    /** 상태 */
    status: string;
    /** 업로더 이름 */
    uploader_name: string;
    /** 업로더 연락처 */
    uploader_contact_number: string;
    /** 업로더 이메일 */
    uploader_email: string;
    /** 소유자 이름 */
    owner_name: string;
    /** 소유자 이메일 */
    owner_email: string;
    /** 에이전시 이름 */
    agency_name: string;
    /** 에이전시 담당자 이름 */
    agency_contact_name: string;
    /** 저작권 정보 */
    copyright: string;
    /** 기밀 여부 (0: 일반, 1: 기밀) */
    is_confidential: number;
    /** 소유자 여부 (0: 아님, 1: 소유자) */
    is_owner: number;
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
    /** 에셋 레벨 태그 */
    tags?: {
      /** 태그 ID */
      tag_id: number;
      /** 태그명 */
      tag_name: string;
      /** 자식 태그 목록 */
      child_tags: {
        /** 태그 ID */
        tag_id: number;
        /** 태그명 */
        tag_name: string;
        /** 부모 태그 ID */
        parent_tag_id: number;
      }[];
    }[];
    /** 에셋 레벨 프로퍼티 */
    properties?: {
      /** 카테고리 ID */
      category_id: number;
      /** 카테고리명 */
      category_name: string;
      /** 프로퍼티 옵션 목록 */
      options: {
        /** 프로퍼티 옵션 ID */
        property_option_id: number;
        /** 옵션명 */
        option_name: string;
        /** 옵션값 */
        option_value: string;
      }[];
    }[];
    /** product segments 리스트 */
    product_segments?: {
      /** 제품 세그먼트 ID */
      product_segment_id: number;
      /** 스펙명 */
      spec_name: string;
    }[];
    /** product models 리스트 */
    product_models?: {
      /** 제품 모델 ID */
      product_model_id: number;
      /** 모델명 */
      product_model: string;
    }[];
  };
  /** 파일 목록 */
  files: {
    /** 파일 ID */
    asset_file_id: number;
    /** 파일명 */
    file_name: string;
    /** 파일 경로 URL */
    file_path: string;
    /** 파일 크기 (bytes) */
    file_size: number;
    /** 파일 확장자 */
    file_extension: string;
    /** 변형 ID */
    variation_id: number;
    /** 썸네일 여부 */
    is_thumbnail: number;
    /** 저장소 타입 */
    storage_type: string;
    /** 파일 설명 */
    description: string;
    /** 파일 공유 해시 */
    share_hash: string;
    /**
     * 생성일시
     * @format date-time
     */
    created_at: string;
    /** 업로더 이름 */
    uploader_name: string;
    /** 업로더 연락처 */
    uploader_contact_number: string;
    /** 업로더 이메일 */
    uploader_email: string;
    /** 소유자 이름 */
    owner_name: string;
    /** 소유자 이메일 */
    owner_email: string;
    /** 에이전시 이름 */
    agency_name: string;
    /** 에이전시 담당자 이름 */
    agency_contact_name: string;
    /** 저작권 정보 */
    copyright: string;
    /** 소유자 여부 */
    is_owner: number;
    /** 이미지 너비 */
    image_width: number;
    /** 이미지 높이 */
    image_height: number;
    /** 다운로드 수 */
    download_count: number;
    /** 파일별 태그 */
    tags: {
      /** 태그 ID */
      tag_id: number;
      /** 태그명 */
      tag_name: string;
      /** 부모 태그 ID */
      parent_tag_id: number;
    }[];
    /** 파일별 프로퍼티 */
    properties: {
      /** 프로퍼티 옵션 ID */
      property_option_id: number;
      /** 옵션명 */
      option_name: string;
      /** 옵션값 */
      option_value: string;
      /** 카테고리명 */
      category_name: string;
    }[];
  }[];
  /** 파일 개수 */
  file_count: number;
  /** 대표 썸네일 URL */
  thumbnail: string;
  /** 파일 확장자 요약 */
  file_type_summary: string;
  /** 즐겨찾기 여부 */
  is_favorite: boolean;
  /** 공유 URL */
  share_url_anyone: string | null;
  /** 사용자 공유 URL */
  share_url_user: string | null;
  /** 모든 버전 목록  */
  all_versions: {
    /** 버전 ID */
    asset_version_id: number;
    /** 버전 번호 */
    version: string;
    /** 버전 숫자 */
    version_number: number;
    /** 에셋명 */
    asset_name: string;
    /**
     * 생성일시
     * @format date-time
     */
    created_at: string;
    /** 생성자 */
    created_by: string;
  }[];
}

export interface AssetUpdateInfoResponse {
  /** 에셋 ID */
  asset_id: number;
  /** 에셋 타입 ID */
  asset_type_id: number;
  /** 에셋 타입 이름 */
  asset_type_name: string;
  /** 에셋 타입 기본값(Auto, Custom), auto면 이미지만 가능 */
  default_type?: string;
  /** 숨김 여부 */
  is_hidden: number;
  /** 잠금 여부 */
  is_locked: number;
  /** 잠금 설정자 */
  locked_by: string;
  /**
   * 잠금 설정 시간
   * @format date-time
   */
  locked_at: string;
  /** 공유 해시값 */
  share_hash: string;
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
  /** 조회수 */
  view_count: number;
  /** 다운로드 수 */
  download_count: number;
  /** 현재 버전 정보 */
  current_version: {
    /** 에셋 버전 ID */
    asset_version_id: number;
    /** 버전 번호 (v01, v02, ...) */
    version: string;
    /** 에셋 이름 */
    asset_name: string;
    /** 에셋 설명 */
    description: string;
    /** 상태 */
    status: string;
    /** 업로더 이름 */
    uploader_name: string;
    /** 업로더 연락처 */
    uploader_contact_number: string;
    /** 업로더 이메일 */
    uploader_email: string;
    /** 소유자 이름 */
    owner_name: string;
    /** 소유자 이메일 */
    owner_email: string;
    /** 에이전시 이름 */
    agency_name: string;
    /** 에이전시 담당자 이름 */
    agency_contact_name: string;
    /** 저작권 정보 */
    copyright: string;
    /** 기밀 여부 (0: 일반, 1: 기밀) */
    is_confidential: number;
    /** 소유자 여부 (0: 아님, 1: 소유자) */
    is_owner: number;
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
    /** 에셋 레벨 태그 */
    tags?: {
      /** 태그 ID */
      tag_id: number;
      /** 태그명 */
      tag_name: string;
      /** 자식 태그 목록 */
      child_tags: {
        /** 태그 ID */
        tag_id: number;
        /** 태그명 */
        tag_name: string;
        /** 부모 태그 ID */
        parent_tag_id: number;
      }[];
    }[];
    /** 에셋 레벨 프로퍼티 */
    properties?: {
      /** 카테고리 ID */
      category_id: number;
      /** 카테고리명 */
      category_name: string;
      /** 프로퍼티 옵션 목록 */
      options: {
        /** 프로퍼티 옵션 ID */
        property_option_id: number;
        /** 옵션명 */
        option_name: string;
        /** 옵션값 */
        option_value: string;
      }[];
    }[];
  };
  /** 파일 목록 */
  files: {
    /** 파일 ID */
    asset_file_id: number;
    /** 파일명 */
    file_name: string;
    /** 파일 경로 URL */
    file_path: string;
    /** 파일 확장자 */
    file_extension: string;
    /** 변형 ID */
    variation_id: number | null;
    /** 썸네일 여부 */
    is_thumbnail: number;
  }[];
  /** 파일 개수 */
  file_count: number;
  /** 대표 썸네일 URL */
  thumbnail: string;
  /** 파일 확장자 요약 */
  file_type_summary: string;
  /** 즐겨찾기 여부 */
  is_favorite: boolean;
  /** 공유 URL */
  share_url_anyone: string;
  /** 사용자 공유 URL */
  share_url_user: string;
  /** 모든 버전 목록  */
  all_versions: {
    /** 버전 ID */
    asset_version_id: number;
    /** 버전 번호 */
    version: string;
    /** 에셋명 */
    asset_name: string;
    /**
     * 생성일시
     * @format date-time
     */
    created_at: string;
    /** 생성자 */
    created_by: string;
  }[];
  /** 에셋 레벨 태그 */
  tags: {
    /** 태그 ID */
    tag_id: number;
    /** 태그명 */
    tag_name: string;
    /** 자식 태그 목록 */
    child_tags: {
      /** 태그 ID */
      tag_id?: number;
      /** 태그명 */
      tag_name: string;
      /** 부모 태그 ID */
      parent_tag_id: number;
      /** 디비에 값이 있는경우 1, 없는경우 0 */
      is_selected?: number;
    }[];
  }[];
  /** 에셋 레벨 프로퍼티 */
  properties: {
    /** 카테고리 ID */
    property_category_id: number;
    /** 카테고리명 */
    category_name: string;
    /** 카테고리 타입 (single/multi) */
    category_type: string;
    /** 프로퍼티 옵션 목록 */
    options: {
      /** 프로퍼티 옵션 ID */
      property_option_id: number;
      /** 옵션명 */
      option_name: string;
      /** 디비에 값이 있는경우 1, 없는경우 0 */
      is_selected?: number;
    }[];
  }[];
  /** 현재 asset type에 맞는 custom variation 목록 */
  custom_variations: {
    /** 변형 ID */
    variation_id: number;
    /** 에셋 타입 ID */
    asset_type_id: number;
    /** 변형 이름 */
    name: string;
    /** 허용된 파일 타입 */
    file_type: string;
    /** 정렬 순서 */
    sort_ord: number;
  }[];
  /** product models 리스트 */
  product_models?: {
    /** 제품 모델 ID */
    product_model_id: number;
    /** 모델명 */
    product_model: string;
  }[];
  /** product segments 리스트 */
  product_segments?: {
    product_segment_id: number;
    spec_name: string;
    is_selected: number;
  }[];
}

export interface AssetRequest {
  /** 에셋 이름 */
  asset_name: string;
  /** 에셋 설명 */
  description: string;
  /** 기밀 여부 (0: 일반, 1: 기밀) */
  is_confidential: number;
  /** 업로더 이름 */
  uploader_name: string;
  /** 업로더 연락처 */
  uploader_contact_number: string;
  /** 업로더 이메일 */
  uploader_email: string;
  /** 소유자 여부 (0: 아님, 1: 소유자) */
  is_owner: number;
  /** 소유자 이름 */
  owner_name: string;
  /** 소유자 이메일 */
  owner_email: string;
  /** 에이전시 이름 */
  agency_name: string;
  /** 에이전시 담당자 이름 */
  agency_contact_name: string;
  /** 저작권 정보 */
  copyright: string;
  file_info: AssetPutFileInfoRequest[];
  tags_list: AssetPutTagsListRequest[];
  properties_list: AssetPutPropertiesListRequest[];
  /** product models */
  product_models?: {
    /** 제품 모델 ID */
    product_model_id: number;
    /** 제품 모델명 */
    product_model: string;
  }[];
  /** product segments */
  product_segments?: number[];
}

export interface EmergencyAssetRequest {
  /** 에셋 이름 */
  asset_name: string;
  /** 에셋 설명 */
  description: string;
  /** 기밀 여부 (0: 일반, 1: 기밀) */
  is_confidential: number;
  /** 업로더 이름 */
  uploader_name: string;
  /** 업로더 연락처 */
  uploader_contact_number: string;
  /** 업로더 이메일 */
  uploader_email: string;
  /** 소유자 여부 (0: 아님, 1: 소유자) */
  is_owner: number;
  /** 소유자 이름 */
  owner_name: string;
  /** 소유자 이메일 */
  owner_email: string;
  /** 에이전시 이름 */
  agency_name: string;
  /** 에이전시 담당자 이름 */
  agency_contact_name: string;
  /** 저작권 정보 */
  copyright: string;
  file_info: EmergencyAssetPutFileInfoRequest[];
  tags_list: AssetPutTagsListRequest[];
  properties_list: AssetPutPropertiesListRequest[];
  /** 변경된 파일들 */
  files?: File[];
  /** product model */
  product_models?: {
    /** 제품 모델 ID */
    product_model_id: number;
    /** 제품 모델명 */
    product_model: string;
  }[];
  /** product segment */
  product_segments?: number[];
}

export interface AssetPutPropertiesListRequest {
  /** 프로퍼티 옵션 ID */
  property_option_id: number;
  /** 프로퍼티 카테고리 ID */
  property_category_id: number;
}

export interface AssetPutTagsListRequest {
  /** 부모 태그 ID */
  parent_tag_id: number;
  /** 태그 ID (기존 태그인 경우) */
  tag_id?: number;
  /** 태그 이름 */
  tag_name: string;
}

export interface AssetPutFileInfoRequest {
  /** file id */
  asset_file_id: number;
  /** custom variation id */
  variation_id: number;
  /** 썸네일 여부 */
  is_thumbnail: number;
}

export interface EmergencyAssetPutFileInfoRequest {
  /** file id */
  asset_file_id: number;
  /** custom variation id */
  variation_id: number | null;
  /** 썸네일 여부 */
  is_thumbnail: number;
  /** 파일 이름 */
  originalname: string;
  /** 새 파일 여부 */
  is_new?: number;
}

export interface TagInfoResponse {
  /** 부모 태그 ID */
  parent_tag_id: number;
  /** 태그 ID (기존 태그인 경우) */
  tag_id?: number;
  /** 태그 이름 */
  tag_name: string;
}

export interface AssetListDataResponse {
  /** 에셋 ID */
  asset_id: number;
  /** asset id_title */
  id_title: string;
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
  /** 공유 해시 */
  share_hash?: string;
  /** 공용 공유 URL */
  share_url_anyone: string;
  /** 사용자 공유 URL */
  share_url_user: string;
  /** is include working file */
  is_working_file: number;
}

export interface AssetListResponse {
  data: AssetListDataResponse[];
  pagination: {
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
    /** asset total 카운트 */
    assets_count: number;
    /** 즐겨찾기 카운트 */
    favorite_count: number;
  };
}

export interface ProductSegmentsListResponse {
  /** product segment ID */
  product_segment_id: number;
  /** product name */
  spec_name: string;
  /** is selected */
  is_selected?: number;
}

export interface RefsTagInfoResponse {
  /** 태그 ID */
  tag_id: number;
  /** 태그명 */
  tag_name: string;
  /** 부모 태그 ID */
  parent_tag_id: number;
  /** is ai tag */
  is_ai_tag?: number;
  /** 자식 태그 목록 */
  child_tags: {
    /** 태그 ID */
    tag_id?: number;
    /** 태그명 */
    tag_name: string;
    /** 부모 태그 ID */
    parent_tag_id: number;
    /** 선택 여부 */
    is_selected?: number;
  }[];
}

export interface AssetRefsResponse {
  tags: RefsTagInfoResponse[];
  properties: PropertyCategoryOptionResponse[];
  asset_types?: AssetListTypeResponse[];
  product_segments: ProductSegmentsListResponse[];
  /** 현재 asset type에 맞는 custom variation 목록 */
  custom_variations?: {
    /** 변형 ID */
    variation_id: number;
    /** 에셋 타입 ID */
    asset_type_id: number;
    /** 변형 이름 */
    name: string;
    /** 허용된 파일 타입 */
    file_type: string;
    /** 정렬 순서 */
    sort_ord: number;
  }[];
}

export interface AssetListRequest {
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
  /** 즐겨찾기 필터링 */
  is_favorite?: "true" | "false";
  /**
   * 정렬 방법 (newest: 최신순, oldest: 오래된순, a-z: 이름 오름차순, z-a: 이름 내림차순)
   * @default "newest"
   */
  sort?: "newest" | "oldest" | "a-z" | "z-a";
  /** 에셋 타입 필터 (콤마로 구분, 예: 1,2,3) */
  asset_types?: string;
  /** 태그 ID 필터 (콤마로 구분, 예: 1,2,3) */
  tags?: string;
  /** 프로퍼티 ID 필터 (콤마로 구분, 예: 1,2,3) */
  properties?: string;
}

export interface AssetPostRequest {
  /**
   * 에셋 타입 ID
   * @example 1
   */
  asset_type_id: number;
  /** 에셋 입력 정보(stock인경우에 파일별로 배열, 그 외엔 file_info 배열을 파일갯수대로) */
  assetPostInfos: {
    /** 파일 정보 */
    file_info: {
      /**
       * 파일 이름
       * @example "test.jpg"
       */
      originalname: string;
      /**
       * 썸네일 여부 (0: 아니오, 1: 예)
       * @example 1
       */
      is_thumbnail: number;
      /**
       * asset type variation ID (stock이 아닌 경우 필수)
       * @example 1
       */
      variation_id?: number;
    }[];
    /**
     * 에셋 이름
     * @example "테스트 에셋"
     */
    asset_name: string;
    /**
     * 에셋 설명
     * @example "테스트 설명"
     */
    description: string;
    /**
     * 기밀 여부 (0: 일반, 1: 기밀)
     * @example 0
     */
    is_confidential: number;
    /**
     * 업로더 이름
     * @example "홍길동"
     */
    uploader_name: string;
    /**
     * 업로더 연락처
     * @example "010-1234-5678"
     */
    uploader_contact_number: string;
    /**
     * 업로더 이메일
     * @example "test@example.com"
     */
    uploader_email: string;
    /**
     * 소유자 여부 (0: 아님, 1: 소유자)
     * @example 1
     */
    is_owner: number;
    /**
     * 소유자 이름
     * @example "테스트 소유자"
     */
    owner_name: string;
    /**
     * 소유자 이메일
     * @example "owner@example.com"
     */
    owner_email: string;
    /**
     * 에이전시 이름
     * @example "테스트 에이전시"
     */
    agency_name: string;
    /**
     * 에이전시 담당자 이름
     * @example "김담당"
     */
    agency_contact_name: string;
    /**
     * 저작권 정보
     * @example "© 2024 Test"
     */
    copyright: string;
    /** 태그 정보 */
    tags_list?: {
      /** @example 9 */
      parent_tag_id: number;
      /** @example 137 */
      tag_id?: number;
      /** @example "테스트 태그" */
      tag_name: string;
    }[];
    /** 프로퍼티 정보 */
    properties_list?: {
      /** @example 8 */
      property_option_id: number;
      /** @example 3 */
      property_category_id: number;
    }[];
    /** product models */
    product_models?: {
      /** @example 1 */
      product_model_id: number;
      /** @example "제품 모델명" */
      product_model: string;
    }[];
    /** product segments */
    product_segments?: number[];
  }[];
  /** 업로드할 파일 */
  files: File[];
}

