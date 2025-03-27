import { useState, useEffect, Fragment } from "react";
import { apiService } from "../../apiService/apiService";
import {
  LoadingOverlay,
  CustomerInfo,
  CustomerInfoWithNoCartNavbar,
} from "../../component/front";
import { CartState } from '../../type/CartType';
const APIPath = import.meta.env.VITE_API_PATH;
interface CartDataState{
  data:CartState,
}
export default function CheckoutFormPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cart, setCart] = useState<CartState|null>(null);
  const [reload, setReload] = useState<boolean>(true);
  useEffect(() => {
    const getCart = async ():Promise<void> => {
      try {
        const {
          data: { data },
        } = await apiService.axiosGet<CartDataState>(`/api/${APIPath}/cart`);
        setCart(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (reload) {
      getCart();
      setReload(false);
    }
  }, [reload]);
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="row justify-content-center ">
            <div className="col-md-10 d-flex d-flex align-items-center justify-content-between">
              <div>
                <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0 mt-4">
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">訂購開始</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">購物車</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">收件人資料</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">建立訂單</span>
                  </li>
                  <li>
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">付款</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <h3 className="fw-bold mb-4 pt-3">收件人資訊</h3>
            </div>
          </div>
          <div className="row flex-row-reverse justify-content-center pb-5">
            <div className="col-md-4">
              {cart?.carts && cart.carts?.length > 0 && (
                <div className="border p-4 mb-4">
                  {cart.carts?.map((cart) => (
                    <Fragment key={cart.id}>
                      <div className="d-flex mt-2">
                        <div style={{ width: '240px', height: '100px', overflow:'hidden' }}>
                          <img
                            src={cart.product.imageUrl}
                            alt={cart.product.title}
                            className="me-2"
                            style={{
                              width: '100%', height: '100%', 
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div className="w-100 ms-2">
                          <div>
                            <div className="mb-0 fw-bold">
                              {cart.product.title}
                            </div>
                            <div className="mb-0">
                              NT${cart.final_total.toLocaleString()}
                            </div>
                          </div>
                          <p className="mb-0 fw-bold">數量:{cart.qty}</p>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                  <hr />
                  <div className="d-flex justify-content-between mt-4">
                    <p className="mb-0 h4 fw-bold">總計</p>
                    <p className="mb-0 h4 fw-bold">
                      NT${cart.final_total && cart.final_total.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-6">
              {cart?.carts && cart.carts?.length > 0 ? (
                <CustomerInfo
                  setIsLoading={setIsLoading}
                  setReload={setReload}
                />
              ) : (
                <CustomerInfoWithNoCartNavbar />
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
