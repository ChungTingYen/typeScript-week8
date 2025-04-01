import { useCallback, useEffect, useState } from "react";
import { LoadingOverlay, Pagination, OrderModal,Orders } from "../../component/front";
import { apiService } from "../../apiService/apiService";
const APIPath = import.meta.env.VITE_API_PATH;
import {OrderType} from '../../type/OrderType'
import {Pagination as PaginationType } from '../../type/PaginationType'
interface ApiResponse {
  orders: OrderType[];
  pagination: PaginationType;
  [key: string]: any; // 允許其他未知屬性
}
export default function OrderListsPage() {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<PaginationType>({
    total_pages: 1,
    current_page: 1,
    has_pre: false,
    has_next: false,
    category: ''
  });
  const [tempOrder, setTempOrder] = useState<OrderType>();
  const [isOrderModalOpen, setIsOrderModalOpen] = useState<boolean>(false);
  const [width, setWidth] = useState<string>(
    window.innerWidth <= 568 ? `${window.innerWidth * 0.1}px` : "230px"
  );
  const handleCreateTime = (time:number) => {
    const timestamp = time * 1000;
    const date = new Date(timestamp);
    const options:Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Taipei",
    };
    const taiwanTime = date
      .toLocaleString("zh-TW", options)
      .replace(/\//g, "-");
    return taiwanTime;
  };
  const openProductDetailModal = ():void => {
    setIsOrderModalOpen(true);
  };
  const handleOpenOrderModal = useCallback((OrderId:string):void => {
      const temp = orders.find((item) => item.id === OrderId);
      setTempOrder(temp);
      openProductDetailModal();
      setIsLoading(false);
    },
    [orders]
  );

  const getOrders = useCallback(async (page:number = 1):Promise<void> => {
    setIsLoading(true);
    try {
      const {
        data: { orders, pagination },
      } = await apiService.axiosGetByConfig<ApiResponse,{params:{page:number}}>(`/api/${APIPath}/orders`, {
        params: { page: page },
      });
      setOrders(
        orders
          .filter((order) => order.id !== undefined && order.id !== null)
          .sort((a, b) => {
            return new Date(b.create_at).getTime() - new Date(a.create_at).getTime();
          })
      );
      setPageInfo(pagination);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  },[]);
  useEffect(() => {
    getOrders();
  }, [getOrders]);
  const handleResize = ():void => {
    const newWidth =
      window.innerWidth <= 768 ? `${window.innerWidth * 0.8}px` : "230px";
    setWidth(newWidth); // 更新狀態
  };
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <div className="mb-4">
            <h3 className="">您的訂單</h3>
          </div>
          {orders.length > 0 ? (
            <>
              <div className="container mt-md-5 mt-3 mb-7">
                <div className="row">
                  {orders.map((order) => (
                    <Orders key={order.id} order={order} width={width} handleOpenOrderModal={handleOpenOrderModal} />
                  ))}
                </div>
              </div>
              <Pagination getData={getOrders} pageInfo={pageInfo} />
            </>
          ) : (
            <h1>沒有訂單或訂單載入中</h1>
          )}
          {isLoading && <LoadingOverlay />}
        </div>
      </div>
      {/* <OrderModal
        tempProduct={tempOrder}
        isProductModalOpen={isOrderModalOpen}
        setIsProductModalOpen={setIsOrderModalOpen}
      /> */}
      {tempOrder && (
        <OrderModal
          tempProduct={tempOrder}
          isModalOpen={isOrderModalOpen}
          setIsModalOpen={setIsOrderModalOpen}
        />
      )}
    </>
  );
}
