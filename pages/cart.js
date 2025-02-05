import { useCartStore } from "@/store/cart";
import { useState } from "react";

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

  const handlePayment = () => {
    alert("Payment successful!");
    clearCart();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 shadow rounded-lg flex items-center justify-between"
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
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-gray-300 px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Checkout Section */}
      {cart.length > 0 && (
        <>
          <div className="mt-6">
            <label className="block font-semibold">Delivery Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <h3 className="font-bold text-xl mt-4">Total: ₦{total}</h3>
          <button
            onClick={handlePayment}
            className="bg-green-600 text-white px-6 py-3 mt-4 rounded-lg w-full hover:bg-green-700"
          >
            Pay with Paystack
          </button>
        </>
      )}
    </div>
  );
}
