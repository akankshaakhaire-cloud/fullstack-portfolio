export interface Product {
  id: number;
  product_name: string;
  category?: string;
  brand?: string;
  size?: string;
  color?: string;
  price: number;
  quantity: number;
  image_url?: string;
}

export interface ProductListResponse {
  total: number;
  page: number;
  limit: number;
  total_pages: number;
  data: Product[];
}