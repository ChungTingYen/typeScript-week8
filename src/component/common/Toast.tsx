import { useRef, useEffect } from "react";
import { Toast } from 'bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { removeMessage } from "../../slice/toastSlice";
import { toastData } from "../../slice/toastSlice";
const { VITE_TOAST_SHOWTIME } = import.meta.env;
const ToastComponent = () => {
  const toastDivRef = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const dispatch = useDispatch();
  // const toastSlice = useSelector((state) => {
  //   return state.toastAtStore.toastInfo;
  // });
  const toastSlice = useSelector(toastData)
  useEffect(() => {
    toastSlice.forEach((message) => {
      const toastElement = toastDivRef.current[message.id];
      if (toastElement) {
        const toastInstance = new Toast(toastElement, {
          autohide: true,
          delay: parseInt(VITE_TOAST_SHOWTIME), // x秒後自動關閉
        });
        toastInstance.show();
        setTimeout(() => {
          dispatch(removeMessage(message.id));
        }, VITE_TOAST_SHOWTIME);
      }
    });
  }, [toastSlice,dispatch]);
  const closeToast = (messageId:number) => {
    // dispatch(removeMessage(messageId));
    //2種做法
    // console.log("messageId:", messageId);
    const toastElement = toastDivRef.current[messageId];
    if (toastElement) {
      const toastInstance = new Toast(toastElement);
      toastInstance.hide();
    }
  };

  return (
    <div className="toast-container position-fixed top-0 end-0 p-3">
      {toastSlice.map((message) => (
        <div
          key={message.id}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          ref={(el) => {toastDivRef.current[message.id] = el}}
        >
          <div className={`toast-body d-flex toast text-bg-${message.type}`}>
            <strong className="me-auto">
              {message.id}:{message.text}
            </strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => closeToast(message.id)}
            ></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToastComponent;
