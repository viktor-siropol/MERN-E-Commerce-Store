import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../../redux/features/cart/cartSlice";
import ProgressSteps from "../../components/ProgressSteps";
import { toast } from "react-toastify";


const Shipping = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState(
    shippingAddress.paymentMethod || ""
  );
  const [showWarning, setShowWarning] = useState(false);
  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();


    if (!address.trim() || !city.trim() || !postalCode.trim() || !country.trim()) {
      toast.error("Please fill in all shipping fields");
      return;
    }


    if (!paymentMethod) {
      toast.error("Please choose payment method");
      setShowWarning(true); 
      return;
    }


    setShowWarning(false);

    dispatch(saveShippingAddress({ 
      address, 
      city, 
      postalCode, 
      country,
      paymentMethod 
    }));
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <div className="container mx-auto mt-10">
      <ProgressSteps step1 step2 />
      <div className="mt-[10rem] flex justify-around items-center flex-wrap">
        <form onSubmit={submitHandler} className="w-[40rem]">
          <h1 className="text-2xl font-semibold mb-4">Shipping</h1>
          
          <div className="mb-4">
            <label className="block text-white mb-2">Address *</label>
            <input
              type="text"
              className="w-full bg-[#151515] p-2 border rounded"
              placeholder="Enter address"
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">City *</label>
            <input
              type="text"
              className="w-full bg-[#151515] p-2 border rounded"
              placeholder="Enter city"
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Postal Code *</label>
            <input
              type="text"
              className="w-full bg-[#151515] p-2 border rounded"
              placeholder="Enter postal code"
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label className="block text-white mb-2">Country *</label>
            <input
              type="text"
              className="w-full bg-[#151515] p-2 border rounded"
              placeholder="Enter country"
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>


          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Select Payment Method *</h2>


            {showWarning && (
              <p className="text-red-500 mb-3 text-sm flex items-center">
                ⚠️ Please select a payment method.
              </p>
            )}


            <label
              className={`
                flex items-center gap-4 p-4 mb-3 rounded-xl cursor-pointer transition-all
                border 
                ${paymentMethod === "PayPal" ? "border-pink-500 bg-[#1e1e1e]" : "border-gray-700 bg-[#151515]"}
                hover:border-pink-400 hover:bg-[#1a1a1a]
              `}
              onClick={() => {
                setPaymentMethod("PayPal");
                setShowWarning(false); 
              }}
            >
              <span
                className={`
                  w-6 h-6 rounded-full border relative flex items-center justify-center transition-all
                  ${paymentMethod === "PayPal" ? "border-pink-500" : "border-gray-500"}
                `}
              >
                {paymentMethod === "PayPal" && (
                  <span className="w-3 h-3 bg-pink-500 rounded-full animate-scaleIn"></span>
                )}
              </span>

              <span className="text-white text-lg">PayPal</span>

              <input
                type="radio"
                name="paymentMethod"
                value="PayPal"
                checked={paymentMethod === "PayPal"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setShowWarning(false);
                }}
                className="hidden"
              />
            </label>


            <label
              className={`
                flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all
                border 
                ${paymentMethod === "Credit Card" ? "border-pink-500 bg-[#1e1e1e]" : "border-gray-700 bg-[#151515]"}
                hover:border-pink-400 hover:bg-[#1a1a1a]
              `}
              onClick={() => {
                setPaymentMethod("Credit Card");
                setShowWarning(false); 
              }}
            >
              <span
                className={`
                  w-6 h-6 rounded-full border relative flex items-center justify-center transition-all
                  ${paymentMethod === "Credit Card" ? "border-pink-500" : "border-gray-500"}
                `}
              >
                {paymentMethod === "Credit Card" && (
                  <span className="w-3 h-3 bg-pink-500 rounded-full animate-scaleIn"></span>
                )}
              </span>

              <span className="text-white text-lg">Credit Card</span>

              <input
                type="radio"
                name="paymentMethod"
                value="Credit Card"
                checked={paymentMethod === "Credit Card"}
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                  setShowWarning(false);
                }}
                className="hidden"
              />
            </label>
          </div>

          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full hover:bg-pink-600 transition-colors"
            type="submit"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;