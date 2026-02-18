import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Favorite } from "@/types/database";
import { toast } from "@/hooks/use-toast";

export const useFavorites = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const favoritesQuery = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("*, products(*)")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data as Favorite[];
    },
    enabled: !!user,
  });

  const toggleFavorite = useMutation({
    mutationFn: async (productId: string) => {
      const { data: existing } = await supabase
        .from("favorites")
        .select("id")
        .eq("user_id", user!.id)
        .eq("product_id", productId)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase.from("favorites").delete().eq("id", existing.id);
        if (error) throw error;
        return false;
      } else {
        const { error } = await supabase.from("favorites").insert({ user_id: user!.id, product_id: productId });
        if (error) throw error;
        return true;
      }
    },
    onSuccess: (added) => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      toast({ title: added ? "Added to favorites" : "Removed from favorites" });
    },
  });

  const isFavorite = (productId: string) => {
    return favoritesQuery.data?.some((f) => f.product_id === productId) ?? false;
  };

  return { favorites: favoritesQuery.data ?? [], isLoading: favoritesQuery.isLoading, toggleFavorite, isFavorite };
};
