import { createContext, useContext, useState, useCallback } from "react";
import * as api from "../api";

const WishlistContext = createContext(null);

export function WishlistProvider({ children, initialItems = [] }) {
  const [items, setItems] = useState(initialItems);

  const refreshWishlist = useCallback(async () => {
    try {
      const data = await api.getWishlist();
      setItems(data || []);
      return data;
    } catch {
      setItems([]);
      return [];
    }
  }, []);

  const addToWishlist = useCallback(async (productId) => {
    await api.addWishlistItem(productId);
    await refreshWishlist();
  }, [refreshWishlist]);

  const removeFromWishlist = useCallback(async (wishlistItemId) => {
    await api.removeWishlistItem(wishlistItemId);
    await refreshWishlist();
  }, [refreshWishlist]);

  const isWishlisted = useCallback(
    (productId) => items.some((item) => item.product.id === productId),
    [items]
  );

  const count = items.length;

  return (
    <WishlistContext.Provider
      value={{ items, count, refreshWishlist, addToWishlist, removeFromWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
}