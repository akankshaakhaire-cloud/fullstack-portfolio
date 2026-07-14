import { Outlet, NavLink } from "react-router-dom";

const MainLayout = () => {
  const menuStyle = ({ isActive }: { isActive: boolean }) => ({
    display: "block",
    padding: "12px 15px",
    marginBottom: "10px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#fff",
    backgroundColor: isActive ? "#334155" : "transparent",
    transition: "0.3s",
    fontWeight: 500,
  });

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f1f5f9",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#0f172a",
          color: "#fff",
          padding: "25px 20px",
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          🧥 Cloth Inventory
        </h2>

        <hr
          style={{
            borderColor: "#334155",
            marginBottom: "25px",
          }}
        />

        <nav>
          <NavLink to="/dashboard" style={menuStyle}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/products" style={menuStyle}>
            📦 Products
          </NavLink>

          <NavLink to="/users" style={menuStyle}>
            👥 Users
          </NavLink>

          <NavLink to="/settings" style={menuStyle}>
            ⚙️ Settings
          </NavLink>
        </nav>

        <button
          style={{
            width: "100%",
            marginTop: "40px",
            padding: "12px",
            border: "none",
            borderRadius: "8px",
            background: "#ef4444",
            color: "#fff",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🚪 Logout
        </button>
      </aside>

      {/* Main Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Navbar */}
        <header
          style={{
            height: "70px",
            background: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 30px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#1e293b",
            }}
          >
            Dashboard
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: "bold",
            }}
          >
            👤 Akanksha
          </div>
        </header>

        {/* Content */}
        <main
          style={{
            flex: 1,
            padding: "30px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;