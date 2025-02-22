import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4">Meet the Chef</h3>
          <div className="flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
            <Image
              src="/images/chefnrioma.jpg"
              alt="Chef Avatar"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold">Chef Nrioma</p>
              <p className="text-gray-400">Founder & Head Chef at Nrịọma</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Nrịọma</h3>
            <p className="text-gray-400">
              Nrịọma is your go-to food delivery app, offering delicious meals
              delivered fast and fresh to your doorstep.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/orders"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/referral"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Referral
                </Link>
              </li>
              <li>
                <Link
                  href="/mealplans"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Meal Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/loyaltyprogram"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Loyalty Program
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-green-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="text-gray-400 space-y-2">
              <li>Email: support@nrioma.com</li>
              <li>Phone: +234 123 456 7890</li>
              <li>Address: 123 Food Street, Lagos, Nigeria</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-500 transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Nrịọma. All rights reserved.
            created by Fortune.dev
          </p>
        </div>
      </div>
    </footer>
  );
}
