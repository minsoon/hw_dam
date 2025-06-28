export interface CollectionTagResponse {
  /** Collection ID */
  tag_id: number;
  /** Collection name */
  tag_name: string;
  /** Associated tag group ID */
  tag_group_id: number;
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
}

export interface CollectionTagRequest {
  /** Collection name */
  tag_name?: string;
  /** Associated tag group ID */
  tag_group_id?: number;
  /** Active status */
  is_active?: number;
  /** Creator */
  created_by?: string;
  /** Type of tag */
  type?: string;
}

export interface PaginatedResponse {
  data: CollectionTagResponse[];
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

