import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
// import { Toast, FlashModal } from "./component/common";
import router from "./router";
import "bootstrap/dist/js/bootstrap.js";
import store from "./store";
import "./assets/all.scss";
import App from "./App";
// 如果你能保證 document.getElementById("root") 
// 一定會返回一個 DOM 元素（比如 HTML 文件中已經定義了該元素），
// 可以使用 TypeScript 的非空斷言運算符 !，跳過 TypeScript 的型別檢查
createRoot(document.getElementById("root")!).render(
  <App/>
);
