import ReactLoading from 'react-loading';
const LoadingOverlay:React.FC = ()=>{
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(255,255,255,0.6)",
        zIndex: 999,
      }}
    >
      <ReactLoading type="spin" color="grey" width="4rem" height="4rem" />
    </div>
  );
};
export default LoadingOverlay;