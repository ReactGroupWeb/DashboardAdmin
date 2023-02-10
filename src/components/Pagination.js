import React from "react";

const Pagination = ({ itemsPerPage, currentPage, totalItems, paginate }) => {
  const pageNumbers = [];
  //   console.log(itemsPerPage,totalItems,paginate)
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }
  const mouse = {cursor: "pointer"};
  //   console.log(pageNumbers);
  return (
    <nav className="bg-secondary text-light m-auto w-50 text-center">
      <ul className="pagination justify-content-center">
        <li className="page-item bg-secondary text-light"><a onClick={() => paginate(currentPage==1?currentPage:currentPage-1)} style={mouse} className={`page-link bg-secondary text-light`}><i className="fa fa-arrow-left" aria-hidden="true"></i></a></li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item bg-secondary text-light">
            <a onClick={() => paginate(number)} style={mouse} className={`page-link bg-${currentPage==number?"":"secondary"} text-light`}>
              {number}
            </a>
          </li>
        ))}
        <li className="page-item bg-secondary text-light"><a onClick={() => paginate(currentPage==pageNumbers.length?currentPage:currentPage+1)} style={mouse} className={`page-link bg-secondary text-light`}><i className="fa fa-arrow-right" aria-hidden="true"></i></a></li>
      </ul>
    </nav>
  );
};
export default Pagination;
