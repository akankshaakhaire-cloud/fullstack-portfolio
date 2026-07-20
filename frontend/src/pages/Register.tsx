import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../api/authApi";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser({
        username,
        email,
        password,
      });

      // Auto Login
      const response = await loginUser(email, password);

      // Get Logged In User
      const user = await getCurrentUser(response.access_token);

      // Save Token + User
      login(response.access_token, user);

      alert("Registration Successful!");

      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      console.error(error);

      if (error.response) {
        alert(error.response.data?.detail || "Registration Failed");
      } else {
        alert("Unable to connect to server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#2563eb,#1e3a8a)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "#fff",
          borderRadius: "18px",
          padding: "40px",
          boxShadow: "0 15px 40px rgba(0,0,0,.2)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              marginBottom: "10px",
            }}
          >
            🧥
          </div>

          <h2>Create Account</h2>

          <p style={{ color: "#64748b" }}>
            Register to continue
          </p>
        </div>

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "bold" }}>Username</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "bold" }}>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "18px" }}>
            <label style={{ fontWeight: "bold" }}>Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: "bold" }}>
              Confirm Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div
          style={{
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          <span style={{ color: "#64748b" }}>
            Already have an account?{" "}
          </span>

          <Link
            to="/login"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;