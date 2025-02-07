import { useState, useEffect } from "react";
import { auth, db } from "@/firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchUserData(currentUser.uid);
        await fetchOrderHistory(currentUser.uid);
        await fetchFavorites(currentUser.uid);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserData = async (uid) => {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const data = userDoc.data();
      setName(data.name);
      setEmail(data.email);
      setAddress(data.address);
    }
  };

  const fetchOrderHistory = async (uid) => {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const ordersData = querySnapshot.docs.map((doc) => doc.data());
    setOrders(ordersData);
  };

  const fetchFavorites = async (uid) => {
    const favRef = collection(db, "favorites");
    const q = query(favRef, where("userId", "==", uid));
    const querySnapshot = await getDocs(q);
    const favData = querySnapshot.docs.map((doc) => doc.data());
    setFavorites(favData);
  };

  const handleSave = async () => {
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        address,
      });
      alert("Profile updated successfully!");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Welcome, {name}</h2>
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>

        <div>
          <h3 className="text-xl font-semibold mt-6">Order History</h3>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <ul className="list-disc ml-5">
              {orders.map((order, index) => (
                <li key={index}>
                  {order.foodItem} - ₦{order.totalAmount}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-xl font-semibold mt-6">Favorite Foods</h3>
          {favorites.length === 0 ? (
            <p>No favorites yet.</p>
          ) : (
            <ul className="list-disc ml-5">
              {favorites.map((fav, index) => (
                <li key={index}>{fav.foodName}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
