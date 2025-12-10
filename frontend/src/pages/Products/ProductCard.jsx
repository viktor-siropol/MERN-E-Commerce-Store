import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems); 

  const addToCartHandler = (product, qty = 1) => {
    const existItem = cartItems.find((item) => item._id === product._id);

    if (existItem) {
      toast.error("Product already in cart", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      dispatch(addToCart({ ...product, qty }));
      toast.success("Item added successfully", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="relative w-[19rem] h-[22rem] bg-[#151515] rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="absolute top-2 right-2 z-10">
        <HeartIcon product={p} />
      </div>

      <div className="h-40 overflow-hidden bg-gray-100">
        <Link to={`/product/${p._id}`}>
          <img
            src={p.image}
            alt={p.name}
            className="w-full h-full object-fill group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="p-3 flex flex-col h-[calc(100%-10rem)]">
        <Link to={`/product/${p._id}`}>
          <h2 className="text-lg font-semibold text-gray-400 mb-1 line-clamp-1 h-7">
            {p.name}
          </h2>
        </Link>

        <p className="text-md text-gray-400 mb-2 line-clamp-2 h-10">
          {p.description}
        </p>

        <div className="flex items-center mb-2">
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="ml-1 text-sm text-gray-400">{p.rating}</span>
          </div>
          <span className="mx-1 text-gray-400">|</span>
          <span className="text-sm text-gray-400">{p.numReviews} reviews</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="text-lg font-bold text-pink-600">
            ${p.price.toFixed(2)}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/product/${p._id}`}
              className="bg-pink-500 hover:bg-pink-600 text-white py-1 px-3 rounded text-sm transition-colors duration-200"
            >
              View Product
            </Link>

            <button
              onClick={() => addToCartHandler(p)}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded transition-colors duration-200 flex items-center justify-center"
              title="Add to Cart"
            >
              <AiOutlineShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
