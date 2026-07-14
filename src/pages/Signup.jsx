import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook this up to your auth API
    console.log("Signup:", form);
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-motolink-blue-light px-6 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8">
        <h1 className="font-display font-bold text-3xl text-motolink-blue-dark mb-1">
          Create your account
        </h1>
        <p className="text-motolink-slate text-sm mb-8">
          Join Motolink to track orders, save favorites and book service.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-motolink-blue-dark">
              Full name
            </label>
            <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-motolink-blue">
              <User size={18} className="text-motolink-slate" />
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-motolink-blue-dark">
              Email
            </label>
            <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-motolink-blue">
              <Mail size={18} className="text-motolink-slate" />
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-motolink-blue-dark">
              Password
            </label>
            <div className="mt-1 flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 focus-within:border-motolink-blue">
              <Lock size={18} className="text-motolink-slate" />
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-motolink-blue hover:bg-blue-700 transition-colors text-white font-display font-semibold py-2.5 rounded-lg mt-2"
          >
            Create account
          </button>
        </form>

        <p className="text-sm text-motolink-slate text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-motolink-blue font-medium">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}