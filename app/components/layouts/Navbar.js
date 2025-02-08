import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useCartStore } from "@/store/cart";
import { Logo } from "@/public/images";
import Image from "next/image";

export default function Navbar() {
  const { cart } = useCartStore();
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    setIsAuthenticated(!!userToken);
  }, []);

  useEffect(() => {
    setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
  }, [cart]);

  const handleProfileClick = () => {
    if (isAuthenticated) {
      router.push("/profile");
    } else {
      router.push("/login");
    }
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <Image src={Logo} width={100} height={100} alt="Logo" priority />
          </Link>

          <div className="hidden md:flex flex-1 justify-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link href="/menu" className="text-gray-700 hover:text-green-600">
              Menu
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-green-600">
              Orders
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-green-600"
            >
              <FaShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={handleProfileClick}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              <FaUser className="w-6 h-6" />
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="flex flex-col items-center space-y-4 py-4">
            {["Home", "Menu", "Orders", "Contact"].map((link) => (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="text-gray-700 hover:text-green-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
