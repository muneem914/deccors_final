import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
// import Pagination from "react-js-pagination";
import Pagination from '@mui/material/Pagination';

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState(1);
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (event, pageNumber) => {
    setCurrentPage(pageNumber);
    if (searchParams.has("page")) {
      searchParams.set("page", pageNumber);
    } else {
      searchParams.append("page", pageNumber);
    }

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  return (
    <div className="d-flex justify-content-center my-5">
       {filteredProductsCount > resPerPage && (
        <Pagination
          count={Math.ceil(filteredProductsCount / resPerPage)}
          page={currentPage}
          onChange={setCurrentPageNo}
          // variant="outlined"
          // shape="rounded"
          color="info"
          showFirstButton
          showLastButton
        />
      )}
    </div>
  );
};
export default CustomPagination;