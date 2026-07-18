import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import { homeLoader, categoryLoader } from "./loaders";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home />, loader: homeLoader },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "category/:categoryId", element: <CategoryProducts />, loader: categoryLoader },
        { path: "cart", element: <Cart /> },
        { path: "wishlist", element: <Wishlist /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL } // matches Vite's `base` config automatically, both in dev and after deploy
);

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <RouterProvider router={router} />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}