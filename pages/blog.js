export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "10 Healthy Nigerian Recipes",
      description: "Discover delicious and healthy Nigerian meals.",
      image: "/images/pix (2).png",
    },
    {
      id: 2,
      title: "How to Make Perfect Jollof Rice",
      description: "Learn the secrets to making the best Jollof Rice.",
      image: "/images/pix (3).png",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Food Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-600">{post.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
