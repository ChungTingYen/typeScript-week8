import {FormValues} from './RegisterRulesType'
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