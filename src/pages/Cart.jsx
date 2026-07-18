import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import * as api from "../api";

export default function Cart() {
  const { items, refreshCart, updateQuantity, removeFromCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [checkingOut, setCheckingOut] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshCart().finally(() => setLoading(false));
  }, [refreshCart]);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async () => {
    setError("");
    setCheckingOut(true);
    try {
      await api.checkout();
      await refreshCart();
      navigate("/");
    } catch (err) {
      setError(err.body?.message || "Checkout failed. Please try again.");
    } finally {
      setCheckingOut(false);
    }
  };

  if (loading) {
    return <main className="max-w-4xl mx-auto px-6 py-10 text-motolink-slate">Loading cart…</main>;
  }

  if (items.length === 0) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="font-display font-bold text-2xl text-motolink-blue-dark mb-2">
          Your cart is empty
        </h1>
        <p className="text-motolink-slate">Browse the catalog and add something you like.</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="font-display font-bold text-3xl text-motolink-blue-dark mb-8">Your cart</h1>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 bg-white border border-motolink-blue-light rounded-xl p-4"
          >
            <div className="flex-1">
              <h3 className="font-display font-semibold text-motolink-blue-dark">
                {item.product.name}
              </h3>
              <p className="text-motolink-slate text-sm">${item.product.price.toFixed(2)} each</p>
            </div>

            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => updateQuantity(item.id, Math.max(1, Number(e.target.value)))}
              className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center"
            />

            <p className="font-display font-semibold text-motolink-blue-dark w-20 text-right">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeFromCart(item.id)}
              aria-label="Remove item"
              className="p-2 text-motolink-slate hover:text-red-600 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8 border-t border-motolink-blue-light pt-6">
        <span className="font-display font-bold text-xl text-motolink-blue-dark">
          Total: ${total.toFixed(2)}
        </span>
        <button
          onClick={handleCheckout}
          disabled={checkingOut}
          className="bg-motolink-blue hover:bg-blue-700 disabled:opacity-50 transition-colors text-white font-display font-semibold px-6 py-3 rounded-lg"
        >
          {checkingOut ? "Placing order…" : "Checkout"}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
    </main>
  );
}