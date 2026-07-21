import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const cardStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "12px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const Settings = () => {
  const { user } = useAuth();

  const [emailNotifications, setEmailNotifications] = useState(true);
  const [systemNotifications, setSystemNotifications] = useState(true);
  const [theme, setTheme] = useState("Light");

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold mb-1">⚙️ Settings</h2>
          <p className="text-muted mb-0">
            Manage your profile, security and application preferences.
          </p>
        </div>
      </div>

      <div className="row g-4">

        {/* Profile */}
        <div className="col-lg-6">
          <div className="card h-100" style={cardStyle}>
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">👤 Profile</h5>
            </div>

            <div className="card-body">

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Username
                </label>

                <input
                  type="text"
                  className="form-control"
                  value={user?.username ?? ""}
                  disabled
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Email
                </label>

                <input
                  type="email"
                  className="form-control"
                  value={user?.email ?? ""}
                  disabled
                />
              </div>

              <div>
                <label className="form-label fw-semibold">
                  Role
                </label>

                <div>
                  <span className="badge bg-success fs-6">
                    {user?.role ?? "Employee"}
                  </span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Security */}
        <div className="col-lg-6">
          <div className="card h-100" style={cardStyle}>
            <div className="card-header bg-danger text-white">
              <h5 className="mb-0">🔒 Security</h5>
            </div>

            <div className="card-body">

              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Password
                </label>

                <input
                  type="password"
                  className="form-control"
                  value="************"
                  disabled
                />
              </div>

              <button
                className="btn btn-outline-danger"
                disabled
              >
                Change Password (Coming Soon)
              </button>

              <hr />

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked
                  disabled
                />

                <label className="form-check-label">
                  Two-Factor Authentication
                </label>
              </div>

            </div>
          </div>
        </div>        {/* Notifications */}
        <div className="col-lg-6">
          <div className="card h-100" style={cardStyle}>
            <div className="card-header bg-warning">
              <h5 className="mb-0">🔔 Notifications</h5>
            </div>

            <div className="card-body">

              <div className="form-check form-switch mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() =>
                    setEmailNotifications(!emailNotifications)
                  }
                />

                <label className="form-check-label">
                  Email Notifications
                </label>
              </div>

              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={systemNotifications}
                  onChange={() =>
                    setSystemNotifications(!systemNotifications)
                  }
                />

                <label className="form-check-label">
                  System Notifications
                </label>
              </div>

            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="col-lg-6">
          <div className="card h-100" style={cardStyle}>
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">🎨 Appearance</h5>
            </div>

            <div className="card-body">

              <label className="form-label fw-semibold">
                Theme
              </label>

              <select
                className="form-select"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option>Light</option>
                <option>Dark</option>
              </select>

              <p className="text-muted mt-3 mb-0">
                Theme switching will be available in a future update.
              </p>

            </div>
          </div>
        </div>

        {/* About */}
        <div className="col-12">
          <div className="card" style={cardStyle}>
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">ℹ️ About Application</h5>
            </div>

            <div className="card-body">

              <table className="table table-bordered align-middle mb-0">
                <tbody>
                  <tr>
                    <th style={{ width: "220px" }}>Application</th>
                    <td>Cloth Inventory Management System</td>
                  </tr>

                  <tr>
                    <th>Version</th>
                    <td>1.0.0</td>
                  </tr>

                  <tr>
                    <th>Frontend</th>
                    <td>React + TypeScript + Bootstrap</td>
                  </tr>

                  <tr>
                    <th>Backend</th>
                    <td>Flask / FastAPI</td>
                  </tr>

                  <tr>
                    <th>Database</th>
                    <td>PostgreSQL</td>
                  </tr>

                  <tr>
                    <th>Authentication</th>
                    <td>JWT Authentication + RBAC</td>
                  </tr>

                  <tr>
                    <th>Status</th>
                    <td>
                      <span className="badge bg-success">
                        Production Ready
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;