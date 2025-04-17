import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { toastSliceDefaultValue } from '../data/defaultValue';
import { ToastInfoType } from '../type/ToastType';
import { useMemo } from "react";
export const toastSlice = createSlice({
  name:'toastSlice',
  initialState:
    toastSliceDefaultValue,
  reducers:{
    setIsShowToastSlice(state,action:PayloadAction<ToastInfoType>){
      const { text,type,isShowToast ,id} = action.payload;
      //移動到useToast產生
      // const id = Date.now();
      state.toastInfo.push({ id,text,type,isShowToast });
    },
    removeMessage(state,action:PayloadAction<number>){
      const messageId = action.payload;
      const index = state.toastInfo.findIndex((message)=>message.id === messageId);
      if(index !== -1){
        state.toastInfo.splice(index,1);
      }
    }
  }
});

export const { setIsShowToastSlice,removeMessage }  = toastSlice.actions;
export default toastSlice.reducer;
export const toastData = (state: { toastAtStore:ReturnType<typeof toastSlice.getInitialState> }) => state.toastAtStore.toastInfo;