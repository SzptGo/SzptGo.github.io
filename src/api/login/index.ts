import { request } from "@/utils/service"
import type * as Login from "./types/login"
import { Responce } from "../type"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  return request<Login.LoginCodeResponseData>({
    url: "login/code",
    method: "get"
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.ILoginRequestData) {
  return request<Login.LoginResponseData>({
    url: "/TbUser/login",
    method: "post",
    data
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return request<Login.UserInfoResponseData>({
    url: "/TbUser/getInfo",
    method: "get"
  })
}

export function geUserList(current = 1, size = 100000, total = 100000) {
  return request<Responce<Login.IUser[]>>({
    url: `TbUser/getList/${current}/${size}/${total}`,
    method: "get"
  })
}

export function delUser(id: string) {
  return request<Responce<boolean>>({
    url: `TbUser/${id}`,
    method: "delete"
  })
}

export function registerUser(user: Login.ILoginRequestData) {
  return request<Responce<Login.IUser[]>>({
    url: `TbUser/register`,
    method: "post",
    data: user
  })
}
