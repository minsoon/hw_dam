export interface PimProductListResponse {
  data: {
    /** 제품 ID */
    Id: number;
    /** 제품명 */
    ProductName: string;
    /** 제품 카테고리 */
    Category: string;
    /** 제품 가용성 */
    Availability: string;
    /** 스펙 준비 상태 */
    IsSpecNotReady: boolean;
    /**
     * 생성일시
     * @format date-time
     */
    createdAt: string;
  }[];
}

