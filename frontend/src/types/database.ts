// Manual types until auto-generated types update
export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string | null;
  price: number;
  calories: number | null;
  protein: number | null;
  category: string;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  updated_at: string;
  products?: Product;
}

export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  products?: Product;
}

export interface Order {
  id: string;
  user_id: string;
  total: number;
  status: string;
  created_at: string;
}

export type AppRole = 'admin' | 'user';
