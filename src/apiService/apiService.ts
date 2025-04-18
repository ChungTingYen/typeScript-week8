import { userInstance,adminInstance } from './apiConfig'
import {AxiosResponse} from 'axios'
//下面有幾種不同的泛型結構設定，最完整的應該是axiosGetByConfig，但其他的應該都不會錯誤
export const apiService = {
  axiosGet : async <T extends object>(path:string): Promise<AxiosResponse<T>>=>{
    const response = await userInstance.get<T>(path);
    return response;
  },
  axiosPost:async<T extends object>(path:string,postData:T = {} as T)=>{
    const response = await userInstance.post(path,postData);
    return response;
  },
  axiosPostByConfig:async<T extends object,U extends object>(path:string,postData:U = {} as U): Promise<{data:T}>=>{
    const response = await userInstance.post<T>(path,postData);
    return {data:response.data} ;
  },
  axiosGetByConfig : async <T extends object,U extends object> (path:string,config:U):Promise<{data:T}>=>{
    const response = await userInstance.get<T>(path,config);
    return {data:response.data} ;
  },
  axiosDelete:async <T extends object>(path:string)=>{
    const response = await userInstance.delete(path);
    return response;
  },
  axiosPut:async <T extends object> (path:string,putData:T = {} as T)=>{
    const response = await userInstance.put(path,putData);
    return response;
  }
};

export const apiServiceAdmin = {
  axiosGet : async (path:string)=>{
    const response = await adminInstance.get(path);
    return response;
  },
  axiosPost:async<T extends object>(path:string,postData:T={} as T)=>{
    const response = await adminInstance.post(path,postData);
    return response;
  },
  axiosDelete:async(path:string)=>{
    const response = await adminInstance.delete(path);
    return response;
  },
  axiosPut:async<T extends object>(path:string,putData:T={} as T)=>{
    const response = await adminInstance.put(path,putData);
    return response;
  },
  axiosGetProductData : async(path:string)=>{
    const response = await adminInstance.get(path);
    return response;
  },
  axiosGetProductDataByConfig : async<T extends object>(path:string,config:T={} as T)=>{
    const response = await adminInstance.get(path,  config ) || {};
    return response;
  },
  axiosPostSignin : async<T extends object>(path:string,account:T={} as T) =>{
    const response = await adminInstance.post(path, account);
    return response;
  },
  axiosPostCheckSingin : async(path:string) =>{
    const response = await adminInstance.post(path,{},);
    return response;
  },
  axiosPostAddProduct : async<T extends object>(path:string,productData:T={} as T) =>{
    const response = await adminInstance.post(path,productData);
    return response;
  },
  axiosDeleteProduct : async(path:string) =>{
    const response = await adminInstance.delete(path);
    return response;
  },
  axiosPostImg : async<T extends object>(path:string,putData:T={} as T)=>{
    const response = await adminInstance.post(path,putData);
    return response;
  },
  axiosPutProduct : async<T extends object>(path:string,putData:T={} as T)=>{
    const response = await adminInstance.put(path,putData);
    return response;
  },
  axiosPostLogout : async(path:string) =>{
    const response = await adminInstance.post(path,{});
    return response;
  }
};
