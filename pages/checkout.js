import { useState } from "react";
import { useCartStore } from "@/store/cart";

export default function Checkout() {
  const { cart, total, clearCart } = useCartStore();
  const [address, setAddress] = useState("");

  const handlePayment = () => {
    alert("Payment successful!");
    clearCart();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Checkout</h2>
      <div className="mt-4">
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
    </div>
  );
}
