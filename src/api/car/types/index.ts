import { IUser } from "@/api/login/types/login"

export interface ICountry {
  countryId: string
  countryName: string
}

export interface IPowerType {
  powerTypeId: string
  powerTypeName: string
}

export interface ICarType {
  typeId: string
  typeName: string
}

export interface IBrand {
  brandId: string
  brandName: string
  brandCountryId: string
}

export interface ICarSeries {
  seriesId: string
  seriesName: string
  brandId: string
}

export interface ICar {
  age: number
  brand: string
  carBrand: IBrand
  carCountry?: ICountry
  carImage: string
  carPowerType: IPowerType
  carSeries?: ICarSeries
  carType: ICarType
  carTypeId: string
  color: string
  createDate?: string
  deposit: number
  description: string
  displacement: number
  driver: number
  km: number
  ownerId: string
  origionalPrice: number
  postId: string
  postName: string
  powerTypeId: string
  price: number
  region: string
  seat: number
  status: number
  tradeCount: number
  updateDate?: string
  user: IUser
  srcList?: string[]
}

export const defaultCarPost: ICar = {
  age: undefined,
  brand: "",
  carBrand: { brandId: "", brandName: "", brandCountryId: "" },
  carImage: "",
  carPowerType: { powerTypeId: "", powerTypeName: "" },
  carType: { typeId: "", typeName: "" },
  carTypeId: "",
  color: "",
  deposit: undefined,
  description: "",
  displacement: undefined,
  driver: undefined,
  km: undefined,
  ownerId: "",
  origionalPrice: undefined,
  postId: "",
  postName: "",
  powerTypeId: "",
  price: undefined,
  region: "",
  seat: undefined,
  status: 0,
  tradeCount: undefined,
  user: {
    id: "",
    name: "",
    avatar: "",
    token: "",
    phone: "",
    level: 0,
    createDate: "",
    updateDate: "",
    roleId: "",
    addrId: ""
  }
}
