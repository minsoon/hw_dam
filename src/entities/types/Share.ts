export interface ShareRequest {
  /** 공유 링크 해시 */
  share_hash?: string;
  /** 공유 링크 접근 권한(anyone, user) */
  who_can_access?: string;
  /** 공유 링크 접근 타입(view : V, view and download : D) */
  access_type?: string;
  /** 공유 링크 메시지 */
  message?: string;
  /**
   * 공유 링크 수신자(; 구분)
   * @default "baekds@gmail.com"
   */
  recipients?: string;
  /**
   * 공유 링크 이메일 전송 여부
   * @default false
   */
  is_send_email?: boolean;
  /**
   * 공유 링크 에셋 ID
   * @default "1"
   */
  asset_id?: string;
  /**
   * 공유 링크 컬렉션 ID
   * @default "1"
   */
  collection_id?: string;
  /** 공유 링크 URL */
  share_url?: string;
}

