import { useQuery } from "@tanstack/react-query";
import { API_URL } from "@/config/api";

export interface Product {
  id: number;
  name: string;
  description: string;
  image_url?: string;
  price: number;
  calories?: number;
  protein?: number;
  category?: string;
  is_featured: boolean;
  created_at: string;
  updated_at?: string;
}

// 🔹 Get all products (with filter + sort)
export const useProducts = (category?: string, sortBy?: string) => {
  return useQuery({
    queryKey: ["products", category, sortBy],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");

      let data: Product[] = await res.json();

      // Filter
      if (category && category !== "All") {
        data = data.filter(p => p.category === category);
      }

      // Sort
      if (sortBy === "price-asc") {
        data.sort((a, b) => a.price - b.price);
      } else if (sortBy === "price-desc") {
        data.sort((a, b) => b.price - a.price);
      } else {
        data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
      }

      return data;
    },
  });
};

// 🔹 Get featured products
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data: Product[] = await res.json();
      return data.filter(p => p.is_featured).slice(0, 4);
    },
  });
};

// 🔹 Get single product
export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/products/${id}`);
      if (!res.ok) throw new Error("Failed to fetch product");

      const data: Product = await res.json();
      return data;
    },
    enabled: !!id,
  });
};