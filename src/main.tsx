
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./router";
import "bootstrap/dist/js/bootstrap.js";
import store from "./store";
import "./assets/all.scss";
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
