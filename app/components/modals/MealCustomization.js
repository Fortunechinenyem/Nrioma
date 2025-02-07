import { useState } from "react";

export default function MealCustomization({ onClose }) {
  const [spiceLevel, setSpiceLevel] = useState("Small Pepper");
  const [toppings, setToppings] = useState([]);

  const handleAddToCart = () => {
    alert(`Added to cart with ${spiceLevel} spice and ${toppings.join(", ")}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 shadow-xl border-2 border-green-600">
        <h2 className="text-2xl font-bold mb-4 text-green-700">
          Customize Your Meal - Naija Style 🇳🇬
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold text-green-800">
              Pepper Level:
            </label>
            <select
              value={spiceLevel}
              onChange={(e) => setSpiceLevel(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-green-600"
            >
              <option value="No Pepper">No Pepper (Mild)</option>
              <option value="Small Pepper">Small Pepper (Medium)</option>
              <option value="Wahala Pepper">Wahala Pepper (Spicy)</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold text-green-800">
              Add-ons:
            </label>
            <div className="space-y-2">
              {[
                "Dodo (Fried Plantain)",
                "Ponmo (Cow Skin)",
                "Ugba (Oil Bean)",
                "Ofada Sauce",
              ].map((topping) => (
                <label key={topping} className="flex items-center">
                  <input
                    type="checkbox"
                    value={topping}
                    checked={toppings.includes(topping)}
                    onChange={(e) =>
                      setToppings(
                        e.target.checked
                          ? [...toppings, topping]
                          : toppings.filter((t) => t !== topping)
                      )
                    }
                    className="mr-2 accent-green-600"
                  />
                  {topping}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
