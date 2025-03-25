import { memo } from "react";
import { PaginationCompoentType } from "../../type/PaginationType"

const Pagination:React.FC<PaginationCompoentType> = (props) => {
  const { getData, pageInfo } = props;
  const handlePageChange = (e:React.MouseEvent<HTMLAnchorElement>, page:number):void => {
    e.preventDefault();
    if(!pageInfo || page === pageInfo.current_page) 
      return;
    getData(page);
    // 滾動到文件高度的40%
    let scrollPercentage = 0.1;
    let scrollHeight = document.documentElement.scrollHeight;
    scrollHeight > 1000
      ? window.scrollTo(0, scrollPercentage * scrollHeight)
      : window.scrollTo(0, 0);
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${!pageInfo?.has_pre && "disabled"}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => handlePageChange(e, (pageInfo?.current_page ?? 0) + 1)}
              >
                上一頁
              </a>
            </li>
            {Array.from({ length: pageInfo?.total_pages?? 0 }).map((_, index) => {
              return (
                <li
                  className={`page-item ${
                    pageInfo?.current_page === index + 1 && "active"
                  } `}
                  key={index + 1}
                >
                  <a
                    className="page-link"
                    onClick={(e) => handlePageChange(e, index + 1)}
                    href="#"
                  >
                    {index + 1}
                  </a>
                </li>
              );
            })}
            <li className={`page-item ${!pageInfo?.has_next && "disabled"}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => handlePageChange(e, (pageInfo?.current_page ?? 0) + 1)}
              >
                下一頁
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};
export default memo(Pagination);
