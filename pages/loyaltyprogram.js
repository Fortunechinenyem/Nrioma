import Layout from "@/app/components/layouts/Layout";

export default function LoyaltyProgram() {
  const points = 1200;
  const rewards = [
    { id: 1, name: "10% Off", pointsRequired: 1000 },
    { id: 2, name: "Free Meal", pointsRequired: 2000 },
  ];

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Loyalty Program</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Your Points: <span className="text-green-600">{points}</span>
          </h3>
          <div className="space-y-4">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="flex justify-between items-center"
              >
                <span>{reward.name}</span>
                <button
                  disabled={points < reward.pointsRequired}
                  className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
                >
                  Redeem ({reward.pointsRequired} points)
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
