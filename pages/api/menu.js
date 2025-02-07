export default function handler(req, res) {
  const menu = [
    {
      id: 1,
      name: "Jollof Rice",
      price: 1500,
      image: "/images/pix (6).png",
      category: "Rice",
    },
    {
      id: 2,
      name: "Egusi Soup",
      price: 2500,
      image: "/images/pix (3).png",
      category: "Soups",
    },
    {
      id: 3,
      name: "Yam and Egg",
      price: 1800,
      image: "/images/pix (5).png",
      category: "Snacks",
    },
    {
      id: 4,
      name: "Ogbono Soup",
      price: 2500,
      image: "/images/pix (2).png",
      category: "Soups",
    },
    {
      id: 5,
      name: "Chips and Chicken",
      price: 3000,
      image: "/images/pix (1).png",
      category: "Snacks",
    },
    {
      id: 6,
      name: "Okro Soup",
      price: 2500,
      image: "/images/pix (9).png",
      category: "Soups",
    },
    {
      id: 7,
      name: "Efo riro",
      price: 2500,
      image: "/images/pix (10).png",
      category: "Soups",
    },
    {
      id: 8,
      name: "Pounded Yam with Egusi",
      price: 3500,
      image: "/images/pix (11).png",
      category: "Swallow",
    },
    {
      id: 9,
      name: "Fried Rice",
      price: 2200,
      image: "/images/pix (12).png",
      category: "Rice",
    },
  ];
  res.status(200).json(menu);
}
