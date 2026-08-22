import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-wrapper">
        <div className="auth-card" style={{ textAlign: "center" }}>
          <div className="spinner" style={{ margin: "0 auto 1rem" }}></div>
          <h2>Loading Session...</h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default Protected;