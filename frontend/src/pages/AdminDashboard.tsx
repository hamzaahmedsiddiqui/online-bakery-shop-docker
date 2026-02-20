import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/hooks/useProducts";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import type { Product } from "@/types/database";
import { Navigate } from "react-router-dom";
import { API_URL } from "@/config/api";

const categories = ["Lactation", "High Protein", "Egg-Free", "Vegan"];

const emptyProduct = { name: "", description: "", price: 0, calories: 0, protein: 0, category: "Lactation", is_featured: false, image_url: "" };

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { data: products, isLoading } = useProducts();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);

  if (authLoading) return <Layout><div className="section-padding text-center text-muted-foreground">Loading...</div></Layout>;
  if (!user || !isAdmin) return <Navigate to="/" replace />;

  const handleSave = async () => {
  if (!editing?.name) {
    toast({ title: "Name is required", variant: "destructive" });
    return;
  }

  const token = localStorage.getItem("token");

  try {
    const method = editing.id ? "PUT" : "POST";
    const endpoint = editing.id
      ? `${API_URL}/products/${editing.id}`
      : `${API_URL}/products`;

    const res = await fetch(endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editing),
    });

    if (!res.ok) throw new Error("Failed to save product");

    toast({ title: editing.id ? "Product updated" : "Product created" });
    setEditing(null);
    queryClient.invalidateQueries({ queryKey: ["products"] });
  } catch (err: any) {
    toast({ title: "Error", description: err.message, variant: "destructive" });
  }
};

 const handleDelete = async (id: number) => {
  if (!confirm("Delete this product?")) return;

  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    toast({ title: "Error deleting product", variant: "destructive" });
    return;
  }

  toast({ title: "Product deleted" });
  queryClient.invalidateQueries({ queryKey: ["products"] });
};

// We’ll integrate S3 later properly. For now, this is just a placeholder to simulate image upload and get a URL back.
<div>
  <label className="text-xs text-muted-foreground block mb-1">
    Image URL
  </label>
  <Input
    placeholder="https://example.com/image.jpg"
    value={editing?.image_url ?? ""}
    onChange={(e) =>
      setEditing({ ...editing, image_url: e.target.value })
    }
  />
  {editing?.image_url && (
    <img
      src={editing.image_url}
      alt="Preview"
      className="mt-2 w-24 h-24 object-cover rounded-lg"
    />
  )}
</div>

const toggleFeatured = async (product: { id: number; name: string; description: string; image_url?: string; price: number; calories?: number; protein?: number; category?: string; is_featured: boolean }) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/products/${product.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      ...product,
      is_featured: !product.is_featured,
    }),
  });

  if (!res.ok) {
    toast({ title: "Error updating product", variant: "destructive" });
    return;
  }

  queryClient.invalidateQueries({ queryKey: ["products"] });
};
console.log("USER:", user);
console.log("IS ADMIN:", isAdmin);
console.log("AUTH LOADING:", authLoading);
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
  <label className="text-xs text-muted-foreground block mb-1">
    Image URL
  </label>
  <Input
    placeholder="https://example.com/image.jpg"
    value={editing?.image_url ?? ""}
    onChange={(e) =>
      setEditing({ ...editing, image_url: e.target.value })
    }
  />
  {editing?.image_url && (
    <img
      src={editing.image_url}
      alt="Preview"
      className="mt-2 w-24 h-24 object-cover rounded-lg"
    />
  )}
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
