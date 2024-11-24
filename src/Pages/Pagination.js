import React from "react";

const Pagination = ({
  currentPage,
  handlePagination,
  totalPages,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePagination(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md text-white font-medium ${
          currentPage === 1
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-500 hover:bg-gray-600 cursor-pointer"
        }`}
      >
        Prev
      </button>

      {/* Page Info */}
      <span className="text-lg text-black font-semibold">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => handlePagination(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-md text-white font-medium ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-gray-500 hover:bg-gray-600 cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
