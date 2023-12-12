export interface User {
  id: number;
  email: string;
}

export interface LoginData {
  totpToken: string;
  code?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SMSLoginAuthRequest {
  token: string;
  code?: string;
}

export interface SMSLoginAuthResponse {
  accessToken: string;
  refeshToken: string;
  user: User;
}
