import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, isLoggedIn, ...props }) {
  return isLoggedIn ? (
    <Component {...props} isLoggedIn={isLoggedIn} />
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRoute;
