import { useState } from "react";
import { useAuth } from "../context/AuthContext";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  status: string;
}

const Users = () => {
  const { user } = useAuth();

  if (user?.role?.toLowerCase() !== "admin") {
    return (
      <div
        style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#dc2626" }}>🚫 403 - Access Denied</h2>
        <p>Only administrators can access this page.</p>
      </div>
    );
  }

  const [search, setSearch] = useState("");

  const [users] = useState<User[]>([
    {
      id: 1,
      username: "Akanksha",
      email: "akanksha@gmail.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      username: "Rahul",
      email: "rahul@gmail.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: 3,
      username: "Sneha",
      email: "sneha@gmail.com",
      role: "Employee",
      status: "Inactive",
    },
    {
      id: 4,
      username: "Amit",
      email: "amit@gmail.com",
      role: "Employee",
      status: "Active",
    },
  ]);

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2
        style={{
          marginBottom: "25px",
          color: "#1e293b",
        }}
      >
        👥 User Management
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h4>Total Users</h4>
          <h2>{users.length}</h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h4>Admins</h4>
          <h2>{users.filter((u) => u.role === "Admin").length}</h2>
        </div>

        <div
          style={{
            background: "#fff",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          <h4>Active Users</h4>
          <h2>{users.filter((u) => u.status === "Active").length}</h2>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Search User..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "300px",
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          + Add User
        </button>
      </div>      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#0f172a",
              color: "#fff",
            }}
          >
            <tr>
              <th style={{ padding: "14px" }}>ID</th>
              <th style={{ padding: "14px" }}>Username</th>
              <th style={{ padding: "14px" }}>Email</th>
              <th style={{ padding: "14px" }}>Role</th>
              <th style={{ padding: "14px" }}>Status</th>
              <th style={{ padding: "14px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                <td style={{ padding: "14px", textAlign: "center" }}>
                  {u.id}
                </td>

                <td style={{ padding: "14px" }}>
                  {u.username}
                </td>

                <td style={{ padding: "14px" }}>
                  {u.email}
                </td>

                <td style={{ padding: "14px" }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "#fff",
                      background:
                        u.role === "Admin"
                          ? "#2563eb"
                          : u.role === "Manager"
                          ? "#f59e0b"
                          : "#10b981",
                    }}
                  >
                    {u.role}
                  </span>
                </td>

                <td style={{ padding: "14px" }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "20px",
                      color: "#fff",
                      background:
                        u.status === "Active"
                          ? "#22c55e"
                          : "#ef4444",
                    }}
                  >
                    {u.status}
                  </span>
                </td>

                <td style={{ padding: "14px" }}>
                  <button
                    style={{
                      marginRight: "10px",
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    style={{
                      background: "#ef4444",
                      color: "#fff",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredUsers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: "25px",
                    textAlign: "center",
                    color: "#64748b",
                  }}
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;