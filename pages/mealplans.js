import Layout from "@/app/components/layouts/Layout";

export default function MealPlans() {
  const plans = [
    {
      id: 1,
      name: "Weekly Plan",
      price: 5000,
      description: "5 meals per week, delivered daily.",
    },
    {
      id: 2,
      name: "Monthly Plan",
      price: 18000,
      description: "20 meals per month, delivered daily.",
    },
  ];

  const handleSubscribe = (planId) => {
    alert(`Subscribed to plan ${planId}`);
  };

  return (
    <Layout>
      {" "}
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Meal Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
              <p className="text-green-600 font-bold mb-4">₦{plan.price}</p>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <button
                onClick={() => handleSubscribe(plan.id)}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                Subscribe
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
