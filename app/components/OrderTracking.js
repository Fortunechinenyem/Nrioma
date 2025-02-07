import { useEffect, useState } from "react";

export default function OrderTracking() {
  const [orderStatus, setOrderStatus] = useState("Preparing");
  const [progress, setProgress] = useState(33);

  useEffect(() => {
    const interval = setInterval(() => {
      if (orderStatus === "Preparing") {
        setOrderStatus("Out for Delivery");
        setProgress(66);
      } else if (orderStatus === "Out for Delivery") {
        setOrderStatus("Delivered");
        setProgress(100);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [orderStatus]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Order Tracking</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Status: {orderStatus}</h3>
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="h-2 rounded bg-green-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
