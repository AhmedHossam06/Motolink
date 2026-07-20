import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Package } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import * as api from "../api";

export default function Profile() {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Not logged in - nothing to show here, send back to login
    if (!user) {
      navigate("/login");
      return;
    }
    api
      .getOrders()
      .then((data) => setOrders(data || []))
      .catch((err) => console.warn("Failed to load orders:", err.message))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  if (!user) return null; // redirecting

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      {/* User info */}
      <div className="flex items-center justify-between bg-white border border-motolink-blue-light rounded-xl p-6 mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl text-motolink-blue-dark">
            {user.name}
          </h1>
          <p className="text-motolink-slate text-sm">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="cursor-pointer flex items-center gap-2 text-red-600 hover:text-red-700 font-display font-semibold text-sm border border-red-200 hover:bg-red-50 transition-colors px-4 py-2 rounded-lg"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>

      {/* Order history */}
      <h2 className="font-display font-bold text-xl text-motolink-blue-dark mb-4">
        Your orders
      </h2>

      {loading ? (
        <p className="text-motolink-slate">Loading orders…</p>
      ) : orders.length === 0 ? (
        <p className="text-motolink-slate">You haven't placed any orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-motolink-blue-light rounded-xl p-5"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Package size={18} className="text-motolink-blue" />
                  <span className="font-display font-semibold text-motolink-blue-dark">
                    Order #{order.id}
                  </span>
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-motolink-blue-light text-motolink-blue">
                  {order.status}
                </span>
              </div>

              <p className="text-motolink-slate text-sm mb-2">
                {new Date(order.createdAt).toLocaleDateString()} · $
                {order.totalAmount.toFixed(2)}
              </p>

              <ul className="text-sm text-motolink-blue-dark">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity} × {item.product.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}