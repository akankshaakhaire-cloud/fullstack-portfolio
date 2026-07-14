import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import {
  addProduct,
  updateProduct,
} from "../services/productApi";

type ProductFormProps = {
  product: Product | null;
  onSuccess: () => void;
  onCancel: () => void;
};

const emptyForm = {
  product_name: "",
  category: "",
  brand: "",
  size: "",
  color: "",
  price: 0,
  quantity: 0,
  image_url: "",
};

const categories = [
  "Men",
  "Women",
  "Kids",
];

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

const ProductForm = ({
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState(emptyForm);

  useEffect(() => {
    if (product) {
      setFormData({
        product_name: product.product_name,
        category: product.category || "",
        brand: product.brand || "",
        size: product.size || "",
        color: product.color || "",
        price: product.price,
        quantity: product.quantity,
        image_url: product.image_url || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [product]);

  const inputStyle = {
    width: "100%",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "quantity"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (product) {
        await updateProduct(
          product.id,
          formData
        );

        alert("✅ Product Updated");
      } else {
        await addProduct(formData);

        alert("✅ Product Added");
      }

      onSuccess();
    } catch (error) {
      console.error(error);

      alert("❌ Operation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={formData.product_name}
          onChange={handleChange}
          style={inputStyle}
          required
        />        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

        <select
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Brand</option>
          {brands.map((brand) => (
            <option
              key={brand}
              value={brand}
            >
              {brand}
            </option>
          ))}
        </select>

        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Size</option>
          {sizes.map((size) => (
            <option
              key={size}
              value={size}
            >
              {size}
            </option>
          ))}
        </select>

        <select
          name="color"
          value={formData.color}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="">Select Color</option>
          {colors.map((color) => (
            <option
              key={color}
              value={color}
            >
              {color}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={formData.image_url}
          onChange={handleChange}
          style={inputStyle}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "15px",
          marginTop: "25px",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "12px 20px",
            borderRadius: "10px",
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 22px",
            borderRadius: "10px",
            border: "none",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          {loading
            ? "Saving..."
            : product
            ? "✏️ Update Product"
            : "💾 Save Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;