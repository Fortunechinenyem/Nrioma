import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { FaSearch, FaStar, FaGift, FaHeart } from "react-icons/fa";
import Image from "next/image";
import Layout from "@/app/components/layouts/Layout";
import Link from "next/link";

const categories = [
  { name: "Swallow", icon: "🍚" },
  { name: "Soups", icon: "🍲" },
  { name: "Rice", icon: "🍛" },
  { name: "Pasta", icon: "🍝" },
  { name: "Sides", icon: "🥗" },
  { name: "Snacks", icon: "🍿" },
  { name: "Drinks", icon: "🍹" },
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
  {
    id: 4,
    name: "Asun Spaghetti",
    price: 3000,
    img: "/images/pix (34).png",
    rating: 4.7,
  },
];

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const stats = [
    { label: "Meals Served", count: 10000 },
    { label: "Orders Delivered", count: 5000 },
    { label: "Happy Customers", count: 4800 },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) =>
        prevCounts.map((value, index) =>
          value < stats[index].count
            ? value + Math.ceil(stats[index].count / 100)
            : stats[index].count
        )
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <Layout>
      <div
        className="relative h-screen flex flex-col items-center justify-center bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/images/pix (5).png')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Delicious Meals Delivered Fast!
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Order your favorite meals with just a click.
          </p>

          <div className="relative mt-6 w-full max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search for meals..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-12 rounded-full focus:outline-none focus:ring-4 focus:ring-green-500 shadow-md"
            />
            <FaSearch className="w-5 h-5 absolute left-4 top-4 text-gray-500" />
          </div>
          <button
            onClick={() => router.push("/menu")}
            className="mt-6 bg-green-600 text-white px-8 py-3 mx-auto rounded-full flex items-center gap-2 hover:bg-green-700 transform hover:scale-105 shadow-lg"
          >
            Explore Menu <ArrowRightIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="py-8 px-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-center">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => router.push(`/menu?category=${category.name}`)}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105 flex items-center gap-2 justify-center"
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="font-semibold text-gray-800">{category.name}</span>
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Featured Meals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {featuredMeals.map((meal) => (
            <div
              key={meal.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={meal.img}
                  alt={meal.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {meal.name}
                </h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-gray-600">₦{meal.price}</p>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span className="text-sm">{meal.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="py-8 sm:py-12 bg-gray-100 text-center px-4 sm:px-8 lg:px-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-xl sm:text-2xl font-semibold bg-white shadow-md rounded-xl p-6"
            >
              <p className="text-orange-500 text-3xl sm:text-4xl lg:text-5xl font-bold">
                {counts[index].toLocaleString()}+
              </p>
              <p className="mt-2 text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say ❤️
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[
            "Best food ever!",
            "Quick delivery and tasty meals.",
            "Highly recommend Nrịọma!",
          ].map((review, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-gray-100 p-6 rounded-xl shadow-md"
            >
              <p className="italic">"{review}"</p>
              <p className="mt-4 font-semibold">- Customer {index + 1}</p>
            </div>
          ))}
        </div>
      </section>
      <div className="bg-green-100 py-12 px-4 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-4 flex justify-center items-center gap-2">
          <FaGift className="text-green-600 text-4xl" /> Join Our Loyalty
          Program
        </h2>
        <p className="text-gray-700 max-w-xl mx-auto text-lg">
          Earn points with every order and enjoy exclusive rewards, discounts,
          and special offers just for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 w-80 sm:w-64">
            <FaHeart className="text-red-500 text-4xl mx-auto" />
            <h3 className="font-semibold mt-4 text-xl text-center">
              Earn Points
            </h3>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Get points every time you order your favorite meal.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 w-80 sm:w-64">
            <FaStar className="text-yellow-500 text-4xl mx-auto" />
            <h3 className="font-semibold mt-4 text-xl text-center">
              Exclusive Rewards
            </h3>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Unlock exciting offers as you accumulate points.
            </p>
          </div>
        </div>

        <Link href="/loyaltyprogram">
          <button className="mt-8 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors">
            Learn More
          </button>
        </Link>
      </div>
    </Layout>
  );
}
