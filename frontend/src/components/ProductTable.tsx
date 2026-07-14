import type { Product } from "../types/product";

type ProductTableProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

const ProductTable = ({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) => {
  const thStyle = {
    padding: "15px",
    textAlign: "left" as const,
    background: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
    color: "#334155",
    fontWeight: "bold",
  };

  const tdStyle = {
    padding: "15px",
    borderBottom: "1px solid #e2e8f0",
    color: "#475569",
    verticalAlign: "middle" as const,
  };

  return (
    <div
      style={{
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          minWidth: "1000px",
        }}
      >
        <thead>
          <tr>
            <th style={thStyle}>Image</th>
            <th style={thStyle}>Product</th>
            <th style={thStyle}>Category</th>
            <th style={thStyle}>Brand</th>
            <th style={thStyle}>Price</th>
            <th style={thStyle}>Quantity</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                style={{
                  textAlign: "center",
                  padding: "30px",
                }}
              >
                No Products Found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td style={tdStyle}>
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: "#94a3b8",
                        fontSize: "13px",
                      }}
                    >
                      No Image
                    </span>
                  )}
                </td>

                <td style={tdStyle}>
                  {product.product_name}
                </td>

                <td style={tdStyle}>
                  {product.category || "-"}
                </td>

                <td style={tdStyle}>
                  {product.brand || "-"}
                </td>

                <td style={tdStyle}>
                  ₹{product.price}
                </td>

                <td style={tdStyle}>
                  {product.quantity}
                </td>

                <td style={tdStyle}>
                  {product.quantity === 0 ? (
                    <span
                      style={{
                        color: "#dc2626",
                        fontWeight: "bold",
                      }}
                    >
                      Out of Stock
                    </span>
                  ) : product.quantity < 20 ? (
                    <span
                      style={{
                        color: "#d97706",
                        fontWeight: "bold",
                      }}
                    >
                      Low Stock
                    </span>
                  ) : (
                    <span
                      style={{
                        color: "#15803d",
                        fontWeight: "bold",
                      }}
                    >
                      In Stock
                    </span>
                  )}
                </td>

                <td style={tdStyle}>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => onEdit(product)}
                      style={{
                        background: "#2563eb",
                        color: "#fff",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() => onDelete(product.id)}
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      🗑 Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;