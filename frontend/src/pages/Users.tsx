import { useMemo, useState } from "react";

interface User {
  id: number;
  username: string;
  email: string;
  role: "Admin" | "Manager" | "Employee";
  status: "Active" | "Inactive";
}

const Users = () => {
  const [search, setSearch] = useState("");

  const users: User[] = [
    {
      id: 1,
      username: "Akanksha",
      email: "akanksha@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      username: "Rahul",
      email: "rahul@example.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: 3,
      username: "Priya",
      email: "priya@example.com",
      role: "Employee",
      status: "Inactive",
    },
    {
      id: 4,
      username: "Amit",
      email: "amit@example.com",
      role: "Employee",
      status: "Active",
    },
  ];

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "Active").length;
  const inactiveUsers = users.filter((u) => u.status === "Inactive").length;

  const cardStyle: React.CSSProperties = {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    flex: 1,
    minWidth: "220px",
  };

  return (
    <div>
      <h2
        style={{
          marginBottom: "25px",
          color: "#1e293b",
          fontWeight: "bold",
        }}
      >
        👥 User Management
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <div style={cardStyle}>
          <h6>Total Users</h6>
          <h2>{totalUsers}</h2>
        </div>

        <div style={cardStyle}>
          <h6>Active Users</h6>
          <h2 style={{ color: "#16a34a" }}>{activeUsers}</h2>
        </div>

        <div style={cardStyle}>
          <h6>Inactive Users</h6>
          <h2 style={{ color: "#dc2626" }}>{inactiveUsers}</h2>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-control"
            style={{ maxWidth: "320px" }}
          />

          <button className="btn btn-primary">
            ➕ Add User (Coming Soon)
          </button>
        </div>        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th style={{ width: "180px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>

                    <td>{user.username}</td>

                    <td>{user.email}</td>

                    <td>
                      <span
                        className={`badge ${
                          user.role === "Admin"
                            ? "bg-danger"
                            : user.role === "Manager"
                            ? "bg-warning text-dark"
                            : "bg-primary"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          user.status === "Active"
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>

                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        disabled
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        disabled
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-muted py-4"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;