export interface ToastInfoType{
    id:number,
    text: string,
    type: string,
    isShowToast: boolean, 
}

export interface ToastSliceType {
    toastInfo:ToastInfoType[]
}