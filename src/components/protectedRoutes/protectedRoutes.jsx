import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router";

const ProtectedRoute = ({ element }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message while checking user
  }

  return user ? element : <Navigate to="/" />; // Redirect to login if not authenticated
};

export default ProtectedRoute;
