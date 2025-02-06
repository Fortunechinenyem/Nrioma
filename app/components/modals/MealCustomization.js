import { useState } from "react";

export default function MealCustomization({ onClose }) {
  const [spiceLevel, setSpiceLevel] = useState("Medium");
  const [toppings, setToppings] = useState([]);

  const handleAddToCart = () => {
    alert(`Added to cart with ${spiceLevel} spice and ${toppings.join(", ")}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Customize Your Meal</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Spice Level:</label>
            <select
              value={spiceLevel}
              onChange={(e) => setSpiceLevel(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Mild">Mild</option>
              <option value="Medium">Medium</option>
              <option value="Spicy">Spicy</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Toppings:</label>
            <div className="space-y-2">
              {["Cheese", "Pepperoni", "Mushrooms"].map((topping) => (
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
                    className="mr-2"
                  />
                  {topping}
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
