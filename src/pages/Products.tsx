import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import lactationCookies from "@/assets/lactation-cookies.jpg";
import proteinBrownies from "@/assets/protein-brownies.jpg";
import eggFreeCookies from "@/assets/egg-free-cookies.jpg";
import veganBananaBread from "@/assets/vegan-banana-bread.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const products = [
  {
    name: "Lactation Cookies",
    desc: "Our signature cookies crafted especially for nursing mothers. Made with oats, flaxseed, and brewer's yeast — traditional galactagogue ingredients used for generations to support milk production.",
    img: lactationCookies,
    tags: ["For Mothers", "Egg-Free Option"],
    ingredients: "Oats, flaxseed, brewer's yeast, coconut oil, maple syrup, dark chocolate chips, vanilla extract",
  },
  {
    name: "Protein Brownies",
    desc: "Rich, fudgy brownies fortified with plant-based protein. Perfect for an energy boost after a workout or a busy day with little ones. Naturally sweetened.",
    img: proteinBrownies,
    tags: ["High Protein", "Egg-Free Option"],
    ingredients: "Almond flour, pea protein, cocoa powder, coconut sugar, coconut oil, dark chocolate, vanilla",
  },
  {
    name: "Egg-Free Cookies",
    desc: "Classic chocolate chip cookies made entirely without eggs. Safe for those with egg allergies, and just as delicious as traditional recipes.",
    img: eggFreeCookies,
    tags: ["Egg-Free", "Allergy Friendly"],
    ingredients: "Oat flour, coconut oil, coconut sugar, chocolate chips, baking soda, vanilla extract, flax egg",
  },
  {
    name: "Vegan Banana Bread",
    desc: "Moist, naturally sweetened banana bread made entirely from plant-based ingredients. Comforting, nourishing, and wonderfully simple.",
    img: veganBananaBread,
    tags: ["Vegan", "Egg-Free"],
    ingredients: "Ripe bananas, oat flour, coconut oil, maple syrup, cinnamon, walnuts, baking soda",
  },
];

const Products = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Our Bakes</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Each product is made with wholesome, carefully sourced ingredients. We believe in full transparency — you'll always know exactly what's inside.
            </p>
          </div>

          <div className="space-y-20">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`flex flex-col ${i % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center`}
              >
                <div className="md:w-1/2">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {p.tags.map((t) => (
                      <span key={t} className="badge-tag bg-sage-light text-primary">{t}</span>
                    ))}
                  </div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">{p.name}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                  <div className="bg-card rounded-lg p-4 border border-border">
                    <p className="text-xs font-semibold uppercase tracking-wider text-foreground mb-1">Ingredients</p>
                    <p className="text-sm text-muted-foreground">{p.ingredients}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Products;
