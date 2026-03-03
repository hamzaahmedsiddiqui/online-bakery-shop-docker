import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useProduct(id!);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    if (!user) { toast({ title: "Please sign in", description: "You need to be logged in to add items to cart.", variant: "destructive" }); return; }
    addToCart.mutate({ productId: id! });
  };

  const handleToggleFavorite = () => {
    if (!user) { toast({ title: "Please sign in", description: "You need to be logged in to add favorites.", variant: "destructive" }); return; }
    toggleFavorite.mutate(id!);
  };

  if (isLoading) return <Layout><div className="section-padding text-center text-muted-foreground">Loading...</div></Layout>;
  if (!product) return <Layout><div className="section-padding text-center text-muted-foreground">Product not found.</div></Layout>;

  const fav = user ? isFavorite(product.id) : false;

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 text-sm">
            <ArrowLeft size={16} /> Back to products
          </Link>
          <div className="flex flex-col md:flex-row gap-10">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="md:w-1/2">
              <div className="aspect-square rounded-xl overflow-hidden bg-muted">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">No image</div>
                )}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="md:w-1/2">
              <span className="badge-tag bg-sage-light text-primary mb-4">{product.category}</span>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <p className="text-2xl font-semibold text-primary mb-4">€{Number(product.price).toFixed(2)}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
              <div className="flex gap-4 mb-6">
                {product.calories && (
                  <div className="bg-card rounded-lg p-3 border border-border text-center min-w-[80px]">
                    <p className="text-lg font-semibold text-foreground">{product.calories}</p>
                    <p className="text-xs text-muted-foreground">Calories</p>
                  </div>
                )}
                {product.protein && (
                  <div className="bg-card rounded-lg p-3 border border-border text-center min-w-[80px]">
                    <p className="text-lg font-semibold text-foreground">{Number(product.protein)}g</p>
                    <p className="text-xs text-muted-foreground">Protein</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <Button onClick={handleAddToCart} className="flex-1 gap-2" disabled={addToCart.isPending}>
                  <ShoppingCart size={18} /> Add to Cart
                </Button>
                <Button variant="outline" size="icon" onClick={handleToggleFavorite}>
                  <Heart size={18} className={fav ? "fill-destructive text-destructive" : ""} />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
