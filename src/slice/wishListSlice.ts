import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
type WishListState = Record<string, boolean>;
const initialState: WishListState = {}; //
const wishListSlice = createSlice({
  name:'wishList',
  initialState:(()=>{
    const wishListStorage = JSON.parse(localStorage.getItem("wishList")||'{}') || {};
    return { wishListStorage };
  }),
  reducers:{
    getWishList(state,){
      const wishListStorage = JSON.parse(localStorage.getItem("wishList")||'{}') || {};
      return { ...state,...wishListStorage };
    }
  } 
});
export const { getWishList } = wishListSlice.actions;
export default wishListSlice.reducer;
export const wishListData = (state: { wishListAtStore:ReturnType<typeof wishListSlice.getInitialState> }) => state.wishListAtStore;