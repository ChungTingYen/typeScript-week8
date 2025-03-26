import Swal from "sweetalert2";

// export const  setToastContent = (setIsShowToast,toastInfo,toastText,type) => {
//   setIsShowToast(true);
//   toastInfo.toastText = toastText;
//   toastInfo.type = type;
// };
type SwalProps = {
  title: string,
  text: string,
  icon: "success" | "error" | "warning" | "info" | "question", // 限制為 SweetAlert2 支援的值
  confirmButtonText: string;
};
export const sweetalert = (props: SwalProps) :void  => {
  Swal.fire(props);
};
//2種寫法
// export const sweetalert2 = (
//   title:SwalProps['title'],text:SwalProps['text'],icon:SwalProps['icon'],
//   confirmButtonText:SwalProps['confirmButtonText']) :void => {
//   const swalObject = {title,text,icon,confirmButtonText}
//   Swal.fire(swalObject);
// };
import axios from 'axios';
import { apiServiceAdmin } from '../apiService/apiService';

const APIPath = import.meta.env.VITE_API_PATH;

// export const getHeadersFromCookie = ()=>{
//   const  token =  document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("hexToken="))
//     ?.split("=")[1] || null;
//   const headers = {
//     Authorization: token,
//   };
//   return headers;
// };

// export async function deleteProductsSequentially(productData) { 
//   const results = []; 
//   const headers = getHeadersFromCookie();
//   for (const [index, data] of productData.entries()) { 
//     // console.log(`index=${index}`); 
//     // console.log("headers=", headers); 
//     try { 
//       await apiServiceAdmin.axiosDeleteProduct( `/api/${APIPath}/admin/product/${data.id}`, 
//         headers ); 
//     } catch (error) { 
//       console.error(`Error adding product index ${index}, ${data.id}:`, error);
//       const errorMessage = `Error adding product ${data.id}:`;
//       results.push(errorMessage); 
//       // 或其他適當的錯誤處理方式 
//     } 
//   } return results; 
// }

// export async function AddProductsSequentially(productData) { 
//   const results = []; 
//   const headers = getHeadersFromCookie();
//   for (const [index, data] of productData.entries()) { 
//     const wrapData = { data:{ ...data,buyerNumber:100 } };
//     // const wrapData = { data: temp };
//     try { 
//       await apiServiceAdmin.axiosPostAddProduct(
//         `/api/${APIPath}/admin/product`,
//         wrapData,
//         headers
//       );
//     } catch (error) { 
//       console.error(`Error adding product index ${index}, ${data.id}:`, error);
//       const errorMessage = `Error adding product ${data.id}:`;
//       results.push(errorMessage); 
//       // 或其他適當的錯誤處理方式 
//     } 
//   } return results; 
// }

// export const modalStatus = (appModalRef,imgAlt, modalImg, toggleFooter) => {
//   appModalRef.current.setImgAlt(imgAlt);
//   appModalRef.current.setModalImage(modalImg);
//   appModalRef.current.toggleFooter(toggleFooter);
//   appModalRef.current.open();
// };

import { apiService } from '../apiService/apiService';
import { updateCartSlice } from '../slice/cartSlice';
import { Dispatch } from "@reduxjs/toolkit";
import { Cart,CartState } from '../type/CartType';
interface CartDataState{
  data:CartState
}
export const getCartSign = async (dispatch:Dispatch) => {
  try {
    const {
      data: { data },
    } = await apiService.axiosGet<CartDataState>(`/api/${APIPath}/cart`);
    if (data) {
      dispatch(updateCartSlice(data));
    }
  } catch (error) {
    console.log(error);
  }
};
