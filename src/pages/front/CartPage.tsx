import { useEffect, useState, useCallback,useRef } from "react";
import { apiService } from "../../apiService/apiService";
import { Link } from "react-router-dom";
import { Carts, LoadingOverlay } from "../../component/front";
import { clearCartSlice } from "../../slice/cartSlice";
const APIPath = import.meta.env.VITE_API_PATH;
import { getCartSign } from "../../utils/utils";
import { useDispatch } from "react-redux";
import { useToast } from "../../hook";
import { CartState } from '../../type/CartType';
interface CartDataState{
  data:CartState,
  [key: string]: any; // 允許其他未知屬性
}
export default function CartPage() {
  const [cart, setCart] = useState<CartState|null>(null);
  const [reload, setReload] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const updateToast = useToast();
  const dispatch = useDispatch();
  const couponRef = useRef<HTMLInputElement>(null);
  const [isCouponPrice,setIsCouponPrice] = useState<boolean>(false);
  const handleDeleteCart = useCallback(async (cartId:string|null = null): Promise<void> => {
    //如果有cardId就是刪除一個，沒有就是刪除全部
    const path = `api/${APIPath}/cart` + (cartId ? `/${cartId}` : "s");
    setIsLoading(true);
    try {
      await apiService.axiosDelete(path);
      setReload(true);
      updateToast("刪除完成", "light", true);
      cartId === null ? dispatch(clearCartSlice()) : getCartSign(dispatch);
    } catch (error) {
      console.log(error);
      alert(error);
      updateToast("刪除失敗", "light", true);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch,updateToast]);
  const getCart = async ():Promise<void> => {
    try {
      const {
        data: { data },
      } :{data:CartDataState}= await apiService.axiosGet<CartDataState>(`/api/${APIPath}/cart`);
      console.log('data:',data)
      setCart(data);
      setIsCouponPrice(!!(data?.carts?.[0]?.coupon));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCoupon = async():Promise<void>=>{
    const putData: { data: { code: string } } = {
      data:{
        code: couponRef.current?.value ?? ''
      }
    };
    try {
      await apiService.axiosPost(`/api/${APIPath}/coupon`,putData);
      updateToast('已套用優惠券', "light", true);
      setIsCouponPrice(true);
      setReload(true);
      setIsLoading(true);
    } catch (error) {
      updateToast(`套用優惠券失敗:` + error, "light", true);
      console.log(error);
    }
  };
  useEffect(() => {
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
                <ul className="list-unstyled mb-0 ms-md-auto d-flex align-items-center justify-content-between justify-content-md-end w-100 mt-md-0">
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-check-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">訂購開始</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">購物車</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">收件人資料</span>
                  </li>
                  <li className="me-md-6 me-3 position-relative custom-step-line">
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">建立訂單</span>
                  </li>
                  <li>
                    <i className="fas fa-dot-circle d-md-inline d-block text-center"></i>
                    <span className="text-nowrap ms-1">結帳</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-10">
              <h3 className="fw-bold mb-4 pt-3">購物車</h3>
            </div>
          </div>
          <div className="row flex-row justify-content-center pb-5">
            <div className="col-md-6">
              {cart?.carts && cart.carts.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="border-0 ps-0"
                        style={{ width: "40%" }}
                      >
                        商品
                      </th>
                      <th
                        scope="col"
                        className="border-0"
                        style={{ width: "45%" }}
                      >
                        數量
                      </th>
                      <th
                        scope="col"
                        className="border-0"
                        style={{ width: "10%" }}
                      >
                        總價
                      </th>
                      <th
                        scope="col"
                        className="border-0"
                        style={{ width: "10%" }}
                      >
                        刪除
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.carts.map((cart) => (
                      <Carts
                        key={cart.id}
                        cart={cart}
                        handleDeleteCart={handleDeleteCart}
                        setIsLoading={setIsLoading}
                        setReload={setReload}
                      />
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-danger fw-bold">購物車沒有商品</p>
              )}
              {cart?.carts && cart.carts?.length > 0 && (
                <div className=''>
                  {isCouponPrice ? <div className=""><span className="text-success fw-bold">已套用優惠券</span></div> : ''}
                  <div className="d-flex">
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                        placeholder="不給你用折扣碼"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                        ref={couponRef}
                        defaultValue={isCouponPrice ? cart.carts[0]?.coupon?.code : ''}
                        disabled={isCouponPrice}
                      />
                      <div className="input-group-append">
                        <button
                          className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                          type="button"
                          id="button-addon2"
                          onClick={handleCoupon}
                          disabled={isCouponPrice}
                        >
                          <i className="fas fa-paper-plane"></i>
                        </button>
                      </div>
                    </div>
                    <div className="input-group w-50 mb-3">
                      <button
                        className="btn border-bottom border-top-0 btn-dark ms-auto"
                        type="button"
                        onClick={() => handleDeleteCart()}
                        disabled={cart.carts?.length <= 0}
                      >
                    刪除購物車
                      </button>
                    </div>
                  </div>
                </div>
                
              )}
              <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                <Link to="/products" className="text-dark mt-md-0 mt-3 fw-bold">
                  <i className="fas fa-chevron-left me-2"></i>
                  回到產品頁
                </Link>
                {cart?.carts && cart.carts?.length > 0 ? (
                  <Link to="/checkout" className="btn btn-dark py-3 px-5">
                    填寫收件人資訊
                  </Link>
                ) : (
                  <button className="btn btn-dark py-3 px-5" disabled>
                    填寫收件人資訊
                  </button>
                )}
              </div>
            </div>
            <div className="col-md-4">
              <div className="border p-4 mb-4">
                <h4 className="fw-bold mb-4">訂單資訊</h4>
                <table className="table text-muted border-bottom">
                  <tbody>
                    <tr>
                      <th
                        scope="row"
                        className="border-0 px-0 pt-4 font-weight-normal"
                      >
                        小計
                      </th>
                      <td className="text-end border-0 px-0 pt-4">
                        NT${cart?.total && cart.total.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className='d-flex justify-content-between mt-4'>
                  <p className={`mb-0 h4 fw-bold ${isCouponPrice && 'del del-text'}`}>總價 NT$
                    {cart?.total && cart.total.toLocaleString()}</p>
                </div>
                {isCouponPrice && 
                <div className="d-flex justify-content-between mt-4">
                  <p className="mb-0 h4 fw-bold">折扣碼優惠價 NT$
                    {cart?.final_total && cart.final_total.toLocaleString()}</p>
                </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
