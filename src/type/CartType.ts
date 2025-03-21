import { Product } from "./swiperType"
export interface CartState {
    carts:Cart[],
    final_total:number,
    total:number
}

export interface Cart{
    final_total: number,
    id: string,
    product: Product,
    product_id: string,
    qty: number,
    total: number
}