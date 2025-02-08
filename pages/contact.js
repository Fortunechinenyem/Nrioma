import Layout from "@/app/components/layouts/Layout";
import { useState } from "react";
import { FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    if (!formData.name || !formData.email || !formData.message) {
      setError("All fields are required");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setSubmitted(true);
      } else {
        setError(result.message || "Failed to send message.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <section className="py-20 mt-10 bg-gradient-to-r from-[#5e8c70] to-[#f0cd65] text-center text-white">
        <h2 className="text-4xl font-extrabold mb-4">Get in Touch</h2>
        <p className="text-lg mb-8">
          I'd love to hear from you. Drop me a message!
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-auto text-gray-800"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 mb-4"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            onChange={handleChange}
            value={formData.email}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 mb-4"
            rows="5"
            onChange={handleChange}
            value={formData.message}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-transform transform hover:scale-105 shadow-lg"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {submitted && (
            <p className="text-green-500 mt-2">Message sent successfully!</p>
          )}
        </form>
      </section>

      <section className="mt-16 text-center px-4">
        <h3 className="text-2xl font-bold mb-4">Contact Details</h3>
        <ul className="text-gray-700 space-y-2">
          <li>
            Email:{" "}
            <a
              href="mailto:support@nrioma.com"
              className="text-blue-600 hover:underline"
            >
              support@nrioma.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a
              href="tel:+2341234567890"
              className="text-blue-600 hover:underline"
            >
              +234 123 456 7890
            </a>
          </li>
          <li>Address: 123 Food Street, Lagos, Nigeria</li>
        </ul>
      </section>

      <section className="mt-12 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Or connect with me on social media:
        </p>
        <div className="flex justify-center space-x-6 text-3xl">
          <a
            href="https://x.com/FortuneChineny1"
            target="_blank"
            className="text-blue-500 hover:text-blue-700 transition-transform transform hover:scale-110"
          >
            <FaTwitter />
          </a>
          <a
            href="https://www.linkedin.com/in/fortune-chinenyem-aribido-6578b8185/"
            target="_blank"
            className="text-blue-700 hover:text-blue-900 transition-transform transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://www.instagram.com/fortunatechie"
            target="_blank"
            className="text-pink-500 hover:text-pink-700 transition-transform transform hover:scale-110"
          >
            <FaInstagram />
          </a>
        </div>
      </section>
    </Layout>
  );
}
