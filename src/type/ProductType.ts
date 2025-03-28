export interface Product {
    type: 'ProductType';
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
    type: 'ProductTypeForHomePage';
    imagesUrl:ImagesType[],
}