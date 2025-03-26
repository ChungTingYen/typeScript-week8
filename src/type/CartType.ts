import { Product } from "./ProductType"
export interface CartState {
    carts:Cart[],
    final_total:number,
    total:number,
    
}

export interface Cart{
    final_total: number,
    id: string,
    product: Product,
    product_id: string,
    qty: number,
    total: number,
    coupon?:Coupon
}

export interface Coupon {
    code: string,
    due_date: number,
    id: string,
    is_enabled: number,
    percent: number,
    title: string
}