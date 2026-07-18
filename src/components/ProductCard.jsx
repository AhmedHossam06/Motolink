import { useState } from "react";
import { Heart, ShoppingCart, Check } from "lucide-react";
import { resolveImageUrl } from "../api";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist, isWishlisted } = useWishlist();
  const [cartBusy, setCartBusy] = useState(false);
  const [wishBusy, setWishBusy] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = async () => {
    setCartBusy(true);
    try {
      await addToCart(product.id, 1);
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    } catch (err) {
      console.warn("Add to cart failed:", err.message);
    } finally {
      setCartBusy(false);
    }
  };

  const handleAddToWishlist = async () => {
    if (wishlisted) return; // already there, nothing to do
    setWishBusy(true);
    try {
      await addToWishlist(product.id);
    } catch (err) {
      console.warn("Add to wishlist failed:", err.message);
    } finally {
      setWishBusy(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-motolink-blue-light overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="relative aspect-square bg-motolink-blue-light">
        {product.imageUrl ? (
          <img
            src={resolveImageUrl(product.imageUrl)}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-motolink-slate text-sm">
            No image
          </div>
        )}

        <button
          onClick={handleAddToWishlist}
          disabled={wishBusy}
          aria-label="Add to wishlist"
          className="absolute top-2 right-2 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors cursor-pointer disabled:cursor-default"
        >
          <Heart
            size={18}
            className={wishlisted ? "fill-motolink-blue text-motolink-blue" : "text-motolink-blue-dark"}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-1 flex-1">
        {product.brand && (
          <span className="text-xs text-motolink-slate uppercase tracking-wide">{product.brand}</span>
        )}
        <h3 className="font-display font-semibold text-motolink-blue-dark leading-snug">
          {product.name}
        </h3>
        <p className="font-display font-bold text-motolink-blue mt-auto pt-2">
          ${product.price.toFixed(2)}
        </p>

        <button
          onClick={handleAddToCart}
          disabled={cartBusy || product.stockQuantity === 0}
          className="mt-2 w-full flex items-center justify-center gap-2 bg-motolink-blue hover:bg-blue-700 disabled:opacity-50 transition-colors text-white font-display font-semibold py-2 rounded-lg text-sm cursor-pointer disabled:cursor-default"
        >
          {justAdded ? (
            <>
              <Check size={16} /> Added
            </>
          ) : product.stockQuantity === 0 ? (
            "Out of stock"
          ) : (
            <>
              <ShoppingCart size={16} /> Add to cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}