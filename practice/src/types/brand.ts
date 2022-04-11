export interface BrandDetail {
  id: string
  brandLogoImg: string
  brandImg: string
  webUrl: string
  brandPromotion: string
  companyName: string
  brandName: string
  ownerName: string
  smallCategoryName: string
  brandNormalStatus: BrandNormalStatus
  brandStartCost: BrandStartCost
  brandAreaSalesAve: BrandAreaSalesAve[]
  brandFranchiseStatus: BrandFranchiseStatus[]
  brandChangeStatus: BrandChangeStatus[]
  brandMenuImg: BrandMenuImg[]
  brandInteriorImg: BrandInteriorImg[]
  brandIntroImg: BrandIntroImg[]
  brandStartCostImg: BrandStartCostImg[]
  brandYoutube: BrandYoutube[]
}

export interface BrandAd {
  id: string
  brandName: string
  smallCategoryName: string
  brandStartCost: BrandStartCost
  brandLogoImg: string
  brandPromotion: string
}

export interface BrandSearch {
  id: string
  brandName: string
  companyName: string
  smallCategoryName: string
  brandLogoImg: string
  brandImg: string
  brandPromotion: string
  isPremium: boolean
  brandStartCost: BrandStartCost
  brandAreaSalesAve: BrandAreaSalesAve[]
}

export interface BrandNormalStatus {
  companyName?: string
  brandName?: string
  ownerName?: string
  corpRegDate?: string
  bizRegDate?: string
  bizNumber?: string
  address?: string
  repTel?: string
  repFaxTel?: string
  regNumber?: string
  regDate?: string
  lastUpdateDate?: string
  corpNumber?: string
}

export interface BrandStartCost {
  membershipFee: string
  educationFee: string
  deposit: string
  etcFee: string
  interiorFee: string
  totalFee: string
  standardArea?: string
  startTotalPrice: string
}

export interface BrandAreaSalesAve {
  year: number
  franchiseCount?: number
  location: string
  salesAve: string
  areaSalesAve: string
}

export interface BrandFranchiseStatus {
  year: number
  location?: string
  allCount: number
}

export interface BrandChangeStatus {
  year: number
  newShopCount: number
  terminationCount: number
  cancelCount: number
  changeCount: number
}

export interface BrandIntroImg {
  id: string
  introImgUrl: string
  introImgUrlKey: string
}

export interface BrandStartCostImg {
  id: string
  startCostImgUrl: string
  startCostImgUrlKey: string
}

export interface BrandMenuImg {
  id?: string
  menuImgUrl: string
  menuImgUrlKey: string
  menuName?: string
  menuPrice?: number
}

export interface BrandInteriorImg {
  id: string
  interiorImgUrl: string
  interiorImgUrlKey: string
}

export interface BrandYoutube {
  id?: string
  youtubeUrl: string
  youtubeId: string
}

export interface BrandInfo {
  id: string
  brandLogoImg: string
  brandLogoImgKey: string
  webUrl: string
  brandPromotion: string
  brandIntroImg: BrandIntroImg[]
  brandStartCostImg: BrandStartCostImg[]
  brandMenuImg: BrandMenuImg[]
  brandInteriorImg: BrandInteriorImg[]
  brandYoutube: BrandYoutube[]
}

export interface BrandList {
  id: string
  brandName: string
  brandLogoImg: string
}
