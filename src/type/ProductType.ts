export interface Product {
    type: 'ProductType'; //必須先給初值避免compile的時候就判斷錯誤，之後在取得資料時還必須再放進來一次
    category: string,
    content: string,
    description: string,
    id?:string,
    imageUrl:string,
    imagesUrl?:string[],
    is_enabled:number,
    num: number,
    origin_price: number|null,
    price: number|null,
    title: string,
    unit: string,
    buyerNumber?:string,
}
interface ImagesType{
    url:string,
    content?:string
}

export interface ProductForHomePage {
    type: 'ProductTypeForHomePage';//必須先給初值避免compile的時候就判斷錯誤，之後在取得資料時還必須再放進來一次
    imagesUrl:ImagesType[],
}