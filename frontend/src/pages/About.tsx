import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import motherBaby from "@/assets/mother-baby.jpg";

const About = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">About BakeWell</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A small bakery with a big heart, crafting nourishing bakes for mothers and families in Germany.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-10 items-center mb-20"
          >
            <div className="md:w-1/2">
              <img src={motherBaby} alt="A mother and baby" className="w-full rounded-xl" loading="lazy" />
            </div>
            <div className="md:w-1/2">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                BakeWell was born from a simple need: a new mother looking for wholesome, comforting snacks during her nursing journey. When store-bought options fell short — too processed, unclear ingredients, and not nurturing enough — she decided to bake her own.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                What started as a kitchen experiment with lactation cookie recipes quickly grew into something bigger. Friends, family, and other mothers started asking for more. And so, BakeWell was born.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, we bake with the same philosophy: wholesome ingredients, full transparency, and recipes made with genuine care. Every product is crafted to nourish — body and spirit.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { number: "100%", label: "Ingredient Transparency" },
              { number: "0", label: "Artificial Additives" },
              { number: "♡", label: "Made with Love" },
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-card rounded-xl p-8 border border-border">
                <p className="font-serif text-3xl font-bold text-primary mb-2">{stat.number}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="bg-accent rounded-xl p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Our Promise</h2>
            <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
              We will never use misleading labels. We will never make medical claims. We will always tell you exactly what's in our products. Your trust means everything to us.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
