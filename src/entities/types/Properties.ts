export interface PropertyCategoryResponse {
  /** The auto-generated id of the category */
  property_category_id: number;
  /** The name of the category */
  category_name: string;
  /** The type of category (Single select/Multi select) */
  category_type: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  created_by: string;
}

export interface PropertyOptionResponse {
  /** The auto-generated id of the option */
  property_option_id: number;
  /** The category id this value belongs to */
  property_category_id: number;
  /** The actual value */
  option_name: string;
  /** The user who created the option */
  created_by: string;
  /** @format date-time */
  created_at: string;
  /** @format date-time */
  updated_at: string;
  /** The number of times the option has been used */
  used: number;
}

export interface PropertyCategoryUpdateRequest {
  /** 카테고리 이름 */
  category_name: string;
  /** 카테고리 타입 (single/multi) */
  category_type: "single" | "multi";
}

