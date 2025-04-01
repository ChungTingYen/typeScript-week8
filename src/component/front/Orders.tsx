
import { memo } from "react";
import {OrderType} from  '../../type/OrderType'
interface OrderComponentType{
  order:OrderType,
  width:string,
  handleOpenOrderModal:(orderId:string)=>void
}
const Orders:React.FC<OrderComponentType> = (props) => {
  const { order,width, handleOpenOrderModal} = props;
  const atOpenOrderMOdal = (orderId:string) => {
    handleOpenOrderModal(orderId)
  };
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
  return (
    <>
    <div className="col-md-4" key={order.id}>
                      <div className="">
                        <div
                          className="card border-1 mb-4 p-2 position-relative bg-light text-black mx-auto"
                          style={{
                            // width: "230px",
                            width: parseInt(width, 10),
                            height: "120px",
                            cursor: "pointer",
                          }}
                          onClick={() => atOpenOrderMOdal(order.id)}
                        >
                          <span>{order.id}</span>
                          <div className="card-body p-0">
                            <p className="card-text mb-0">
                              {handleCreateTime(order.create_at)}
                            </p>
                          </div>
                          <div className="card-body p-0">
                            <p className="card-text mb-0">
                              NT${order.total?.toLocaleString()}
                            </p>
                          </div>
                          <div className="card-body p-0">
                            <p
                              className={`card-text mb-0 ${
                                order.is_paid ? "text-success" : "text-danger"
                              }`}
                            >
                              {order.is_paid ? "已付款" : "未付款"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
      {/* <tr>
        <th scope="row">{order.id}</th>
        <td>
          <span className={!order.is_paid ? "text-danger fw-bold fs-4" : ""}>
            {order.is_paid ? "已付款" : "未付款"}
          </span>
        </td>
        <td>NT${order.total?.toLocaleString()}</td>
        <td>
          <div className="d-flex">
            <button
              type="button"
              className="btn btn-warning mx-1"
              onClick={atOpenOrderMOdal}
            >
            結帳
            </button>
          </div>
        </td>
      </tr> */}
    </>
  );
};

export default memo(Orders);
