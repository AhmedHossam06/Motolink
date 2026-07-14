import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { homeLoader, loginLoader, signupLoader } from "./Loaders";

// Navbar stays mounted across every route, only the matched page changes
function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home />, loader: homeLoader },
      { path: "login", element: <Login />, loader: loginLoader },
      { path: "signup", element: <Signup />, loader: signupLoader },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}