import Layout from "@/app/components/layouts/Layout";
import { useCartStore } from "@/store/cart";
import { useState } from "react";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    total,
    clearCart,
  } = useCartStore();
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
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900">Your Cart</h2>

          <button
            onClick={() => window.history.back()}
            className="mt-4 flex items-center gap-2 text-green-600 hover:text-green-700"
          >
            <FaArrowLeft />
            <span>Back to Menu</span>
          </button>

          {cart.length === 0 ? (
            <p className="mt-6 text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4 mt-6">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-green-600 font-bold">₦{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition-colors"
                        >
                          <FaMinus className="w-4 h-4" />
                        </button>
                        <span className="text-lg">{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition-colors"
                        >
                          <FaPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-6">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Clear Cart
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
                    error
                      ? "border-red-500"
                      : "focus:ring-2 focus:ring-green-500"
                  }`}
                  placeholder="Enter your delivery address"
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              </div>

              <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="text-green-600 font-bold text-xl">
                    ₦{total}
                  </span>
                </div>
                <button
                  onClick={handlePayment}
                  className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg w-full flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                >
                  <span>Pay with Paystack</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
