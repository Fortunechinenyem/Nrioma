export default function handler(req, res) {
  const menu = [
    { id: 1, name: "Jollof Rice", price: 1500, image: "/images/pix (6).png" },
    { id: 2, name: "Egusi Soup", price: 2500, image: "/images/pix (3).png" },
    { id: 3, name: "Yam and Egg", price: 1800, image: "/images/pix (5).png" },
    { id: 4, name: "Ogbono Soup", price: 2500, image: "/images/pix (2).png" },
    {
      id: 5,
      name: "Chips and Chicken",
      price: 3000,
      image: "/images/pix (1).png",
    },
    { id: 6, name: "Okro Soup", price: 2500, image: "/images/pix (9).png" },
    { id: 7, name: "Efo riro", price: 2500, image: "/images/pix (10).png" },
  ];
  res.status(200).json(menu);
}
