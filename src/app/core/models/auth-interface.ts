export interface AuthPayload {
  username: string;
  password: string;
}
export interface AuthResponse {
  id: 1;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}
