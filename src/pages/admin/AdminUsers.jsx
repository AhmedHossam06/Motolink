import { useEffect, useState } from "react";
import * as api from "../../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getAdminUsers()
      .then(setUsers)
      .catch((err) => setError(err.body?.message || "Couldn't load users."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-motolink-slate">Loading users…</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (users.length === 0) {
    return <p className="text-motolink-slate text-center py-16">No users yet.</p>;
  }

  return (
    <div className="bg-white border border-motolink-blue-light rounded-xl overflow-x-auto">
      <table className="w-full text-sm min-w-[520px]">
        <thead>
          <tr className="bg-motolink-blue-light/60 text-left text-xs font-display font-semibold uppercase tracking-wide text-motolink-slate">
            <th className="px-4 sm:px-5 py-3">Name</th>
            <th className="px-4 sm:px-5 py-3">Email</th>
            <th className="px-4 sm:px-5 py-3">Role</th>
            <th className="px-4 sm:px-5 py-3 hidden sm:table-cell">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t border-motolink-blue-light">
              <td className="px-4 sm:px-5 py-3 font-medium text-motolink-blue-dark whitespace-nowrap">
                {u.name}
              </td>
              <td className="px-4 sm:px-5 py-3 text-motolink-slate">{u.email}</td>
              <td className="px-4 sm:px-5 py-3">
                <span
                  className={`text-xs font-display font-semibold uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${
                    u.role === "ADMIN"
                      ? "bg-motolink-blue-light text-motolink-blue"
                      : "bg-gray-100 text-motolink-slate"
                  }`}
                >
                  {u.role}
                </span>
              </td>
              <td className="px-4 sm:px-5 py-3 text-motolink-slate hidden sm:table-cell whitespace-nowrap">
                {new Date(u.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}