import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();

    // Check if user is authenticated
    const isAuthenticated = () => {
      const token = localStorage.getItem("token");
      return !!token; // Return true if the token exists
    };

    useEffect(() => {
      if (!isAuthenticated()) {
        navigate("/auth"); // Redirect to /auth if not authenticated
      }
    }, [navigate]); // Add navigate as a dependency

    // Only render the WrappedComponent if authenticated
    return isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };

  return AuthComponent;
};

export default withAuth;