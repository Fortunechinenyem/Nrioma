import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { FaClock, FaTruck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { db } from "@/firebase";
import Layout from "@/app/components/layouts/Layout";
import OrderTracking from "@/app/components/OrderTracking";

const ORDER_STATUS = ["Preparing", "Out for Delivery", "Delivered"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      const q = query(collection(db, "orders"), where("userId", "==", userId));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(fetchedOrders);
        setIsLoading(false);
      });

      return () => unsubscribe();
    } else {
      setIsLoading(false);
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 0:
        return <FaClock className="text-yellow-500" />;
      case 1:
        return <FaTruck className="text-orange-500" />;
      case 2:
        return <FaCheckCircle className="text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold text-gray-900">My Orders</h2>

        {isLoading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="mt-6 text-gray-500">You have no active orders.</p>
        ) : (
          <div className="space-y-4 mt-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold">{order.foodName}</h3>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span>{ORDER_STATUS[order.status]}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">₦{order.price}</p>

                <div className="w-full bg-gray-200 h-2 rounded mt-4">
                  <div
                    className={`h-2 rounded ${
                      order.status === 0
                        ? "bg-yellow-500 w-1/3"
                        : order.status === 1
                        ? "bg-orange-500 w-2/3"
                        : "bg-green-500 w-full"
                    }`}
                  ></div>
                </div>

                <div className="flex gap-2 mt-4">
                  {order.status === 0 && (
                    <button
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => alert("Cancel order?")}
                    >
                      <FaTimesCircle /> Cancel Order
                    </button>
                  )}

                  {order.status === 2 && (
                    <button
                      className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg"
                      onClick={() => alert("Reorder?")}
                    >
                      <FaCheckCircle /> Reorder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <OrderTracking />
    </Layout>
  );
}
