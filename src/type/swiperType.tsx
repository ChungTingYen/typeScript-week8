// import { Autoplay, Navigation, Pagination, Scrollbar, A11y, EffectCoverflow } 
// from "swiper/modules";
export interface SwiperProps{
    product: Product,
    swiperType:0 | 1; 
}

 interface ImagesUrlType{
    url:string,
    content?:string
}
export interface Product {
    imagesUrl: ImagesUrlType[]; 
  }

//   export interface SwiperConfig{
//     modules?: (typeof Autoplay | typeof Navigation | typeof Pagination | typeof Scrollbar | typeof A11y | typeof EffectCoverflow)[];
//     loop?: boolean,
//     autoplay?: {
//         delay: number,
//         disableOnInteraction: boolean,
//     },
//     breakpoints: {
//         [key:number]:{
//             slidesPerView: number, // 螢幕寬度小於 768px 時顯示 1 張幻燈片
//             spaceBetween: number,
//         }
//   },
//   pagination?: {
//     clickable: boolean,
//   },
//   navigation?: boolean,
//   }