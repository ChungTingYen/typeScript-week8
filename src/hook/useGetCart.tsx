import { useDispatch } from "react-redux";
import { useCallback } from 'react';
import {  PayloadAction } from "@reduxjs/toolkit";
import { apiService } from "../apiService/apiService";
import {CartState} from '../type/CartType'
const APIPath = import.meta.env.VITE_API_PATH;
interface ApiResponse {
    data: CartState;
}
function useGetCart(sliceMethod:(payload:CartState) => PayloadAction<CartState>){
  const dispatch = useDispatch();
  const getCart = useCallback (async () => {
    try {
      const {
        data: { data },
      }:{data:ApiResponse} = await apiService.axiosGet(`/api/${APIPath}/cart`);
      dispatch(sliceMethod(data));
    } catch (error) {
      console.log(error);
    } 
  },[dispatch,sliceMethod]);
  return getCart;
};
export default useGetCart;