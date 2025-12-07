import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { FaUser, FaStar, FaBox } from "react-icons/fa"; 

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div className="container mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3 w-full">
            <div className="ml-[2rem] text-2xl font-bold h-12 mb-6">
              All Products ({products.length})
            </div>
            
            <div className="space-y-6">
              {products.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block overflow-hidden bg-gray-800 rounded-xl hover:bg-gray-750 transition-colors duration-200 shadow-lg hover:shadow-xl border border-gray-700"
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
              ))}
            </div>
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