
import { apiService } from "../../apiService/apiService";
const APIPath = import.meta.env.VITE_API_PATH;
import { useToast } from "../../hook";
import { Cart } from '../../type/CartType';
interface CartComponentProp {
  cart: Cart,
  handleDeleteCart: (cartId: string | null) => Promise<void>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setReload: React.Dispatch<React.SetStateAction<boolean>>
}
interface PutDataType {
  data: {
    product_id: string,
    qty: number,
  }
}
const Carts = (props: CartComponentProp) => {
  const { cart, handleDeleteCart, setIsLoading, setReload } = props;
  const updateToast = useToast();
  const handleIncreDecreProduct = async (cartId: string, type: string) => {
    setIsLoading(true);
    try {
      const putData: PutDataType = {
        data: {
          product_id: cart.product_id,
          qty: type === "+" ? cart.qty + 1 : cart.qty - 1,
        },
      };
      await apiService.axiosPut(`/api/${APIPath}/cart/${cartId}`, putData);
      setReload(true);
      updateToast(`${type === "+" ? "增加商品數量完成" : "減少商品數量完成"}`, "light", true);
    } catch (error) {
      console.log(error);
      updateToast('數量變更失敗', "warning", true);
      alert(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className="border-bottom border-top">
      <th scope="row" className="border-0 px-0 font-weight-normal py-4" >
        <div className="d-flex flex-column">
          <p className="mb-0 fw-bold  d-inline-block">{cart.product.title}</p>
          <img
            src={cart.product.imageUrl}
            alt={cart.product.title}
            style={{
              width: "120px",
              height: "100px",
              objectFit: "cover",
            }}
          />
        </div>
      </th>
      <td className="border-0 align-middle" style={{ maxWidth: "120px" }}>
        <div className="input-group">
          <div className="input-group-prepend">
            <button
              className={`btn btn-outline-dark border-0 ${cart.qty <= 1 ? "bg-secondary" : ""
                }`}
              disabled={cart.qty <= 1 && true}
              type="button"
              id="button-addon1"
              onClick={() => handleIncreDecreProduct(cart.id, "-")}
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
          <div className="input-group-append">
            <span
              className="form-control border-0 text-center my-auto shadow-none"
              aria-label="Example text with button addon"
              aria-describedby="button-addon1"
            >
              {cart.qty}
            </span>
          </div>
          <div className="input-group-append">
            <button
              className="btn btn-outline-dark border-0"
              type="button"
              id="button-addon2"
              onClick={() => handleIncreDecreProduct(cart.id, "+")}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </td>
      <td className="border-0 align-middle">
        <p className="mb-0 ms-auto">NT${cart.total.toLocaleString()}</p>
      </td>
      <td className="border-0 align-middle">
        <button
          className="btn btn-outline-dark border-0"
          type="button"
          id="button-addon2"
          onClick={() => handleDeleteCart(cart.id)}
        >
          <i className="fas fa-times"></i>
        </button>
      </td>
    </tr>
  );
};

export default Carts;
