// export interface RegisterRulesType{
//     [key:string]:{
//         required:string,
//         pattern?: {
//             value: RegExp,
//             message: string,
//           },
//          minLength?: {
//             value: number,
//             message: string,
//         }, 
//     }
// }

// import { RegisterOptions } from "react-hook-form";
export interface FormValues {
  email: string;
  name: string;
  tel: string;
  address: string;
  message:string;
}

