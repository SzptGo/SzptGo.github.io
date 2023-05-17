export interface Responce<T> {
  code: string
  msg: string
  data: T
}

export interface PageRecordData<T> {
  total: number
  records: T[]
}

export interface Page {
  current: number
  size: number
  total: number // 无用
}

export type ResponsePage<T> = Responce<PageRecordData<T>>
