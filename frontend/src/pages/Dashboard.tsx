import { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  Table,
  Badge,
  Button,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

import {
     getDashboardStats } from "../api/dashboardApi";

interface DashboardStats {
  total_products: number;
  total_inventory_value: number;
  low_stock_products: number;
  recent_products: number;
}

interface MonthlyData {
  month: string;
  value: number;
}

interface CategoryData {
  name: string;
  value: number;
}

interface ActivityItem {
  title: string;
  time: string;
  status: string;
}

const DashboardCard = ({
  title,
  value,
  icon,
  subtitle,
}: {
  title: string;
  value: string | number;
  icon: string;
  subtitle: string;
}) => {
  return (
    <Card
      className="border-0 shadow-sm h-100"
      style={{
        borderRadius: 20,
        background: "linear-gradient(135deg,#ffffff,#f7f8ff)",
      }}
    >
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <div
              style={{
                fontSize: 14,
                color: "#6c757d",
                fontWeight: 500,
              }}
            >
              {title}
            </div>

            <h2
              className="mt-2 mb-1"
              style={{
                fontWeight: 700,
              }}
            >
              {value}
            </h2>

            <small className="text-muted">
              {subtitle}
            </small>
          </div>

          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#4f46e5,#7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 26,
            }}
          >
            {icon}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    total_products: 0,
    total_inventory_value: 0,
    low_stock_products: 0,
    recent_products: 0,
  });

  const [loading, setLoading] = useState(true);

  const monthlyData = useMemo<MonthlyData[]>(
    () => [
      { month: "Jan", value: 12000 },
      { month: "Feb", value: 17000 },
      { month: "Mar", value: 22000 },
      { month: "Apr", value: 19000 },
      { month: "May", value: 28000 },
      { month: "Jun", value: 33000 },
    ],
    []
  );

  const categoryData = useMemo<CategoryData[]>(
    () => [
      { name: "Men", value: 40 },
      { name: "Women", value: 30 },
      { name: "Kids", value: 20 },
      { name: "Other", value: 10 },
    ],
    []
  );

  const activities = useMemo<ActivityItem[]>(
    () => [
      {
        title: "New Product Added",
        time: "5 min ago",
        status: "success",
      },
      {
        title: "Inventory Updated",
        time: "20 min ago",
        status: "primary",
      },
      {
        title: "Low Stock Alert",
        time: "1 hour ago",
        status: "warning",
      },
      {
        title: "Dashboard Synced",
        time: "Today",
        status: "info",
      },
    ],
    []
  );

  const chartColors = [
    "#4f46e5",
    "#06b6d4",
    "#22c55e",
    "#f59e0b",
  ];

  useEffect(() => {
    loadDashboard();
    console.log("Refresh button clicked");
  }, []);

  const loadDashboard = async () => {
    console.log("Refresh button clicked");

    try {
        setLoading(true);

        const data = await getDashboardStats();

      setStats({
        total_products: data.total_products,
        total_inventory_value: data.inventory_value,
        low_stock_products: data.low_stock,
        recent_products: data.recent_products.length,
      });

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <Row className="align-items-center mb-4">
        <Col lg={8}>
          <h2
            style={{
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            📊 Inventory Dashboard
          </h2>

          <p
            className="text-muted mb-0"
            style={{
              fontSize: 15,
            }}
          >
            Welcome back! Here's an overview of your inventory performance.
          </p>
        </Col>

        <Col
          lg={4}
          className="text-lg-end mt-3 mt-lg-0"
        >
          <Button
            variant="primary"
            style={{
              borderRadius: 12,
              padding: "10px 22px",
              fontWeight: 600,
            }}
            onClick={loadDashboard}
          >
            Refresh Dashboard
          </Button>
        </Col>
      </Row>

      {/* Statistics Cards */}
      <Row className="g-4 mb-4">
        <Col xl={3} md={6}>
          <DashboardCard
            title="Total Products"
            value={stats.total_products}
            icon="📦"
            subtitle="Registered products"
          />
        </Col>

        <Col xl={3} md={6}>
          <DashboardCard
            title="Inventory Value"
            value={`₹${stats.total_inventory_value.toLocaleString()}`}
            icon="💰"
            subtitle="Current stock value"
          />
        </Col>

        <Col xl={3} md={6}>
          <DashboardCard
            title="Low Stock"
            value={stats.low_stock_products}
            icon="⚠️"
            subtitle="Need attention"
          />
        </Col>

        <Col xl={3} md={6}>
          <DashboardCard
            title="Recent Products"
            value={stats.recent_products}
            icon="🆕"
            subtitle="Recently added"
          />
        </Col>
      </Row>

      {/* Quick Status */}
      <Row className="g-4 mb-4">
        <Col lg={12}>
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: 20,
            }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center flex-wrap">
                <div>
                  <h5 className="mb-1">
                    Inventory Health
                  </h5>

                  <p className="text-muted mb-0">
                    Overall inventory status based on current stock.
                  </p>
                </div>

                <Badge
                  bg="success"
                  style={{
                    fontSize: 14,
                    padding: "10px 16px",
                    borderRadius: 10,
                  }}
                >
                  Healthy
                </Badge>
              </div>

              <div className="mt-4">
                <ProgressBar
                  now={82}
                  label="82%"
                  style={{
                    height: 12,
                    borderRadius: 10,
                  }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>      {/* Analytics Charts */}
      <Row className="g-4 mb-4">
        {/* Monthly Inventory Trend */}
        <Col xl={8}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{
              borderRadius: 20,
            }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5
                    className="mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    Monthly Inventory Trend
                  </h5>

                  <small className="text-muted">
                    Inventory value over the last six months
                  </small>
                </div>

                <Badge bg="primary">
                  Last 6 Months
                </Badge>
              </div>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient
                      id="inventoryGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#4f46e5"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#4f46e5"
                        stopOpacity={0.05}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    fill="url(#inventoryGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Category Distribution */}
        <Col xl={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{
              borderRadius: 20,
            }}
          >
            <Card.Body>
              <div className="mb-4">
                <h5
                  className="mb-1"
                  style={{ fontWeight: 700 }}
                >
                  Category Distribution
                </h5>

                <small className="text-muted">
                  Product categories
                </small>
              </div>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Legend />

                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          chartColors[
                            index % chartColors.length
                          ]
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>      {/* Category Insights + Recent Activity */}
      <Row className="g-4 mb-4">
        {/* Pie Chart */}
        <Col xl={5}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{
              borderRadius: 20,
            }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5
                    className="mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    Stock Distribution
                  </h5>

                  <small className="text-muted">
                    Products by category
                  </small>
                </div>

                <Badge bg="info">
                  Live
                </Badge>
              </div>

              <ResponsiveContainer
                width="100%"
                height={320}
              >
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    innerRadius={55}
                    paddingAngle={3}
                    label
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          chartColors[
                            index % chartColors.length
                          ]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col xl={7}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{
              borderRadius: 20,
            }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5
                    className="mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    Recent Activity
                  </h5>

                  <small className="text-muted">
                    Latest inventory events
                  </small>
                </div>

                <Badge bg="dark">
                  {activities.length} Events
                </Badge>
              </div>

              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between align-items-center py-3"
                  style={{
                    borderBottom:
                      index === activities.length - 1
                        ? "none"
                        : "1px solid #f1f3f5",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        background:
                          activity.status === "success"
                            ? "#22c55e"
                            : activity.status === "warning"
                            ? "#f59e0b"
                            : activity.status === "primary"
                            ? "#4f46e5"
                            : "#06b6d4",
                        marginRight: 14,
                      }}
                    />

                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        {activity.title}
                      </div>

                      <small className="text-muted">
                        {activity.time}
                      </small>
                    </div>
                  </div>

                  <Badge bg={activity.status as any}>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Analytics */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card
            className="border-0 shadow-sm text-center"
            style={{ borderRadius: 18 }}
          >
            <Card.Body>
              <h3 className="fw-bold text-primary mb-1">
                98%
              </h3>

              <p className="text-muted mb-0">
                Inventory Accuracy
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="border-0 shadow-sm text-center"
            style={{ borderRadius: 18 }}
          >
            <Card.Body>
              <h3 className="fw-bold text-success mb-1">
                24h
              </h3>

              <p className="text-muted mb-0">
                Last Synchronization
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="border-0 shadow-sm text-center"
            style={{ borderRadius: 18 }}
          >
            <Card.Body>
              <h3 className="fw-bold text-warning mb-1">
                12
              </h3>

              <p className="text-muted mb-0">
                Pending Restocks
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>      {/* Inventory Summary + Category Performance */}
      <Row className="g-4 mb-4">
        {/* Inventory Summary */}
        <Col xl={8}>
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: 20,
            }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5
                    className="mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    Inventory Summary
                  </h5>

                  <small className="text-muted">
                    Current inventory overview
                  </small>
                </div>

                <Badge bg="primary">
                  Live Data
                </Badge>
              </div>

              <Table
                hover
                responsive
                className="align-middle mb-0"
              >
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Items</th>
                    <th>Share</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {categoryData.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <strong>{item.name}</strong>
                      </td>

                      <td>{item.value}</td>

                      <td style={{ width: "35%" }}>
                        <ProgressBar
                          now={item.value}
                          label={`${item.value}%`}
                          style={{
                            height: 10,
                            borderRadius: 10,
                          }}
                        />
                      </td>

                      <td>
                        <Badge
                          bg={
                            item.value >= 35
                              ? "success"
                              : item.value >= 20
                              ? "warning"
                              : "secondary"
                          }
                        >
                          {item.value >= 35
                            ? "Excellent"
                            : item.value >= 20
                            ? "Good"
                            : "Average"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Top Categories */}
        <Col xl={4}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{
              borderRadius: 20,
            }}
          >
            <Card.Body>
              <h5
                className="mb-4"
                style={{ fontWeight: 700 }}
              >
                Top Categories
              </h5>

              {categoryData.map((item, index) => (
                <div
                  key={index}
                  className="mb-4"
                >
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="fw-semibold">
                      {item.name}
                    </div>

                    <div className="text-muted">
                      {item.value}%
                    </div>
                  </div>

                  <ProgressBar
                    now={item.value}
                    style={{
                      height: 8,
                      borderRadius: 10,
                    }}
                  />
                </div>
              ))}

              <div
                className="mt-4 p-3"
                style={{
                  background: "#f8f9fa",
                  borderRadius: 14,
                }}
              >
                <div className="fw-bold mb-1">
                  Best Performing
                </div>

                <div className="text-muted">
                  Men Category leads inventory
                  distribution this month.
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>      {/* KPI Metrics */}
      <Row className="g-4 mb-4">
        <Col lg={3} md={6}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: 18 }}
          >
            <Card.Body className="text-center">
              <div
                style={{
                  fontSize: 36,
                  marginBottom: 10,
                }}
              >
                📈
              </div>

              <h3 className="fw-bold text-success">
                +18%
              </h3>

              <p className="text-muted mb-0">
                Monthly Growth
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: 18 }}
          >
            <Card.Body className="text-center">
              <div
                style={{
                  fontSize: 36,
                  marginBottom: 10,
                }}
              >
                🚚
              </div>

              <h3 className="fw-bold text-primary">
                96%
              </h3>

              <p className="text-muted mb-0">
                Delivery Success
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: 18 }}
          >
            <Card.Body className="text-center">
              <div
                style={{
                  fontSize: 36,
                  marginBottom: 10,
                }}
              >
                ⭐
              </div>

              <h3 className="fw-bold text-warning">
                4.9
              </h3>

              <p className="text-muted mb-0">
                Inventory Rating
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={3} md={6}>
          <Card
            className="border-0 shadow-sm h-100"
            style={{ borderRadius: 18 }}
          >
            <Card.Body className="text-center">
              <div
                style={{
                  fontSize: 36,
                  marginBottom: 10,
                }}
              >
                🔄
              </div>

              <h3 className="fw-bold text-info">
                24/7
              </h3>

              <p className="text-muted mb-0">
                System Availability
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Performance Overview */}
      <Row className="g-4 mb-4">
        <Col lg={12}>
          <Card
            className="border-0 shadow-sm"
            style={{ borderRadius: 20 }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
                <div>
                  <h5
                    className="mb-1"
                    style={{ fontWeight: 700 }}
                  >
                    Performance Overview
                  </h5>

                  <small className="text-muted">
                    Key operational indicators
                  </small>
                </div>

                <Badge bg="success">
                  Excellent Performance
                </Badge>
              </div>

              <Row className="g-4">
                <Col md={4}>
                  <div className="mb-2 d-flex justify-content-between">
                    <span>Inventory Health</span>
                    <strong>92%</strong>
                  </div>

                  <ProgressBar
                    now={92}
                    variant="success"
                  />
                </Col>

                <Col md={4}>
                  <div className="mb-2 d-flex justify-content-between">
                    <span>Stock Accuracy</span>
                    <strong>97%</strong>
                  </div>

                  <ProgressBar
                    now={97}
                    variant="info"
                  />
                </Col>

                <Col md={4}>
                  <div className="mb-2 d-flex justify-content-between">
                    <span>Warehouse Efficiency</span>
                    <strong>89%</strong>
                  </div>

                  <ProgressBar
                    now={89}
                    variant="warning"
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>      {/* Footer */}
      <Row className="mt-2">
        <Col>
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: 20,
              background:
                "linear-gradient(135deg,#4f46e5,#7c3aed)",
              color: "#fff",
            }}
          >
            <Card.Body className="text-center py-4">
              <h5 className="mb-2 fw-bold">
                🎉 Cloth Inventory Management System
              </h5>

              <p
                className="mb-2"
                style={{
                  opacity: 0.9,
                }}
              >
                Premium Dashboard • React + TypeScript • FastAPI • PostgreSQL
              </p>

              <small
                style={{
                  opacity: 0.75,
                }}
              >
                © {new Date().getFullYear()} All Rights Reserved
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;