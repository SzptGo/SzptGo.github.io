import { ref } from "vue"
import store from "@/store"
import { defineStore } from "pinia"
import { usePermissionStore } from "./permission"
import { useTagsViewStore } from "./tags-view"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"
import { loginApi, getUserInfoApi } from "@/api/login"
import { IUser, type ILoginRequestData } from "@/api/login/types/login"
import { type RouteRecordRaw } from "vue-router"
import asyncRouteSettings from "@/config/async-route"
import { ElMessage } from "element-plus"

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "")
  const roles = ref<string[]>([])
  const username = ref<string>("")
  const userInfo = ref<IUser>()
  const permissionStore = usePermissionStore()
  const tagsViewStore = useTagsViewStore()

  const ADMIN_USER = "1"

  /** 设置角色数组 */
  const setRoles = (value: string[]) => {
    roles.value = value
  }
  /** 登录 */
  const login = (loginData: ILoginRequestData) => {
    return new Promise((resolve, reject) => {
      loginApi({
        username: loginData.username,
        password: loginData.password
        // code: loginData.code
      })
        .then((res) => {
          if (res.data.roleId !== ADMIN_USER) {
            ElMessage.error("您的账户权限不足")
            throw Error("权限不足")
          }
          setToken(res.data.token)
          token.value = res.data.token
          userInfo.value = res.data
          resolve(true)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  /** 获取用户详情 */
  const getInfo = () => {
    return new Promise((resolve, reject) => {
      getUserInfoApi()
        .then((res) => {
          const data: any = res.data
          userInfo.value = res.data
          username.value = data.name
          // 验证返回的 roles 是否是一个非空数组
          const rolesList = ["normal"]
          if (data.roleId === ADMIN_USER) rolesList.push("admin")
          if (rolesList) {
            roles.value = rolesList
          } else {
            // 塞入一个没有任何作用的默认角色，不然路由守卫逻辑会无限循环
            roles.value = asyncRouteSettings.defaultRoles
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  /** 切换角色 */
  const changeRoles = async (role: string) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)
    await getInfo()
    permissionStore.setRoutes(roles.value)
    resetRouter()
    permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
      router.addRoute(item)
    })
    _resetTagsView()
  }
  /** 登出 */
  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }
  /** 重置 Token */
  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }
  /** 重置 visited views 和 cached views */
  const _resetTagsView = () => {
    tagsViewStore.delAllVisitedViews()
    tagsViewStore.delAllCachedViews()
  }

  return { token, roles, username, setRoles, login, getInfo, changeRoles, logout, resetToken, userInfo }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
