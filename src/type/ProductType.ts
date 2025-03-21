export interface Product {
    category: string,
    content: string,
    description: string,
    id?:string,
    imageUrl:string,
    magesUrl?:string[],
    is_enabled:number,
    num: number,
    origin_price: number|null,
    price: number|null,
    title: string,
    unit: string,
    buyerNumber?:string
}
