import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, Leaf, Wheat } from "lucide-react";
import Layout from "@/components/Layout";

const allergenInfo = [
  { allergen: "Eggs", status: "All products available egg-free", safe: true },
  { allergen: "Dairy", status: "Select products are dairy-free (check labels)", safe: false },
  { allergen: "Gluten", status: "Oat-based products may contain gluten traces", safe: false },
  { allergen: "Nuts", status: "Some products contain tree nuts (walnuts, almonds)", safe: false },
  { allergen: "Soy", status: "Soy-free options available", safe: true },
];

const Ingredients = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Ingredients & Allergies
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Transparency is at the heart of BakeWell. We want you to feel confident about every ingredient in our products.
            </p>
          </div>

          {/* Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-xl p-8 border border-border mb-12"
          >
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Ingredient Philosophy</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Leaf, text: "We use whole, minimally processed ingredients wherever possible." },
                { icon: ShieldCheck, text: "Every ingredient is listed clearly on our packaging and website." },
                { icon: Wheat, text: "We source organic and local ingredients when available." },
                { icon: AlertTriangle, text: "We take allergen cross-contamination seriously and work to minimise risk." },
              ].map((item) => (
                <div key={item.text} className="flex gap-3 items-start">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-sage-light flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Allergen Table */}
          <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Allergen Overview</h2>
          <div className="rounded-xl border border-border overflow-hidden mb-12">
            <table className="w-full">
              <thead>
                <tr className="bg-card">
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-foreground px-6 py-4">Allergen</th>
                  <th className="text-left text-xs font-semibold uppercase tracking-wider text-foreground px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {allergenInfo.map((a) => (
                  <tr key={a.allergen} className="border-t border-border">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{a.allergen}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground flex items-center gap-2">
                      {a.safe ? (
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-blush-dark shrink-0" />
                      )}
                      {a.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-accent rounded-xl p-6 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Important Note:</strong> While we take great care, our products are made in a kitchen that handles various allergens including nuts, gluten, and dairy. If you have a severe allergy, please contact us directly before ordering so we can discuss your specific needs.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Ingredients;
