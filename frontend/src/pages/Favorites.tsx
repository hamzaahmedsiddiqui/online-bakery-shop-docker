import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";

const Favorites = () => {
  const { user } = useAuth();
  const { favorites, isLoading, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  if (!user) {
    return (
      <Layout>
        <section className="section-padding text-center">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Favorites</h1>
          <p className="text-muted-foreground mb-6">Please sign in to view your favorites.</p>
          <Link to="/login"><Button>Sign In</Button></Link>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">Your Favorites</h1>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : favorites.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">You haven't added any favorites yet.</p>
              <Link to="/products"><Button variant="outline">Browse Products</Button></Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favorites.map((fav: any) => {
                const product = fav; // product fields are already flat
                return (
                  <motion.div key={fav.id} layout className="bg-card rounded-xl border border-border overflow-hidden">
                    <Link to={`/products/${product.id}`}>
                      <div className="aspect-square bg-muted">
                        {product.image_url ? (
                          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <h3 className="font-serif font-semibold text-foreground mb-1">{product.name}</h3>
                      <p className="text-primary font-medium mb-3">€{Number(product.price).toFixed(2)}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 gap-1" onClick={() => addToCart.mutate({ productId: product.id })}>
                          <ShoppingCart size={14} /> Add
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleFavorite.mutate(product.id)}>
                          <Heart size={14} className="fill-destructive text-destructive" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Favorites;
