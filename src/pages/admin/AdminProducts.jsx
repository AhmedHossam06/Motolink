import { useEffect, useState } from "react";
import * as api from "../../api";
import { resolveImageUrl } from "../../api";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .getProducts()
      .then((res) => setProducts(res.content ?? res))
      .catch((err) => setError(err.body?.message || "Couldn't load products."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-motolink-slate">Loading products…</p>;
  if (error) return <p className="text-red-600 text-sm">{error}</p>;
  if (products.length === 0) {
    return <p className="text-motolink-slate text-center py-16">No products yet.</p>;
  }

  return (
    <div className="bg-white border border-motolink-blue-light rounded-xl overflow-x-auto">
      <table className="w-full text-sm min-w-[520px]">
        <thead>
          <tr className="bg-motolink-blue-light/60 text-left text-xs font-display font-semibold uppercase tracking-wide text-motolink-slate">
            <th className="px-4 sm:px-5 py-3">Product</th>
            <th className="px-4 sm:px-5 py-3 hidden sm:table-cell">Category</th>
            <th className="px-4 sm:px-5 py-3">Price</th>
            <th className="px-4 sm:px-5 py-3">Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-t border-motolink-blue-light">
              <td className="px-4 sm:px-5 py-3">
                <div className="flex items-center gap-3">
                  {p.imageUrl && (
                    <img
                      src={resolveImageUrl(p.imageUrl)}
                      alt={p.name}
                      className="w-8 h-8 rounded-lg object-cover bg-motolink-blue-light shrink-0"
                    />
                  )}
                  <span className="font-medium text-motolink-blue-dark">{p.name}</span>
                </div>
              </td>
              <td className="px-4 sm:px-5 py-3 text-motolink-slate hidden sm:table-cell whitespace-nowrap">
                {p.categoryName}
              </td>
              <td className="px-4 sm:px-5 py-3 text-motolink-blue-dark whitespace-nowrap">
                ${p.price.toFixed(2)}
              </td>
              <td className="px-4 sm:px-5 py-3">
                <span className={p.stockQuantity < 10 ? "text-red-600 font-medium" : "text-motolink-slate"}>
                  {p.stockQuantity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}