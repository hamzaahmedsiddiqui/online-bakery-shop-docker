import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config/api";

export const useCart = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const cartQuery = useQuery({
    queryKey: ["cart", user?.id],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");
      return await res.json();
    },
    enabled: !!user,
  });

  const addToCart = useMutation({
    mutationFn: async ({ productId, quantity = 1 }: any) => {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!res.ok) throw new Error("Failed to add to cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({ title: "Added to cart!" });
    },
  });

  const updateQuantity = useMutation({
    mutationFn: async ({ productId, quantity }: any) => {
      const res = await fetch(
        `${API_URL}/cart/${productId}`, 
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ quantity }),
        }
      );

      if (!res.ok) throw new Error("Failed to update cart");
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const removeFromCart = useMutation({
    mutationFn: async (productId: number) => {
      const res = await fetch(
        `${API_URL}/cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to remove item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast({ title: "Removed from cart" });
    },
  });

  const clearCart = useMutation({
    mutationFn: async () => {
      const res = await fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to clear cart");
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });

  const cartTotal =
    cartQuery.data?.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    ) ?? 0;

  const cartCount =
    cartQuery.data?.reduce(
      (sum: number, item: any) => sum + item.quantity,
      0
    ) ?? 0;

  return {
    cart: cartQuery.data ?? [],
    cartTotal,
    cartCount,
    isLoading: cartQuery.isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };
};