export interface UserResponse {
  /** 사용자 고유 ID */
  id: string;
  /** 사용자명 */
  username: string;
  /** 이름 */
  firstName: string;
  /** 성 */
  lastName: string;
  /** 이메일 주소 */
  email: string;
  /** 이메일 인증 여부 */
  emailVerified: boolean;
  /** 계정 생성 타임스탬프 */
  createdTimestamp: number;
  /** 계정 활성화 여부 */
  enabled: boolean;
  /** 2단계 인증 사용 여부 */
  totp: boolean;
  /** 비활성화 가능한 인증 타입 목록 */
  disableableCredentialTypes: string[];
  /** 필요한 액션 목록 */
  requiredActions: string[];
  /** 계정 사용 시작 시간 */
  notBefore: number;
}

