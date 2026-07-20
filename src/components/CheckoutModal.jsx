import { useState } from "react";
import { X } from "lucide-react";

export default function CheckoutModal({ onConfirm, onClose, submitting }) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [touched, setTouched] = useState(false);

  const valid = phone.trim() !== "" && address.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onConfirm(phone.trim(), address.trim());
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-motolink-slate hover:text-motolink-blue-dark cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="font-display font-bold text-xl text-motolink-blue-dark mb-1">
          Delivery details
        </h2>
        <p className="text-motolink-slate text-sm mb-6">
          We need this to get your order to you.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-motolink-blue-dark mb-1">
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 01012345678"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-motolink-blue"
            />
            {touched && phone.trim() === "" && (
              <p className="text-red-600 text-xs mt-1">Phone number is required.</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-motolink-blue-dark mb-1">
              Delivery address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Street, building, city…"
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-motolink-blue"
            />
            {touched && address.trim() === "" && (
              <p className="text-red-600 text-xs mt-1">Address is required.</p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 bg-motolink-blue hover:bg-blue-700 disabled:opacity-50 transition-colors text-white font-display font-semibold py-2.5 rounded-lg cursor-pointer disabled:cursor-default"
          >
            {submitting ? "Placing order…" : "Confirm order"}
          </button>
        </form>
      </div>
    </div>
  );
}