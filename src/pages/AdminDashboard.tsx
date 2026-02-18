import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Star, Upload } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/types/database";
import { Navigate } from "react-router-dom";

const categories = ["Lactation", "High Protein", "Egg-Free", "Vegan"];

const emptyProduct = { name: "", description: "", price: 0, calories: 0, protein: 0, category: "Lactation", is_featured: false, image_url: "" };

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { data: products, isLoading } = useProducts();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [uploading, setUploading] = useState(false);

  if (authLoading) return <Layout><div className="section-padding text-center text-muted-foreground">Loading...</div></Layout>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  const handleSave = async () => {
    if (!editing?.name) { toast({ title: "Name is required", variant: "destructive" }); return; }
    try {
      if (editing.id) {
        const { error } = await supabase.from("products").update({
          name: editing.name, description: editing.description, price: editing.price,
          calories: editing.calories, protein: editing.protein, category: editing.category,
          is_featured: editing.is_featured, image_url: editing.image_url || null,
        }).eq("id", editing.id);
        if (error) throw error;
        toast({ title: "Product updated" });
      } else {
        const { error } = await supabase.from("products").insert({
          name: editing.name, description: editing.description ?? "", price: editing.price ?? 0,
          calories: editing.calories, protein: editing.protein, category: editing.category ?? "Lactation",
          is_featured: editing.is_featured ?? false, image_url: editing.image_url || null,
        });
        if (error) throw error;
        toast({ title: "Product created" });
      }
      setEditing(null);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else {
      toast({ title: "Product deleted" });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) { toast({ title: "Upload failed", description: error.message, variant: "destructive" }); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("product-images").getPublicUrl(path);
    setEditing((prev) => prev ? { ...prev, image_url: publicUrl } : prev);
    setUploading(false);
    toast({ title: "Image uploaded" });
  };

  const toggleFeatured = async (product: Product) => {
    await supabase.from("products").update({ is_featured: !product.is_featured }).eq("id", product.id);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <div className="flex items-center justify-between mb-8">
            <h1 className="font-serif text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <Button onClick={() => setEditing({ ...emptyProduct })} className="gap-2"><Plus size={16} /> Add Product</Button>
          </div>

          {/* Edit/Create Modal */}
          {editing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4">
              <div className="bg-background rounded-xl p-6 w-full max-w-lg border border-border max-h-[90vh] overflow-y-auto">
                <h2 className="font-serif text-xl font-bold mb-4">{editing.id ? "Edit Product" : "New Product"}</h2>
                <div className="space-y-3">
                  <Input placeholder="Product name" value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
                  <textarea
                    placeholder="Description"
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]"
                    value={editing.description ?? ""}
                    onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground">Price (€)</label>
                      <Input type="number" step="0.01" value={editing.price ?? 0} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Calories</label>
                      <Input type="number" value={editing.calories ?? 0} onChange={(e) => setEditing({ ...editing, calories: parseInt(e.target.value) || 0 })} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground">Protein (g)</label>
                      <Input type="number" step="0.1" value={editing.protein ?? 0} onChange={(e) => setEditing({ ...editing, protein: parseFloat(e.target.value) || 0 })} />
                    </div>
                  </div>
                  <select
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={editing.category ?? "Lactation"}
                    onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  >
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={editing.is_featured ?? false} onChange={(e) => setEditing({ ...editing, is_featured: e.target.checked })} />
                    Featured product
                  </label>
                  <div>
                    <label className="text-xs text-muted-foreground block mb-1">Product Image</label>
                    <div className="flex gap-2">
                      <Input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                    </div>
                    {editing.image_url && <img src={editing.image_url} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded-lg" />}
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button onClick={handleSave} className="flex-1">Save</Button>
                  <Button variant="outline" onClick={() => setEditing(null)} className="flex-1">Cancel</Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Product list */}
          {isLoading ? (
            <p className="text-muted-foreground">Loading products...</p>
          ) : (
            <div className="space-y-3">
              {products?.map((p) => (
                <div key={p.id} className="flex items-center gap-4 bg-card rounded-lg p-4 border border-border">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    {p.image_url ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">—</div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{p.name}</h3>
                    <p className="text-sm text-muted-foreground">{p.category} · €{Number(p.price).toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => toggleFeatured(p)} title={p.is_featured ? "Unfeature" : "Feature"}>
                    <Star size={16} className={p.is_featured ? "fill-primary text-primary" : "text-muted-foreground"} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setEditing(p)}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(p.id)}><Trash2 size={16} /></Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
