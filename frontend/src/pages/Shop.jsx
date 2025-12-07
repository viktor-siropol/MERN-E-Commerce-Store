import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceError, setPriceError] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!filteredProductsQuery.isLoading) {
      let filtered = [...filteredProductsQuery.data];
      
      if (selectedBrands.length > 0) {
        filtered = filtered.filter(product => 
          selectedBrands.includes(product.brand)
        );
      }
      
      if (priceFilter.trim() !== "") {
        const filterPrice = parseFloat(priceFilter);
        if (!isNaN(filterPrice) && filterPrice > 0) {
          filtered = filtered.filter(product => 
            product.price <= filterPrice
          );
          setPriceError("");
        } else {
          setPriceError("Please enter a valid price");
        }
      }
      
      dispatch(setProducts(filtered));
    }
  }, [selectedBrands, priceFilter, filteredProductsQuery.data, dispatch]);

  const handleBrandToggle = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setPriceFilter(value);
    

    if (value.trim() === "") {
      setPriceError("");
    }
  };

  const handleReset = () => {
    setSelectedBrands([]);
    setPriceFilter("");
    setPriceError("");
    dispatch(setChecked([]));
    if (!filteredProductsQuery.isLoading) {
      dispatch(setProducts(filteredProductsQuery.data));
    }
  };

  const removeBrandFilter = (brand) => {
    setSelectedBrands(prev => prev.filter(b => b !== brand));
  };

  const removeCategoryFilter = (categoryId) => {
    const updatedChecked = checked.filter(c => c !== categoryId);
    dispatch(setChecked(updatedChecked));
  };

  const removePriceFilter = () => {
    setPriceFilter("");
  };

  const hasActiveFilters = selectedBrands.length > 0 || priceFilter || checked.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/4">
          <div className="bg-[#151515] rounded-xl p-6 shadow-lg border border-gray-800 sticky top-6">
            <div className="mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={handleReset}
                    className="text-sm text-pink-400 hover:text-pink-300 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
              <div className="h-1 w-12 bg-pink-500 rounded-full mt-2"></div>
            </div>

            {hasActiveFilters && (
              <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Active Filters:</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedBrands.map(brand => (
                    <div key={brand} className="flex items-center gap-1 px-3 py-1.5 bg-pink-500/20 text-pink-300 text-sm rounded-full group">
                      {brand}
                      <button
                        onClick={() => removeBrandFilter(brand)}
                        className="ml-1 text-pink-400 hover:text-pink-200 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {checked.length > 0 && categories?.filter(c => checked.includes(c._id)).map(cat => (
                    <div key={cat._id} className="flex items-center gap-1 px-3 py-1.5 bg-blue-500/20 text-blue-300 text-sm rounded-full group">
                      {cat.name}
                      <button
                        onClick={() => removeCategoryFilter(cat._id)}
                        className="ml-1 text-blue-400 hover:text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  {priceFilter && (
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-green-500/20 text-green-300 text-sm rounded-full group">
                      ≤ ${priceFilter}
                      <button
                        onClick={removePriceFilter}
                        className="ml-1 text-green-400 hover:text-green-200 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
                Categories
              </h3>
              <div className="space-y-2.5">
                {categories?.map((c) => (
                  <div key={c._id} className="flex items-center hover:bg-gray-800/50 px-2 py-1.5 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      id={`category-${c._id}`}
                      checked={checked.includes(c._id)}
                      onChange={(e) => handleCheck(e.target.checked, c._id)}
                      className="w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <label
                      htmlFor={`category-${c._id}`}
                      className="ml-3 text-sm text-gray-300 hover:text-white cursor-pointer flex-1"
                    >
                      {c.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>


            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Brands
                </h3>
                {selectedBrands.length > 0 && (
                  <span className="text-xs text-pink-400 bg-pink-500/20 px-2 py-1 rounded-full">
                    {selectedBrands.length} selected
                  </span>
                )}
              </div>
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-2">
                {uniqueBrands?.map((brand) => (
                  <div key={brand} className="flex items-center hover:bg-gray-800/50 px-2 py-1.5 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandToggle(brand)}
                      className="w-4 h-4 text-pink-500 bg-gray-700 border-gray-600 rounded focus:ring-pink-500 focus:ring-2"
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="ml-3 text-sm text-gray-300 hover:text-white cursor-pointer flex-1"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Max Price
              </h3>
              <div className="relative">
                <div className="flex items-center">
                  <span className="absolute left-3 text-gray-400">$</span>
                  <input
                    type="number"
                    placeholder="Enter max price"
                    value={priceFilter}
                    onChange={handlePriceChange}
                    className="w-full pl-8 pr-4 py-2.5 bg-[#151515] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    min="0"
                    step="0.01"
                  />
                </div>
                {priceError && (
                  <p className="mt-2 text-sm text-red-400">{priceError}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 px-4 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white font-medium rounded-lg border border-gray-700 transition-all duration-200 hover:shadow-lg flex items-center justify-center"
            >
              Reset All Filters
            </button>
          </div>
        </div>


        <div className="lg:w-3/4">
          <div className="mb-6 bg-gray-900/50 rounded-xl p-4 border border-gray-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Shop Products</h1>
                <p className="text-gray-400 mt-1">
                  {products?.length === 0 
                    ? "No products match your filters" 
                    : `Found ${products?.length} product${products?.length !== 1 ? 's' : ''}`}
                </p>
              </div>
              
              {hasActiveFilters && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-400">Active filters:</span>
                  <div className="flex gap-2">
                    {selectedBrands.length > 0 && (
                      <span className="px-3 py-1 bg-pink-500/20 text-pink-300 text-sm rounded-full">
                        {selectedBrands.length} brand{selectedBrands.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    {checked.length > 0 && (
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full">
                        {checked.length} category{checked.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    {priceFilter && (
                      <span className="px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full">
                        ≤ ${priceFilter}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {products.length === 0 && !filteredProductsQuery.isLoading ? (
            <div className="text-center py-16 bg-gray-900/30 rounded-xl border border-gray-800">
              <div className="text-gray-500 mb-4">
                <svg className="w-20 h-20 mx-auto opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-300 mb-2">No products found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Try adjusting your filters or reset them to see all products
              </p>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <>
              {filteredProductsQuery.isLoading ? (
                <div className="flex justify-center py-16">
                  <Loader />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products?.map((p) => (
                    <div key={p._id} className="transform transition-transform hover:scale-[1.02] duration-300">
                      <ProductCard p={p} />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {products.length === 0 && filteredProductsQuery.data?.length > 0 && (
            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-4">
                Try removing some filters to see more products
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;