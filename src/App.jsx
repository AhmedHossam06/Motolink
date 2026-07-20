import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import { homeLoader, categoryLoader } from "./loaders";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminProducts from "./pages/admin/AdminProducts";

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
        {
          path: "admin",
          element: <AdminLayout />,
          children: [
            { index: true, element: <Navigate to="orders" replace /> },
            { path: "orders", element: <AdminOrders /> },
            { path: "users", element: <AdminUsers /> },
            { path: "products", element: <AdminProducts /> },
          ],
        },
        { path: "profile", element: <Profile /> },
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