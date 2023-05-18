import { Responce } from "@/api/type"

export interface ILoginRequestData {
  /** admin 或 editor */
  username: string
  /** 密码 */
  password: string
  /** 验证码 */
  code?: string
}

export interface IUser {
  id?: string
  name: string
  phone: string
  roleId: string
  addrId?: string
  createDate?: string
  updateDate?: string
  level?: number
  balance?: number
  avatar: string
  mail?: string
  message?: string
  token?: null | string
}

export type LoginCodeResponseData = Responce<string>

export type LoginResponseData = Responce<IUser>

export type UserInfoResponseData = Responce<IUser>
