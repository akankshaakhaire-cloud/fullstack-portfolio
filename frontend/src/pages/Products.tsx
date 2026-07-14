import { useEffect, useState } from "react";

import ProductForm from "../components/ProductForm";
import ProductTable from "../components/ProductTable";

import {
  getProducts,
  deleteProduct,
} from "../services/productApi";

import type { Product } from "../types/product";

const categories = ["Men", "Women", "Kids"];

const brands = [
  "Nike",
  "Adidas",
  "Puma",
  "Levi's",
  "Allen Solly",
  "U.S. Polo Assn.",
];

const sizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
];

const colors = [
  "Black",
  "White",
  "Blue",
  "Red",
  "Green",
  "Grey",
];

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeout);
  }, [
    search,
    category,
    brand,
    size,
    color,
    page,
  ]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts({
        search,
        category,
        brand,
        size,
        color,
        page,
        limit,
      });

      setProducts(response.data);
      setTotalPages(response.total_pages);
      setTotalProducts(response.total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setSize("");
    setColor("");
    setPage(1);
  };

  const handleAdd = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      alert("✅ Product Deleted");

      fetchProducts();
    } catch (error) {
      console.error(error);

      alert("❌ Failed to delete product");
    }
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#0f172a",
            fontSize: "32px",
          }}
        >
          📦 Products
        </h1>

        <p
          style={{
            color: "#64748b",
            marginTop: "8px",
          }}
        >
          Manage your cloth inventory products.
        </p>
      </div>
            {/* Filter Bar */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          marginBottom: "25px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={{
            flex: 1,
            minWidth: "220px",
            padding: "12px",
            border: "1px solid #cbd5e1",
            borderRadius: "10px",
          }}
        />

        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Category</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={brand}
          onChange={(e) => {
            setBrand(e.target.value);
            setPage(1);
          }}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Brand</option>

          {brands.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
            setPage(1);
          }}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Size</option>

          {sizes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            setPage(1);
          }}
          style={{
            padding: "12px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
          }}
        >
          <option value="">Color</option>

          {colors.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          style={{
            padding: "12px 18px",
            border: "none",
            borderRadius: "10px",
            background: "#64748b",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Reset
        </button>

        <button
          onClick={handleAdd}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "10px",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ➕ Add Product
        </button>
      </div>

      {/* Form */}

      {showForm && (
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "12px",
            marginBottom: "30px",
            boxShadow: "0 4px 12px rgba(0,0,0,.08)",
          }}
        >
          <h2>
            {selectedProduct
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <ProductForm
            product={selectedProduct}
            onSuccess={() => {
              fetchProducts();
              setShowForm(false);
              setSelectedProduct(null);
            }}
            onCancel={() => {
              setShowForm(false);
              setSelectedProduct(null);
            }}
          />
        </div>
      )}

      {/* Table */}

      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,.08)",
        }}
      >
        <h2>Product List</h2>

        {loading ? (
          <p>Loading...</p>
        ) : products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "#64748b",
              fontSize: "16px",
            }}
          >
            🚫 No products found
          </div>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
                {/* Pagination */}

        {!loading && totalProducts > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
              paddingTop: "20px",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                background: page === 1 ? "#cbd5e1" : "#2563eb",
                color: "#fff",
                cursor: page === 1 ? "not-allowed" : "pointer",
              }}
            >
              ◀ Previous
            </button>

            <div
              style={{
                textAlign: "center",
                color: "#334155",
                fontWeight: "600",
              }}
            >
              <div>
                Page <strong>{page}</strong> of{" "}
                <strong>{totalPages}</strong>
              </div>

              <div
                style={{
                  fontSize: "14px",
                  marginTop: "4px",
                  color: "#64748b",
                }}
              >
                Total Products: {totalProducts}
              </div>
            </div>

            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                background:
                  page === totalPages ? "#cbd5e1" : "#2563eb",
                color: "#fff",
                cursor:
                  page === totalPages
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              Next ▶
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;