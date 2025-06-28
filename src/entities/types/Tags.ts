export interface TagResponse {
  /** Tag ID */
  tag_id: number;
  /** Tag name */
  tag_name: string;
  /** parent Tag ID */
  parent_tag_id: number;
  /** Active status */
  is_active: number;
  /** Creator */
  created_by: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at: string;
  /** Used count */
  used_count: number;
  /** Type of tag */
  type: string;
  /** Category of tag */
  category: string;
  /** child tags count */
  tags_count: number;
}

export interface TagUpdateRequest {
  /** Tag name */
  tag_name: string;
  /**
   * Active status
   * @default 1
   */
  is_active?: number;
}

export interface TagInsertRequest {
  /** Tag name */
  tag_name: string;
  /**
   * Active status
   * @default 1
   */
  is_active?: number;
  /** parent Tag ID */
  parent_tag_id: number;
}

export interface PaginatedTagResponse {
  data: TagResponse[];
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

