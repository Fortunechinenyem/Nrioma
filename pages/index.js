import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { FaSearch } from "react-icons/fa";
const categories = ["Swallow", "Soups", "Rice", "Snacks", "Drinks"];

const featuredMeals = [
  {
    id: 1,
    name: "Jollof Rice & Chicken",
    price: 2500,
    img: "/images/jollof.jpg",
  },
  {
    id: 2,
    name: "Egusi Soup & Pounded Yam",
    price: 3000,
    img: "/images/egusi.jpg",
  },
  { id: 3, name: "Pepper Soup", price: 1800, img: "/images/peppersoup.jpg" },
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="text-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900">Nrịọma 🍽️</h1>
        <p className="text-lg text-gray-600 mt-2">
          Enjoy Good Food, Fast & Fresh!
        </p>
      </div>

      <div className="relative mt-6 w-80">
        <input
          type="text"
          placeholder="Search for meals..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 pl-10 border rounded-lg focus:outline-none"
        />
        <FaSearch className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
      </div>

      <div className="flex gap-3 mt-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => router.push(`/menu?category=${category}`)}
            className="bg-white p-2 px-4 rounded-lg shadow hover:bg-green-100 transition"
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-8 w-4/5">
        <h2 className="text-xl font-semibold text-gray-800">Featured Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {featuredMeals.map((meal) => (
            <div key={meal.id} className="bg-white rounded-lg shadow p-4">
              <img
                src={meal.img}
                alt={meal.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-medium">{meal.name}</h3>
              <p className="text-gray-600">₦{meal.price}</p>
              <button
                onClick={() => router.push(`/menu/${meal.id}`)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700"
              >
                Order Now
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => router.push("/menu")}
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700"
      >
        View Full Menu <ArrowRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
}
