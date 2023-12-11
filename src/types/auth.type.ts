export interface User {
  id: number;
  email: string;
}

export interface LoginData {
  accessToken: string;
  refreshToken: string;
  userData: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}
