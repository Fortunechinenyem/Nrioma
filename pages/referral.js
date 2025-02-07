import Layout from "@/app/components/layouts/Layout";

export default function ReferralProgram() {
  const referralCode = "NR1234";
  const referralLink = `https://nrioma.com/referral?code=${referralCode}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    alert("Referral link copied to clipboard!");
  };

  return (
    <Layout>
      {" "}
      <div className="p-6 bg-gray-50 min-h-screen">
        <h2 className="text-2xl font-bold mb-6">Referral Program</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4">Your Referral Code:</h3>
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleCopyLink}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Copy Link
            </button>
          </div>
          <p className="mt-4 text-gray-600">
            Share your referral link with friends and earn rewards when they
            sign up and place their first order!
          </p>
        </div>
      </div>
    </Layout>
  );
}
