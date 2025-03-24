import { useDispatch } from "react-redux";
import { setIsShowToastSlice, } from "../slice/toastSlice";
import { useCallback } from "react";
interface updateToastInfoType{
  text: string,
  type:string,
  isShowToast: boolean,
}
const useToast = ()=>{
  const dispatch = useDispatch();
  const updateToastInfo = useCallback((
    text:updateToastInfoType['text'],
    type:updateToastInfoType['type'],
    isShowToast:updateToastInfoType['isShowToast'],
  )=>{
    const id = Date.now();
    dispatch(setIsShowToastSlice({
      id,
      text: text,
      type:type,
      isShowToast: isShowToast,
    }));
  },[dispatch,]);

  return updateToastInfo;
};
export default useToast;