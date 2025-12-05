import React, { useContext } from "react";
import { PaginationContext } from "../../context/PaginationContext";

function PaginationShowData() {
  const { currentPage, totalPages, goToPrevPage, goToNextPage, goToPage } = useContext(PaginationContext);

  const handlePageClick = (event, page) => {
    event.preventDefault();
    goToPage(page);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-2 py-1 mx-1 rounded ${i === currentPage ? "bg-black text-white" : "bg-orange text-white hover:bg-black hover:text-orange transition-colors"}`}
          onClick={(event) => handlePageClick(event, i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-between items-center mt-8">
      <button
        className="px-4 py-2 bg-orange text-white rounded hover:bg-black hover:text-orange transition-colors disabled:opacity-50"
        onClick={goToPrevPage}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <div className="flex justify-center items-center mx-4">
        {renderPageNumbers()}
      </div>
      <button
        className="px-4 py-2 bg-orange text-white rounded hover:bg-black hover:text-orange transition-colors disabled:opacity-50"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </div>
  );
}

export default PaginationShowData;
