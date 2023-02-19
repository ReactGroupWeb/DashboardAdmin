import React from "react";

const Pagination = ({ itemsPerPage, currentPage, totalItems, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++)
    pageNumbers.push(i);
  
  return (
    <nav className="bg-secondary text-light m-auto w-50 text-center">
      <ul className="pagination justify-content-center">
        {currentPage==1?"":<li className="page-item bg-secondary text-light"><a onClick={() => paginate(currentPage-1)} className={`mouse page-link bg-secondary text-light`}><i className="fa fa-arrow-left" aria-hidden="true"></i></a></li>}
        {pageNumbers.map((number) => (<li key={number} className="page-item bg-secondary text-light"><a onClick={() => paginate(number)} className={`mouse page-link ${currentPage==number?"bg-dark":"bg-secondary"} text-light`}>{number}</a></li>))}
        {currentPage==pageNumbers.length?"":<li className="page-item bg-secondary text-light"><a onClick={() => paginate(currentPage+1)} className={`mouse page-link bg-secondary text-light`}><i className="fa fa-arrow-right" aria-hidden="true"></i></a></li>}
      </ul>
    </nav>
  );
};
export default Pagination;
