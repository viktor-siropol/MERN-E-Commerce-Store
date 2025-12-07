import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { 
  FaUser, 
  FaStar, 
  FaBox, 
  FaArrowLeft, 
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa"; 

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  const { data: allProducts = [], isLoading, isError } = useAllProductsQuery();


  const { paginatedProducts, totalPages } = useMemo(() => {
    if (!allProducts || allProducts.length === 0) {
      return { paginatedProducts: [], totalPages: 0 };
    }
    
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = allProducts.slice(startIndex, endIndex);
    
    return { paginatedProducts, totalPages };
  }, [allProducts, currentPage, itemsPerPage]);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };


  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  if (isLoading) {
    return (
      <div className="container mx-[9rem] flex justify-center items-center h-64">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-[9rem] text-red-500">
        Error loading products. Please try again.
      </div>
    );
  }

  return (
    <>
      <div className="container mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3 w-full">
            <div className="ml-[2rem] mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="text-2xl font-bold mb-4 sm:mb-0">
                All Products ({allProducts.length})
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <span className="text-gray-300 mr-2">Show:</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1); 
                    }}
                    className="bg-[#151515] text-white border border-gray-700 rounded px-3 py-1"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                
                <div className="text-gray-300">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} - {
                    Math.min(currentPage * itemsPerPage, allProducts.length)
                  } of {allProducts.length}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              {paginatedProducts.length === 0 ? (
                <div className="text-center text-gray-400 py-8">
                  No products found.
                </div>
              ) : (
                paginatedProducts.map((product) => (
                  <Link
                    key={product._id}
                    to={`/admin/product/update/${product._id}`}
                    className="block overflow-hidden bg-[#151515] rounded-xl hover:bg-gray-750 transition-colors duration-200 shadow-lg hover:shadow-xl border border-gray-700"
                  >
                    <div className="flex p-4">
                      <div className="flex-shrink-0 mr-6">
                        <div className="h-40 w-40 overflow-hidden rounded-lg relative"> 
                          <img
                            src={product.image}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-fill" 
                          />
                        </div>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h5 className="text-xl font-bold text-white mb-1">
                              {product?.name}
                            </h5>
                            <p className="text-gray-300 text-sm font-medium">
                              {product?.brand || "No brand"}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-gray-400 text-xs mb-1">
                              {moment(product.createdAt).format("MMM Do, YYYY")}
                            </p>
                            <p className="text-pink-500 font-bold text-lg">
                              ${product?.price}
                            </p>
                          </div>
                        </div>

                        <div className="mb-4">
                          <p className="text-gray-400 text-sm leading-relaxed">
                            {product?.description?.substring(0, 180)}...
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-4 text-gray-400 text-sm">
                            <span className="flex items-center">
                              <FaBox className="w-4 h-4 mr-1" /> 
                              In Stock: {product?.countInStock}
                            </span>
                            <span className="flex items-center">
                              <FaStar className="w-4 h-4 mr-1" /> 
                              Rating: {product?.rating || "No ratings"}
                            </span>
                            <span className="flex items-center">
                              <FaUser className="w-4 h-4 mr-1" /> 
                              Reviews: {product?.numReviews || 0}
                            </span>
                          </div>

                          <div className="flex items-center">
                            <span className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center">
                              Update Product
                              <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                <div className="text-gray-300">
                  Page {currentPage} of {totalPages} • {allProducts.length} total products
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                        : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                    }`}
                  >
                    <FaChevronLeft className="mr-2" />
                    Previous
                  </button>

                  <div className="flex items-center space-x-1">
                    {currentPage > 3 && (
                      <>
                        <button
                          onClick={() => goToPage(1)}
                          className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                        >
                          1
                        </button>
                        {currentPage > 4 && (
                          <span className="text-gray-400 px-2">...</span>
                        )}
                      </>
                    )}

                    {getPageNumbers().map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center border ${
                          currentPage === pageNum
                            ? 'bg-pink-600 text-white border-pink-600'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border-gray-600'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <span className="text-gray-400 px-2">...</span>
                        )}
                        <button
                          onClick={() => goToPage(totalPages)}
                          className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 text-white hover:bg-gray-700 border border-gray-600"
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                        : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                    }`}
                  >
                    Next
                    <FaChevronRight className="ml-2" />
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-300">Go to:</span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    value={currentPage}
                    onChange={(e) => {
                      const page = parseInt(e.target.value);
                      if (page >= 1 && page <= totalPages) {
                        goToPage(page);
                      }
                    }}
                    className="w-16 bg-gray-800 border border-gray-600 text-white rounded px-2 py-1 text-center"
                  />
                  <span className="text-gray-300">/ {totalPages}</span>
                </div>
              </div>
            )}
          </div>
          
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;