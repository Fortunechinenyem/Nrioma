import { useState } from "react";
import { useRouter } from "next/router";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { FaSearch, FaFire, FaStar } from "react-icons/fa";

import Image from "next/image";

import Layout from "@/app/components/layouts/Layout";

const categories = [
  { name: "Swallow", icon: "🍚" },
  { name: "Soups", icon: "🍲" },
  { name: "Rice", icon: "🍛" },
  { name: "Snacks", icon: "🍟" },
  { name: "Drinks", icon: "🥤" },
];

const featuredMeals = [
  {
    id: 1,
    name: "Jollof Rice & Chicken",
    price: 2500,
    img: "/images/pix (6).png",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Egusi Soup & Pounded Yam",
    price: 3000,
    img: "/images/pix (3).png",
    rating: 4.7,
  },
  {
    id: 3,
    name: "Yam and Egg",
    price: 1800,
    img: "/images/pix (5).png",
    rating: 4.2,
  },
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  return (
    <Layout>
      <div className="py-20 min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center">
        <div className="text-center mt-6">
          <h1 className="text-5xl font-bold text-gray-900">Nrịọma 🍽️</h1>
          <p className="text-lg text-gray-600 mt-2">
            Enjoy Good Food, Fast & Fresh!
          </p>
        </div>

        <div className="relative mt-8 w-full max-w-md">
          <input
            type="text"
            placeholder="Search for meals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
          />
          <FaSearch className="w-5 h-5 absolute left-4 top-3.5 text-gray-500" />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-8 px-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => router.push(`/menu?category=${category.name}`)}
              className="bg-white p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow flex items-center gap-2"
            >
              <span className="text-xl">{category.icon}</span>
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 w-full max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <FaFire className="text-orange-500" /> Featured Meals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {featuredMeals.map((meal) => (
              <div
                key={meal.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48">
                  <Image
                    src={meal.img}
                    alt={meal.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-xl"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{meal.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-gray-600">₦{meal.price}</p>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span className="text-sm">{meal.rating}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => router.push(`/menu/${meal.id}`)}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition-colors"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => router.push("/menu")}
          className="mt-10 bg-green-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
        >
          View Full Menu <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </Layout>
  );
}
