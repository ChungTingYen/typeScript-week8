import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
function useNavigatePage(defaultPath:string = '/'){
  const navigate = useNavigate();
  const gotoPage:(path:string)=>void = useCallback( (path:string)=>{
    path ? navigate(path) : navigate(defaultPath);
  },[defaultPath,navigate]);
  return gotoPage;
}

export default useNavigatePage ;