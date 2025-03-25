import { JSX, useEffect, useState } from "react";
import { apiService } from "../../apiService/apiService";
import { Product, LoadingOverlay,  } from "../../component/front";
import { Product as ProductType} from "../../type/ProductType"
const APIPath = import.meta.env.VITE_API_PATH;
interface ApiResponse {
  products: ProductType[];
}
export default function ProductsPageFromWishList() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [wishList, setWishList] = useState<string[]>([]);

  const getWishList = ():void => {
    const wishListStorage:Record<string,boolean> = JSON.parse(localStorage.getItem("wishList") || "{}") || {};
    setWishList(Object.keys(wishListStorage));
  };

  const getProducts = async ():Promise<void> => {
    setIsLoading(true);
    try {
      const {
        data: { products, }
      } = await apiService.axiosGet<ApiResponse>(`/api/${APIPath}/products/all`);
      const wishListStorage = Object.keys(
        JSON.parse(localStorage.getItem("wishList") || "{}") || {}
      );
      const newWishList = products.filter((item) =>
        item.id !== undefined &&
        wishListStorage.includes(item.id)
      );
      setProducts(newWishList);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const scroll = () => {
    window.scrollTo(0, 200);
  };
  useEffect(() => {
    getWishList();
  }, []);
  useEffect(() => {
    getProducts();
    scroll();
  }, [wishList]);
  return (
    <>
      <div className="container-fluid">
        <div
          className="position-relative d-flex align-items-center justify-content-center"
          style={{ minHeight: "400px" }}
        >
          <div
            className="position-absolute"
            style={{
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundImage:
                "url(https://images.unsplash.com/photo-1613837295512-0375f9cb6159?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              backgroundPosition: "center center",
              opacity: 0.1,
            }}
          ></div>
          <h2 className="fw-bold">心願清單</h2>
        </div>
        <div className="container mt-md-5 mt-3 mb-7">
          <div className="row">
            <div className="col-md-3">
              <div className="accordion mb-3 fw-bold" id="accordionExample">
                {products.length <= 0 ? (
                  <p>趕快加入回到商品頁加入心願商品吧~~</p>
                ) : (
                  <p>趕快手刀購買裝備吧~~</p>
                )}
              </div>
            </div>
            <div className="col-md-9">
              <div className="row">
                {products.map((product) => (
                  <Product
                    key={product.id}
                    product={product}
                    setIsLoading={setIsLoading}
                    wishList={wishList}
                    setWishList={setWishList}
                  ></Product>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingOverlay />}
    </>
  );
}
