import { UserRole } from './user.type';

export type TypeCompanyRole = {
  companyId: number;
  userId: number;
  membership: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type TypeOwnCompany = {
  id: number;
  name: string | null;
  code: string | null;
  emailId: string | null;
  imageId: string | null;
  rootAccountId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};
export interface User {
  id: number;
  checkLocationOnLogin: boolean;
  countryCode: string;
  createdAt: string;
  gender: string;
  name: string;
  notificationEmail: string;
  prefersLanguage: string;
  emailId: number;
  profilePictureUrl: string;
  role: string;
  timezone: string;
  twoFactorMethod: string;
  twoFactorPhone: string | null;
  updatedAt: string;
  active: boolean;
  uuid: string;
  deleteFlg: boolean;
  deleteByAdmin: string;
  deletedAt: string | null;
  removalComment: string | null;
  removalReason: string | null;
  point: number;
  lastActive: string;
  isVerified: boolean;
  companyId: string | null;
  pointTotal: number;
  email: {
    id: number;
    email: string;
    isVerified: boolean;
    userId: number;
    companyId: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
  profile: string | null;
  identities: [];
  companyRole: TypeCompanyRole[];
  memberCompany: string | null;
  ownCompany: TypeOwnCompany[];
}

export interface LoginData {
  totpToken: string;
  code?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RecaptchaVerifyRequest {
  token: string;
}

export interface RecaptchaVerifyResponse {
  status: string;
}

export interface SMSVerifyRequest {
  token: string;
  code?: string;
}

export interface SMSVerifyResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface TwitterAuthRequest {
  twitterId: string;
  email: string;
}

export interface TwitterAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface TwitterSignupRequest {
  twitterId: string;
  email: string;
  role: UserRole;
}
