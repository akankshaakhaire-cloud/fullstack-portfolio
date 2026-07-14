import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f8fafc",
        padding: "20px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#ffffff",
          padding: "50px",
          borderRadius: "20px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "20px",
          }}
        >
          😕
        </div>

        <h1
          style={{
            fontSize: "70px",
            margin: 0,
            color: "#2563eb",
          }}
        >
          404
        </h1>

        <h2
          style={{
            marginTop: "15px",
            color: "#0f172a",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#64748b",
            marginTop: "15px",
            lineHeight: "1.6",
          }}
        >
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/dashboard"
          style={{
            display: "inline-block",
            marginTop: "30px",
            background: "#2563eb",
            color: "#ffffff",
            padding: "14px 28px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          🏠 Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;