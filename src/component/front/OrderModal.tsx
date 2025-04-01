
import { useRef, useEffect, useState } from "react";
import { Modal } from "bootstrap";
import { useNavigatePage } from "../../hook";
import { OrderType as OrderTypeComponent} from '../../type/OrderType'
interface OrderType{
  tempProduct:OrderTypeComponent, 
  setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>, 
  isModalOpen:boolean
}

const OrderModal = (props:OrderType) => {
  const { tempProduct, setIsModalOpen, isModalOpen } = props;
  const [modalProduct, setModalProduct] = useState<OrderTypeComponent>(tempProduct);
  const navigate = useNavigatePage();
  const productModalRef = useRef<HTMLDivElement|null>(null);
  const closeProductModal = () => {
    if (productModalRef.current) { // 確保 productModalRef.current 不為 null
      const modalInstance = Modal.getInstance(productModalRef.current);
      modalInstance?.hide();
      setIsModalOpen(false);
    }
  };
  const openProductModal = () => {
    if (productModalRef.current) { // 確保 productModalRef.current 不為 null
      const modalInstance = Modal.getInstance(productModalRef.current);
      modalInstance?.show();
    }
  };
  const linkToPayment = ():void => {
    closeProductModal();
    navigate(`/payment/${modalProduct.id}`);
  };
  useEffect(() => {
    if (productModalRef.current) {
      const modalElement = productModalRef.current;
      new Modal(productModalRef.current, { backdrop: true });
      const handleClose = ():void => {
        setIsModalOpen(false);
      };
      modalElement.addEventListener("hidden.bs.modal", handleClose);
      return () => {
        modalElement.removeEventListener("hidden.bs.modal", handleClose);
      };
    }
  }, [setIsModalOpen]);

  useEffect(() => {
    if (isModalOpen) {
      if (Object.keys(tempProduct).length > 0) setModalProduct(tempProduct);
      openProductModal();
    }
  }, [isModalOpen, tempProduct]);
  return (
    <>
      <div
        id="productModal modal-lg"
        className="modal fade"
        style={{ backgroundColor: "rgba(0,0,0,0.1)" }}
        ref={productModalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content border-0 shadow">
            <div className="modal-header border-bottom">
              <span className="modal-title">訂單內容</span>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={closeProductModal}
                // data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                {/* <span className="text-success fw-bold">訂購商品資料:</span> */}
                {modalProduct !== undefined &&
                  Object.keys(modalProduct).length > 0 && (
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 ps-0">
                            商品
                        </th>
                        <th scope="col" className="border-0">
                            數量
                        </th>
                        <th scope="col" className="border-0">
                            小記
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(modalProduct.products).map(
                        ([key, value]) => (
                          <tr className="border-top" key={key}>
                            <th
                              scope="row"
                              className="border-0 px-0 font-weight-normal py-4"
                            >
                              <img
                                src={value.product?.imageUrl}
                                alt={value.product?.title}
                                style={{
                                  width: "72px",
                                  height: "72px",
                                  objectFit: "cover",
                                }}
                              />
                              <p className="mb-0 fw-bold ms-3 d-inline-block">
                                {value.product?.title}
                              </p>
                            </th>
                            <td
                              className="border-0 align-middle"
                              style={{ maxWidth: "100px" }}
                            >
                              <div className="input-group pe-5">
                                <span
                                  className="form-control border-0 text-center d-flex  justify-content-start my-auto shadow-none"
                                  aria-label="Example text with button addon"
                                  aria-describedby="button-addon1"
                                >
                                  {value.qty}
                                </span>
                              </div>
                            </td>
                            <td className="border-0 align-middle">
                              <p className="mb-0 ms-auto">
                                  NT${value.total.toLocaleString()}
                              </p>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                    <tfoot>
                      <tr className="border-top">
                        <th colSpan={2} className="text-end border-0">
                            總價
                        </th>
                        <td className="text-end border-0">
                            NT${modalProduct.total?.toLocaleString()}{" "}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                )}
              </div>
              <div
                className="modal-footer bg-light"
                style={{ borderTop: "none" }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  aria-label="Close"
                  onClick={closeProductModal}
                >
                  關閉視窗
                </button>
                {modalProduct !== undefined && !modalProduct.is_paid && (
                  <button
                    className="btn btn-primary"
                    onClick={linkToPayment}
                  >
                    前往結帳
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderModal;
