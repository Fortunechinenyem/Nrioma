import { useState, useEffect } from "react";
import axios from "axios";

const ORDER_STATUS = ["Preparing", "Out for Delivery", "Delivered"];

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">My Orders</h2>
      {orders.length === 0 ? (
        <p className="mt-4 text-gray-500">You have no active orders.</p>
      ) : (
        <div className="space-y-4 mt-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 shadow rounded-lg">
              <h3 className="font-semibold text-lg">{order.foodName}</h3>
              <p className="text-gray-500">₦{order.price}</p>
              <p className="text-gray-700">
                Status: {ORDER_STATUS[order.status]}
              </p>
              <div className="w-full bg-gray-200 h-2 rounded mt-2">
                <div
                  className={`h-2 rounded ${
                    order.status === 0
                      ? "bg-yellow-500 w-1/3"
                      : order.status === 1
                      ? "bg-orange-500 w-2/3"
                      : "bg-green-500 w-full"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
