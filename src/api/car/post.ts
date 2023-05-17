import { request } from "@/utils/service"
import { Responce, ResponsePage } from "../type"
import { ICar } from "./types"

export function getList(current = 1, size = 9999) {
  return request<ResponsePage<ICar>>({
    url: `/TbCarPost/getListAdmin/${current}/${size}`,
    method: "get"
  })
}

export function addCarPost(car: ICar) {
  return request<Responce<boolean>>({
    url: `TbCarPost`,
    method: "post",
    data: car
  })
}

export function editCarPost(car: ICar) {
  return request<Responce<boolean>>({
    url: `TbCarPost/${car.postId}`,
    method: "put",
    data: car
  })
}

export function delCarPost(id: string) {
  return request<Responce<boolean>>({
    url: `TbCarPost/${id}`,
    method: "delete"
  })
}
