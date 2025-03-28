
import { Swiper as SwiperReact, SwiperSlide } from "swiper/react";
import { useSwiperRender } from '../../hook';
import { SwiperProps, } from '../../type/swiperType'
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { useEffect } from "react";
const SwiperComponent = (props:SwiperProps) => {
  const { product,swiperType } = props;
  const { shouldRenderSwiper,swiperConfig,key  } = useSwiperRender(product,swiperType);
  const swiperSlide = ()=>{
    if(swiperType === 0 && product.type==='ProductTypeForHomePage'){
      return (
        product.imagesUrl
          ?.filter((image) => image.url !== "")
          .map((image, index) => (
            <SwiperSlide key={index}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 mt-3 fw-bold">
                    <p className="">{image.content}</p>
                  </div>
                  <div
                    className="col-lg-8"
                    style={{ width: "100%", height: "500px" }}
                  >
                    <img
                      src={image.url}
                      alt={`Slide ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover", // 圖片充滿容器並保持比例
                        overflow: "hidden",
                      }}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))
        )
    }
    else if(swiperType === 1 && product.type==='ProductType'){
      return (
          product.imagesUrl 
          ?.filter((image) => image !== "")
          .map((image, index) => (
            <SwiperSlide key={index} style={{
              display: window.innerWidth < 768 || swiperConfig.breakpoints[768].slidesPerView === 1 ? 'flex' : 'block',
              justifyContent: window.innerWidth < 768  || swiperConfig.breakpoints[768].slidesPerView === 1 ? 'center' : 'unset',
              alignItems: window.innerWidth < 768  || swiperConfig.breakpoints[768].slidesPerView === 1 ? 'center' : 'unset' 
            }}>
              <div style={{ width: "250px", height: "250px" , position: "relative" ,  }}>
                <p className="fw-bold" 
                  style={{
                    position: "absolute", 
                    top: 0, 
                    zIndex: 1, backgroundColor: "rgba(255, 255, 255, 0.7)", padding:'5px' 
                  }}>圖片{index + 1}</p>
                <img
                  src={image}
                  alt={`Slide${index + 1}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 圖片充滿容器並保持比例
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                />
              </div>
            </SwiperSlide>
      )))
    }
  }
  return (
    <>
      {swiperType ?  <p className="badge text-bg-success fs-5">產品細節</p> : "" }
      {(shouldRenderSwiper) && (
        <div className="swiper-container mt-1 mb-3">
          <SwiperReact {...swiperConfig} key={key} >
            {swiperSlide()}
          </SwiperReact>
        </div>
      )}
    </>
  );
};

export default SwiperComponent;
