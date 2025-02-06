import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useCartStore } from "@/store/cart";
import { Logo } from "@/public/images";
import Image from "next/image";

export default function Navbar() {
  const { cart } = useCartStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            <Image src={Logo} width={120} height={120} alt="Logo" priority />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/orders"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Orders
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-auto">
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-green-600 transition-colors"
            >
              <FaShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {cart.length}
                </span>
              )}
            </Link>
            <Link
              href="/profile"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              <FaUser className="w-6 h-6" />
            </Link>

            {/* Hamburger Icon */}
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t border-gray-200">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/orders"
              className="text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Orders
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
