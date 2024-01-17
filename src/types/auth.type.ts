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
  twoFactorMethod: 'NONE' | 'TOTP';
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

  companyRole: TypeCompanyRole[];
  memberCompany: {
    id: number;
    name: string;
    code: string;
    emailId: 2;
    imageId: 1;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
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
    image: {
      id: number;
      uploadedBy: string | null;
      uploadAt: string;
      deleteFlg: boolean;
      createdAt: string;
      updatedAt: string;
      imageUrl: string;
    };
  };
  ownCompany: TypeOwnCompany[];
  havePassword?: boolean;
  identities?: {
    id: number;
    type?: string;
    accountId?: string;
    accountName?: string;
  }[];
}

export interface LoginData {
  totpToken?: string;
  code?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SMSVerifyRequest {
  token: string;
  code?: string;
  user?: User;
}

export interface SMSVerifyResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface SignupResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
