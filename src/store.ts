import { configureStore } from "@reduxjs/toolkit";
import toastReducer from './slice/toastSlice';
import cartReducer from './slice/cartSlice';
// import loginReducer from './slice/loginSlice';
// import FlashModalReducer from './slice/flashModalSlice';
import wishListReducer from './slice/wishListSlice';
 const store =  configureStore({
  reducer:{
    toastAtStore:toastReducer,
    wishListAtStore:wishListReducer,
    cartAtStore:cartReducer,
    // flashModalAtStore:FlashModalReducer,
    // loginAtStore:loginReducer//測試用的
  }
});

export default store;