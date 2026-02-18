import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Cart = () => {
  const { user } = useAuth();
  const { cart, cartTotal, isLoading, updateQuantity, removeFromCart, clearCart } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  if (!user) {
    return (
      <Layout>
        <section className="section-padding text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Your Cart</h1>
          <p className="text-muted-foreground mb-6">Please sign in to view your cart.</p>
          <Link to="/login"><Button>Sign In</Button></Link>
        </section>
      </Layout>
    );
  }

const handleCheckout = async () => {
  if (cart.length === 0) return;

  setCheckingOut(true);

  try {
    await clearCart.mutateAsync();
    toast({
      title: "Order placed!",
      description: "Mock checkout complete.",
    });
  } catch (err: any) {
    toast({
      title: "Error",
      description: err.message,
      variant: "destructive",
    });
  }

  setCheckingOut(false);
};

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-8">Your Cart</h1>
          {isLoading ? (
            <p className="text-muted-foreground">Loading...</p>
          ) : cart.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Link to="/products"><Button variant="outline">Browse Products</Button></Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cart.map((item) => {
                  const product = item;
                  return (
                    <motion.div key={item.id} layout className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        {item?.image_url ? (
                          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">No img</div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-semibold text-foreground truncate">{product?.name}</h3>
                        <p className="text-primary font-medium">€{Number(item?.price ?? 0).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity.mutate({ productId: item.product_id, quantity: item.quantity - 1 })}>
                          <Minus size={14} />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => updateQuantity.mutate({ productId: item.product_id, quantity: item.quantity + 1 })}>
                          <Plus size={14} />
                        </Button>
                      </div>
                      <p className="font-semibold text-foreground w-20 text-right">€{(Number(item?.price ?? 0) * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFromCart.mutate(item.product_id)}>
                        <Trash2 size={16} />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-foreground">Total</span>
                  <span className="text-2xl font-bold text-primary">€{cartTotal.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg" onClick={handleCheckout} disabled={checkingOut}>
                  {checkingOut ? "Processing..." : "Place Order (Mock)"}
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-2">This is a mock checkout — no real payment is processed.</p>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
