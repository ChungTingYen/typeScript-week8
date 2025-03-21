import { Outlet } from "react-router-dom";
import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
export  const FrontLayout:React.FC =()=> {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
export default FrontLayout;