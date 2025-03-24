import {CartState} from '../type/CartType';
import {ToastSliceType} from '../type/ToastType';

export const tempProductDefaultValue = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: 0,
  price: 0,
  description: "",
  content: "",
  is_enabled: false,
  imagesUrl: [""],
  buyerNumber:0
};

export const pendingProductInfoDefaluValue = {
  id:null,
  type:null
};

export const orderDefaultValue =
  {
    data: {
      create_at: "",
      is_paid: 0,
      message: "",
      products: {},
      user: {
        name: "",
        tel: "",
        email: "",
        address: "",
      },
      num: "",
    },
  };
//原本的單一toast寫法
// export const toastSliceDefaultValue = {
//   toastInfo:
//   {
//     text: '',
//     type: '',
//     isShowToast: false,
//   }
// };
// export const toastSliceDefaultValue = {
//   toastInfo:[
//     {
//     id:0,
//     text: '',
//     type: '',
//     isShowToast: false, 
//     }
//   ]
// };
export const toastSliceDefaultValue:ToastSliceType = {
  toastInfo:[
    // {
    //   id: 0,
    //   text: '',
    //   type: '',
    //   isShowToast: false,
    // },
    //不給初值，因為會導致一載入就出現
  ],
};
export const flashModalDefaultValue = {
  flashModalInfo:{
    isShowFlashModal:false,
    text:''
  }
};
export const cartDefaultValue:CartState = {
  carts:[],
  final_total:0,
  total:0
};

export const tempCouponDefaultValue = {
  title: "",
  code:"",
  due_date: "",
  percent: 100,
  is_enabled: false,
};