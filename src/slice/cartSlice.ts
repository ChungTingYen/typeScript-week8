import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartDefaultValue } from '../data/defaultValue';
import { CartState } from '../type/CartType';
export const cartSlice = createSlice({
  name:'cartSlice',
  initialState:cartDefaultValue as CartState,
  reducers:{
    updateCartSlice(state,action:PayloadAction<CartState>){
      return action.payload;
      // const { carts,total,final_total } = action.payload;
      // state.carts = carts;
      // state.total = total;
      // state.final_total = final_total;
    },
    clearCartSlice(state){
      Object.assign(state, cartDefaultValue); 
    }
  }
})

export const { clearCartSlice,updateCartSlice }  = cartSlice.actions;
export default cartSlice.reducer;
export const cartData = (state: { cartAtStore:ReturnType<typeof cartSlice.getInitialState> }) => state.cartAtStore;