import { request } from "@/utils/service"
import { Responce } from "../type"
import type * as Goods from "./types/goods"
import { ElMessage } from "element-plus"

export function addGoods(goods: Goods.IGoods) {
  goods.isDel = false
  goods.sales = 0
  return request<Responce<boolean>>({
    url: "TbGood",
    method: "post",
    data: goods
  })
}

export function editGoods(goods: Goods.IGoods) {
  return request<Responce<boolean>>({
    url: `TbGood/${goods.id}`,
    method: "put",
    data: goods
  })
}

export function getAllGoods(current = 1, size = 99999, total = 99999) {
  return request<Responce<Goods.IGoods[]>>({
    url: `TbGood/getList/${current}/${size}/${total}`,
    method: "get"
  })
}

export function getGoods(id: string | undefined) {
  return request<Responce<Goods.IGoods>>({
    url: `TbGood/${id}`,
    method: "get"
  })
}

export function searchGoodsByName(name: string, current = 1, size = 99999, total = 99999) {
  return request<Responce<Goods.IGoods[]>>({
    url: `TbGood/getListByName/${current}/${size}/${total}/${name}`,
    method: "get"
  })
}

export function deleteGoods(id: string | undefined) {
  if (!id) {
    ElMessage.error("删除失败！")
    return
  }
  return request<Responce<boolean>>({
    url: `TbGood/${id}`,
    method: "delete"
  })
}

export function addSkuType(skuTypeName: string) {
  return request<Responce<string>>({
    url: `TbSkuType`,
    method: "post",
    data: {
      name: skuTypeName
    }
  })
}

export function editSkuType(skuTypeName: string, id: string) {
  return request<Responce<boolean>>({
    url: `TbSkuType/${id}`,
    method: "put",
    data: {
      name: skuTypeName,
      id: id
    }
  })
}

export function delSkuType(id: string) {
  return request<Responce<boolean>>({
    url: `TbSkuType/${id}`,
    method: "delete"
  })
}

export function addSku(sku: Goods.ISku) {
  return request<Responce<string>>({
    url: `TbSku`,
    method: "post",
    data: sku
  })
}

export function editSku(sku: Goods.ISku) {
  return request<Responce<boolean>>({
    url: `TbSku/${sku.id}`,
    method: "put",
    data: sku
  })
}

export function delSku(id: string) {
  return request<Responce<boolean>>({
    url: `TbSku/${id}`,
    method: "delete"
  })
}
