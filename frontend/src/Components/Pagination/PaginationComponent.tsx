import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationComponentProps {
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
  totalProducts: number;
  productsPerPageLimit: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  num,
  setNum,
  totalProducts,
  productsPerPageLimit,
}: PaginationComponentProps) => {
  const totalPages = Math.ceil(totalProducts / productsPerPageLimit);
  const maxVisiblePages = 5; // Adjust the number of visible pages as needed

  let startPage = Math.max(num - Math.floor(maxVisiblePages / 2), 1);
  let endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  function handlePageClick(page: number) {
    setNum(page);
  }

  function handleNext() {
    setNum((prevNum) => Math.min(prevNum + 1, totalPages));
  }

  function handleBack() {
    setNum((prevNum) => Math.max(prevNum - 1, 1));
  }

  return (
    <div className="flex items-center justify-center mt-5">
      <button
        onClick={handleBack}
        disabled={num === 1}
        className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:pointer-events-none"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>
      {startPage > 1 && (
        <>
          <button
            key={1}
            onClick={() => handlePageClick(1)}
            className={`px-3 py-1 rounded-md ${
              num === 1 ? "bg-indigo-600 text-white" : "hover:bg-indigo-200"
            }`}
          >
            1
          </button>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 rounded-md ${
              num === page ? "bg-indigo-600 text-white" : "hover:bg-indigo-200"
            }`}
          >
            {page}
          </button>
        );
      })}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-2">...</span>}
          <button
            key={totalPages}
            onClick={() => handlePageClick(totalPages)}
            className={`px-3 py-1 rounded-md ${
              num === totalPages
                ? "bg-indigo-600 text-white"
                : "hover:bg-indigo-200"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        onClick={handleNext}
        disabled={num === totalPages}
        className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:pointer-events-none"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default PaginationComponent;
