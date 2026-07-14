import axiosInstance from "./axios";

export type DashboardStats = {
  total_products: number;
  inventory_value: number;
  low_stock: number;
  categories: number;
  recent_products: any[];
};

export const getDashboardStats = async () => {
  const response = await axiosInstance.get<DashboardStats>(
    "/dashboard/stats"
  );

  return response.data;
};