import { useNavigate } from "react-router";
import { useAuth } from "../auth/hooks/useAuth";

const Home = () => {
  const { user, loading, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await handleLogout();
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (loading && !user) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", color: "#f8fafc" }}>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "3rem", textAlign: "center", color: "#f8fafc" }}>
      <h1>Homepage</h1>
      <p style={{ marginTop: "1rem", color: "#94a3b8" }}>
        Welcome, {user?.username || user?.email || "User"}!
      </p>
      <button
        onClick={onLogout}
        style={{
          marginTop: "2rem",
          padding: "0.65rem 1.5rem",
          background: "#ef4444",
          color: "#ffffff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "0.95rem"
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
