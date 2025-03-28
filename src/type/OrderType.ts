import {FormValues} from './RegisterRulesType'
import {Product} from '../type/ProductType'
import {CouponType} from '../type/CouponType'
type UserWithoutMessage = Omit<FormValues, "message">;

export interface OrderType{
    create_at: number,
    id: string,
    is_paid: boolean,
    message:string ,
    products: product[],
    user: UserWithoutMessage,
    num: number
}

interface product{
    id: string,
    product_id:string,
    qty: number
}

export interface GoodsType{
    create_at: number,
    id: string,
    is_paid: boolean,
    message:string ,
    paid_date:number,
    products: ProductsTypeInGetOrder,
    user: UserWithoutMessage,
    total: number
}

interface ProductsTypeInGetOrder{
    [key:string]:{
        coupon?:CouponType,
        final_total:number,
        id: string,
        product:Product,
        product_id: string,
        qty: number,
        total: number
    }
}

