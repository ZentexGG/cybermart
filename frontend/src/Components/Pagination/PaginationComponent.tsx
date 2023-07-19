import React from "react";

interface PaginationComponentProps {
  num: number;
  setNum: React.Dispatch<React.SetStateAction<number>>;
}

export default function PaginationComponent({
  num,
  setNum,
}: PaginationComponentProps) {
  const totalPages = 10000;
  const startPage = Math.max(Math.min(num - 3, totalPages - 6), 1);
  const endPage = Math.min(startPage + 6, totalPages);

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
    <div className="flex rounded-lg font-[Poppins] max-w-screen items-center justify-center my-5 duration-1000">
      <button
        onClick={handleBack}
        className="h-12 border-2 border-r-0 border-indigo-600 px-4 rounded-l-lg hover:bg-indigo-600 hover:text-white">
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"></path>
        </svg>
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const page = startPage + index;
        return (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`h-12 border-2 border-r-0 border-indigo-600 w-12 ${
              num === page ? "bg-indigo-600 text-white" : ""
            }`}>
            {page}
          </button>
        );
      })}
      <button
        onClick={handleNext}
        className="h-12 border-2  border-indigo-600 px-4 rounded-r-lg hover:bg-indigo-600 hover:text-white">
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"></path>
        </svg>
      </button>
    </div>
  );
}
