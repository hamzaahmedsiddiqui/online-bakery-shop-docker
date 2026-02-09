import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Leaf, ShieldCheck, Wheat } from "lucide-react";
import Layout from "@/components/Layout";
import heroBakery from "@/assets/hero-bakery.jpg";
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
  { name: "Lactation Cookies", desc: "Nourishing cookies with oats, flaxseed & brewer's yeast to support nursing mothers.", img: lactationCookies, tags: ["Egg-Free Option"] },
  { name: "Protein Brownies", desc: "Rich, fudgy brownies packed with plant protein. A guilt-free indulgence.", img: proteinBrownies, tags: ["High Protein"] },
  { name: "Egg-Free Cookies", desc: "Delicious chocolate chip cookies made entirely without eggs. Allergy-friendly.", img: eggFreeCookies, tags: ["Egg-Free"] },
  { name: "Vegan Banana Bread", desc: "Moist, naturally sweetened banana bread. 100% plant-based goodness.", img: veganBananaBread, tags: ["Vegan"] },
];

const values = [
  { icon: Heart, title: "Made for Mothers", desc: "Every recipe is developed with nursing and new mothers in mind." },
  { icon: ShieldCheck, title: "Transparent Ingredients", desc: "We list every ingredient clearly. No hidden additives, ever." },
  { icon: Wheat, title: "Allergy Conscious", desc: "Egg-free, vegan, and allergen-friendly options available." },
  { icon: Leaf, title: "Wholesome & Natural", desc: "Real food ingredients. Gentle nutrition without compromise." },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroBakery} alt="Freshly baked cookies and brownies" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
        </div>
        <div className="relative section-padding container-wide">
          <div className="max-w-xl py-12 md:py-20">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="badge-tag bg-sage-light text-primary mb-6"
            >
              Handcrafted in Germany
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-foreground leading-tight mb-6"
            >
              Nourishing Bakes,{" "}
              <span className="text-primary">Made with Love</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-8 leading-relaxed"
            >
              Wholesome cookies, brownies, and breads crafted for mothers, families, and anyone who cares about what they eat. Egg-free, vegan, and protein-rich options available.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/products"
                className="px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Explore Our Bakes
              </Link>
              <Link
                to="/for-mothers"
                className="px-8 py-3 bg-secondary text-secondary-foreground font-medium rounded-lg hover:bg-accent transition-colors"
              >
                For Mothers
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-card">
        <div className="container-wide">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sage-light flex items-center justify-center">
                  <v.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products preview */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Our Bakes</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Every product is made with carefully selected, wholesome ingredients. Transparency is at the heart of everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link to="/products" className="group block">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-muted">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {p.tags.map((t) => (
                      <span key={t} className="badge-tag bg-sage-light text-primary text-[10px]">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-accent">
        <div className="container-narrow text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Baked with Purpose
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">
            Whether you're a new mum looking for lactation support, or simply want wholesome treats — BakeWell is here for you.
          </p>
          <Link
            to="/about"
            className="inline-block px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Learn Our Story
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
