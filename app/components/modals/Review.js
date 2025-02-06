import { useState } from "react";

export default function ReviewModal({ onClose }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    alert(`Submitted review with ${rating} stars and comment: ${comment}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Leave a Review</h2>
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-2 border rounded"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} Stars
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Comment:</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows="4"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
}
