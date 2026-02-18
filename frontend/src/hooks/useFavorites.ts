import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { API_URL } from "@/config/api";

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch favorites");

      return await res.json();
    },
    enabled: !!user,
  });

  const toggleFavorite = useMutation({
    mutationFn: async (productId: number) => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API_URL}/favorites/${productId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to toggle favorite");

      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast({
        title: data.added
          ? "Added to favorites"
          : "Removed from favorites",
      });
    },
  });

  const isFavorite = (productId: number) => {
    return (
      favoritesQuery.data?.some((f: any) => f.product_id === productId) ??
      false
    );
  };

  return {
    favorites: favoritesQuery.data ?? [],
    isLoading: favoritesQuery.isLoading,
    toggleFavorite,
    isFavorite,
  };
};