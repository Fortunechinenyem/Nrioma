export default function handler(req, res) {
  const orders = [
    { id: 1, foodName: "Jollof Rice", price: 1500, status: 0 }, // Preparing
    { id: 2, foodName: "Egusi Soup", price: 2500, status: 1 }, // Out for Delivery
    { id: 3, foodName: "Fried Rice", price: 1800, status: 2 }, // Delivered
  ];
  res.status(200).json(orders);
}
