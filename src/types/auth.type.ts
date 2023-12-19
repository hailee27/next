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
