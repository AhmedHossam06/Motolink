import { useAuth } from "../context/AuthContext";
import NotFound from "../pages/NotFound";

// Renders children only if the logged-in user has the required role.
// Otherwise shows a 404 page instead — so unauthorized users can't tell
// the admin route even exists.
export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();

  if (!user || (role && user.role !== role)) {
    return <NotFound />;
  }

  return children;
}