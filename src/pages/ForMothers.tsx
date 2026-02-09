import { motion } from "framer-motion";
import { Heart, ShieldCheck, Leaf } from "lucide-react";
import Layout from "@/components/Layout";
import motherBaby from "@/assets/mother-baby.jpg";
import lactationCookies from "@/assets/lactation-cookies.jpg";

const ForMothers = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={motherBaby} alt="Mother with baby" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="relative section-padding container-wide">
          <div className="max-w-lg py-8 md:py-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight"
            >
              For You, Mama
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Nourishing yourself is one of the most loving things you can do for your baby. Our lactation cookies are crafted with ingredients traditionally used to support nursing mothers — gently, naturally.
            </motion.p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding bg-card">
        <div className="container-narrow">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8 text-center">
            Gentle Support, Not Medical Claims
          </h2>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            We want to be transparent: our cookies are not a medical product. They contain ingredients like oats, flaxseed, and brewer's yeast, which have been used by mothers for generations. Many women find comfort and nourishment in these traditional recipes. We simply provide a delicious, convenient way to enjoy them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Traditional Ingredients", desc: "Oats, flaxseed, and brewer's yeast — ingredients mothers have trusted for generations." },
              { icon: ShieldCheck, title: "Safe & Transparent", desc: "Full ingredient list on every product. No hidden additives or fillers." },
              { icon: Leaf, title: "Wholesome & Natural", desc: "Naturally sweetened, made with whole foods. Feel good about every bite." },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-sage-light flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured product */}
      <section className="section-padding">
        <div className="container-narrow">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <img src={lactationCookies} alt="Lactation cookies" className="w-full rounded-xl" loading="lazy" />
            </div>
            <div className="md:w-1/2">
              <span className="badge-tag bg-sage-light text-primary mb-4 inline-block">Our Bestseller</span>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-3">Lactation Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our most loved product. Soft, chewy oat cookies made with flaxseed, brewer's yeast, and a touch of dark chocolate. Designed to be a comforting snack during those long nursing sessions.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Key Ingredients:</strong> Rolled oats, ground flaxseed, brewer's yeast, coconut oil, maple syrup, dark chocolate chips, vanilla extract.
              </p>
              <p className="text-xs text-muted-foreground italic">
                *These cookies are a food product, not a medical device. They are not intended to diagnose, treat, cure, or prevent any condition.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ForMothers;
