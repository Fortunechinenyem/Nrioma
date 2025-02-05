import { useState, useEffect } from "react";
import axios from "axios";
import { useCartStore } from "@/store/cart";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [rating, setRating] = useState("All");
  const [search, setSearch] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    axios.get("/api/menu").then((res) => {
      setMenu(res.data);
      setFilteredMenu(res.data);
    });
  }, []);

  // Filter Menu Items
  useEffect(() => {
    let filtered = menu;

    if (category !== "All") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (priceRange !== "All") {
      if (priceRange === "₦0 - ₦2000") {
        filtered = filtered.filter((item) => item.price <= 2000);
      } else if (priceRange === "₦2000 - ₦5000") {
        filtered = filtered.filter(
          (item) => item.price > 2000 && item.price <= 5000
        );
      } else {
        filtered = filtered.filter((item) => item.price > 5000);
      }
    }

    if (rating !== "All") {
      filtered = filtered.filter((item) => item.rating >= Number(rating));
    }

    if (search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredMenu(filtered);
  }, [category, priceRange, rating, search, menu]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search meals..."
          className="border p-2 rounded w-full sm:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Swallow">Swallow</option>
          <option value="Soups">Soups</option>
          <option value="Rice">Rice</option>
          <option value="Snacks">Snacks</option>
          <option value="Drinks">Drinks</option>
        </select>

        <select
          className="border p-2 rounded"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="All">All Prices</option>
          <option value="₦0 - ₦2000">₦0 - ₦2000</option>
          <option value="₦2000 - ₦5000">₦2000 - ₦5000</option>
          <option value="₦5000+">₦5000+</option>
        </select>

        <select
          className="border p-2 rounded"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="All">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
        </select>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{item.name}</h3>
              <p className="text-green-600 font-bold">₦{item.price}</p>
              <p className="text-yellow-500">⭐ {item.rating}/5</p>
              <button
                onClick={() => addToCart(item)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No meals found.</p>
        )}
      </div>
    </div>
  );
}
