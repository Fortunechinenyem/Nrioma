export default function handler(req, res) {
  const menu = [
    { id: 1, name: "Jollof Rice", price: 1500, image: "/jollof.jpg" },
    { id: 2, name: "Egusi Soup", price: 2500, image: "/egusi.jpg" },
    { id: 3, name: "Fried Rice", price: 1800, image: "/fried-rice.jpg" },
  ];
  res.status(200).json(menu);
}
