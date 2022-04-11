export interface Favorite {
  id: string
  userId: string
  brandId: string
  brand: Brand
}

interface Brand {
  id: string
  brandLogoImg: string
  brandName: string
}
