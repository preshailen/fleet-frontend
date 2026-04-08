export interface RegisterModel {
  email: string;
  password: string
  role: string | null;
}
export const EMPTY_REGISTER_MODEL = {
  email: '',
  password: '',
  role: null
}
export interface LoginModel {
  email: string;
  password: string
}
export const EMPTY_LOGIN_MODEL = {
  email: '',
  password: ''
}