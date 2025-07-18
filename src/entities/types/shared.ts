export interface Error {
  /** 에러 메시지 */
  error?: string;
  /** 에러 상세 메시지 */
  message?: string;
  /** HTTP 상태 코드 */
  status?: number;
}

