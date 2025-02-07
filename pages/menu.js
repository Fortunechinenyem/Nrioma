import { useState, useEffect } from "react";
import axios from "axios";
import { useCartStore } from "@/store/cart";
import Image from "next/image";
import { FaSearch, FaStar } from "react-icons/fa";
import Layout from "@/app/components/layouts/Layout";
import MealCustomization from "@/app/components/modals/MealCustomization";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState("All");
  const [rating, setRating] = useState("All");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    axios.get("/api/menu").then((res) => {
      setMenu(res.data);
      setFilteredMenu(res.data);
      setIsLoading(false);
    });
  }, []);

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

  const handleAddToCart = (item) => {
    if (item.hasCustomizations) {
      setSelectedMeal(item);
      setIsModalOpen(true);
    } else {
      addToCart(item);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Menu</h2>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search meals..."
                className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="w-5 h-5 absolute left-3 top-3.5 text-gray-500" />
            </div>
            <select
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Rice">Rice</option>
              <option value="Soups">Soups</option>
              <option value="Swallow">Swallow</option>
              <option value="Snacks">Snacks</option>
              <option value="Drinks">Drinks</option>
            </select>

            <select
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="All">All Prices</option>
              <option value="₦0 - ₦2000">₦0 - ₦2000</option>
              <option value="₦2000 - ₦5000">₦2000 - ₦5000</option>
              <option value="₦5000+">₦5000+</option>
            </select>

            <select
              className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="All">All Ratings</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
              <option value="2">2+ Stars</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md animate-pulse"
              >
                <div className="bg-gray-200 h-40 rounded-md"></div>
                <div className="h-6 bg-gray-200 mt-4 rounded"></div>
                <div className="h-4 bg-gray-200 mt-2 rounded"></div>
                <div className="h-4 bg-gray-200 mt-2 rounded"></div>
                <div className="h-10 bg-gray-200 mt-4 rounded"></div>
              </div>
            ))
          ) : filteredMenu.length > 0 ? (
            filteredMenu.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h3 className="text-xl font-semibold mt-4">{item.name}</h3>
                <p className="text-green-600 font-bold mt-2">₦{item.price}</p>
                <div className="flex items-center mt-2">
                  <FaStar className="text-yellow-500" />
                  <span className="ml-2 text-gray-600">{item.rating}/5</span>
                </div>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition-colors"
                >
                  {item.hasCustomizations
                    ? "Customize & Add to Cart"
                    : "Add to Cart"}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">
              No meals found.
            </p>
          )}
        </div>

        {isModalOpen && (
          <MealCustomization
            meal={selectedMeal}
            onClose={() => setIsModalOpen(false)}
            onAddToCart={(customizedMeal) => {
              addToCart(customizedMeal);
              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </Layout>
  );
}
