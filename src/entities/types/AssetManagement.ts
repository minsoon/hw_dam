export interface AssetTypeVariationResponse {
  /** The auto-generated id of the variation */
  variation_id: number;
  /** The id of the asset type */
  asset_type_id?: number;
  /** The name of the variation */
  name: string;
  /** The allowed file type for this variation */
  file_type: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  /** The sort order of the variation */
  sort_ord: number;
}

export interface AssetTypeResponse {
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

export interface AssetTypeDetailResponse {
  /** The auto-generated id of the asset type */
  asset_type_id: number;
  /** The name of the asset type */
  name: string;
  /** The default type of the asset type */
  default_type: string;
  /** Instructions for uploading assets of this type */
  upload_instruction: string;
  /** The name of the icon file */
  icon_name?: string;
  /** Path to the icon file */
  icon_path: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  /** Size of the asset type icon file */
  icon_file_size: string;
  tbl_asset_type_variations?: AssetTypeVariationResponse[];
}

export interface AssetTypeUpdateRequest {
  /**
   * 에셋 타입 이름
   * @default "Stock Image"
   */
  name?: string;
  /**
   * 업로드 가이드
   * @default "Stock Image"
   */
  upload_instruction?: string;
  /**
   * 기존 아이콘 경로
   * @default "https://dam.hanwha.com/dam/icons/stock_image.png"
   */
  old_icon_path?: string;
  /**
   * 기존 아이콘 파일명
   * @default "stock_image.png"
   */
  old_icon_name?: string;
  /** 에셋 타입 변형 목록 */
  variations?: {
    /** 변형 ID */
    variation_id?: number;
    /** 변형 이름 */
    name?: string;
    /** 허용된 파일 타입 */
    file_type?: string;
  }[];
  /**
   * 업로드할 아이콘 파일
   * @format binary
   */
  file?: File;
}

