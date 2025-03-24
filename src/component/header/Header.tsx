import {  NavLink } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route } from "../../type/HeaderType";
import { cartData } from "../../slice/cartSlice";
import { getCartSign } from "../../utils/utils";
// import { ActionTypes } from "../../type/ActionTypes";
export default function Header() {
  const routes:Route[] = [
    { path: "/products", name: "產品列表", id: "products" },
    // { path: "/cart", name: "購物車/訂購者資料", id: "cart" },
    { path: "/wishList", name: "心願清單", id: "wishList" },
    // { path: "/cart", name: "購物車", id: "cartSign" },
    // { path: "/orderList", name: "訂單清單", id: "orderList" },
    // { path: "/loginBackend", name: "登入後台", id: "loginBackend" },
  ];
  const {carts} = useSelector(cartData);
  //另一個寫法
  // const cartContent = useSelector((state:ActionTypes) => state.cartAtStore);
  const [isToggle, setIsToggle] = useState<boolean>(true);
  const handleToggleNavbar:()=>void = () => {
    setIsToggle((prev) => !prev);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    getCartSign(dispatch);
  }, [dispatch]);
  // 不使用原生的collapse就要用下方判斷，不然會有navbar消失的可能性
  useEffect(() => {
    const handleResize:()=>void = () => {
      if (window.innerWidth >= 768) {
        setIsToggle(true); // 畫面拉大時強制展開
      } else
        setIsToggle(false); 
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container d-flex flex-column">
      <nav className="navbar navbar-expand-md navbar-light">
        <NavLink className="navbar-brand" to="/">
        一個簡單的樂器行
        </NavLink>
        <button
          className="navbar-toggler "
          type="button"
          onClick={handleToggleNavbar}
          // 原本的collapse可以自動判斷畫面的大小然後顯示navbar，就可以搭配下面的屬性
          // data-bs-toggle={isToggle}
          // data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* 改用自訂的collapsible-content，原本的collapse好像無效 */}
        <div
          className={`collapsible-content navbar-collapse ${
            isToggle ? "show" : ""
          } justify-content-end  `}
          id="navbarNav"
        >
          <div className="navbar-nav">
            {routes.map((route) => (
              <Fragment key={route.id}>
                <NavLink
                  to={route.path}
                  className="nav-link fw-bold"
                  // aria-current="page"
                >
                  {route.name === "購物車" ? (
                    <div className="position-relative">
                      <i className="fas fa-shopping-cart"></i>
                      <span
                        className="position-absolute badge text-bg-success rounded-circle"
                        style={{
                          bottom: "12px",
                          left: "12px",
                        }}
                      >
                        {carts?.length}
                      </span>
                    </div>
                  ) : (
                    route.name
                  )}
                </NavLink>
              </Fragment>
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
