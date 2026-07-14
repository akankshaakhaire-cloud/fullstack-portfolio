import axiosInstance from "../api/axios";
import type {
  Product,
  ProductListResponse,
} from "../types/product";

type ProductFilters = {
  search?: string;
  category?: string;
  brand?: string;
  size?: string;
  color?: string;
  page?: number;
  limit?: number;
};

export const getProducts = async (
  filters: ProductFilters = {}
): Promise<ProductListResponse> => {
  const response =
    await axiosInstance.get<ProductListResponse>(
      "/products",
      {
        params: filters,
      }
    );

  return response.data;
};

export const addProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const response =
    await axiosInstance.post<Product>(
      "/products",
      product
    );

  return response.data;
};

export const updateProduct = async (
  id: number,
  product: Omit<Product, "id">
): Promise<Product> => {
  const response =
    await axiosInstance.put<Product>(
      `/products/${id}`,
      product
    );

  return response.data;
};

export const deleteProduct = async (
  id: number
): Promise<void> => {
  await axiosInstance.delete(`/products/${id}`);
};