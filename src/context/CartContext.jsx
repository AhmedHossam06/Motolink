import { createContext, useContext, useState, useCallback, useEffect } from "react";
import * as api from "../api";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export function CartProvider({ children, initialItems = [] }) {
  const [items, setItems] = useState(initialItems);
  const { user } = useAuth();

  const refreshCart = useCallback(async () => {
    try {
      const data = await api.getCart();
      setItems(data || []);
      return data;
    } catch {
      setItems([]);
      return [];
    }
  }, []);

  // Sync cart with whoever is currently logged in - refresh on login,
  // clear immediately on logout so stale data never lingers on screen.
  useEffect(() => {
    if (user) {
      refreshCart();
    } else {
      setItems([]);
    }
  }, [user, refreshCart]);

  const addToCart = useCallback(async (productId, quantity = 1) => {
    await api.addCartItem(productId, quantity);
    await refreshCart();
  }, [refreshCart]);

  const updateQuantity = useCallback(async (cartItemId, quantity) => {
    await api.updateCartItem(cartItemId, quantity);
    await refreshCart();
  }, [refreshCart]);

  const removeFromCart = useCallback(async (cartItemId) => {
    await api.removeCartItem(cartItemId);
    await refreshCart();
  }, [refreshCart]);

  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, count, refreshCart, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}