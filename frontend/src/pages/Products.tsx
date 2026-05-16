import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, ShoppingCart } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";


const categories = ["All", "Lactation", "High Protein", "Egg-Free", "Vegan"];
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
  }),
};

const Products = () => {
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const { data: products, isLoading } = useProducts(category, sortBy);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (productId: string) => {
    if (!user) { toast({ title: "Please sign in", variant: "destructive" }); return; }
    addToCart.mutate({ productId });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Bakes</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Each product is made with wholesome, carefully sourced ingredients.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Button
                  key={c}
                  variant={category === c ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCategory(c)}
                >
                  {c}
                </Button>
              ))}
            </div>
            <select
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Product grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl border border-border animate-pulse">
                  <div className="aspect-square bg-muted rounded-t-xl" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : products?.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No products found in this category.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products?.map((p, i) => {
                const fav = user ? isFavorite(p.id) : false;
                return (
                  <motion.div key={p.id} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="bg-card rounded-xl border border-border overflow-hidden group">
                    <Link to={`/products/${p.id}`}>
                      <div className="aspect-square bg-muted overflow-hidden">
                        {p.image_url ? (
                          <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4">
                      <span className="badge-tag bg-sage-light text-primary text-[10px] mb-2">{p.category}</span>
                      <Link to={`/products/${p.id}`}>
                        <h3 className="font-serif text-lg font-semibold text-foreground mb-1 hover:text-primary transition-colors">{p.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-primary">€{Number(p.price).toFixed(2)}</span>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                            if (!user) { toast({ title: "Please sign in", variant: "destructive" }); return; }
                            toggleFavorite.mutate(p.id);
                          }}>
                            <Heart size={16} className={fav ? "fill-destructive text-destructive" : ""} />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleAddToCart(p.id)}>
                            <ShoppingCart size={16} />
                          </Button>
                        </div>
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

export default Products;
