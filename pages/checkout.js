import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import Layout from "@/app/components/layouts/Layout";

export default function Checkout() {
  const { cart, total, clearCart } = useCartStore();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handlePayment = () => {
    if (!address.trim()) {
      setError("Please enter a valid delivery address.");
      return;
    }

    alert("Payment successful! Your order is on the way.");
    clearCart();
  };

  return (
    <Layout>
      {" "}
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Checkout</h2>

          <button
            onClick={() => window.history.back()}
            className="mt-4 flex items-center gap-2 text-green-600 hover:text-green-700"
          >
            <FaArrowLeft />
            <span>Back to Cart</span>
          </button>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <label className="block font-semibold text-gray-700">
              Delivery Address:
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setError("");
              }}
              className={`w-full p-3 border rounded-lg mt-2 focus:outline-none ${
                error ? "border-red-500" : "focus:ring-2 focus:ring-green-500"
              }`}
              placeholder="Enter your delivery address"
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-900">Order Summary</h3>
            <div className="mt-4 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-600">₦{item.price}</p>
                  </div>
                  <p className="text-gray-700">x{item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="text-green-600 font-bold text-xl">₦{total}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
          >
            <FaCheckCircle />
            <span>Pay with Paystack</span>
          </button>
        </div>
      </div>
    </Layout>
  );
}
