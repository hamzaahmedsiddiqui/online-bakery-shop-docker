import { motion } from "framer-motion";
import Layout from "@/components/Layout";

const blogPosts = [
  {
    title: "Why Oats Are a Nursing Mother's Best Friend",
    excerpt: "Oats have been used for generations to support lactation. Learn about the gentle nutrition behind this humble grain and how we use it in our bakes.",
    date: "January 15, 2026",
    category: "Nutrition",
  },
  {
    title: "Understanding Egg Allergies: A Guide for Parents",
    excerpt: "Egg allergies are one of the most common food allergies in children. Here's what every parent should know — and how BakeWell can help.",
    date: "December 20, 2025",
    category: "Allergies",
  },
  {
    title: "5 Simple Snacks for Busy Nursing Mums",
    excerpt: "When you're feeding around the clock, you need quick, nourishing snacks. Here are our top five — including one you can bake at home.",
    date: "November 8, 2025",
    category: "Motherhood",
  },
  {
    title: "The Benefits of Plant-Based Protein in Baking",
    excerpt: "Protein doesn't have to come from eggs. Discover how we use pea protein and almond flour to create satisfying, protein-rich treats.",
    date: "October 22, 2025",
    category: "Ingredients",
  },
];

const Blog = () => {
  return (
    <Layout>
      <section className="section-padding">
        <div className="container-narrow">
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Stories, tips, and gentle guidance on nutrition, motherhood, and wholesome baking.
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-xl p-8 border border-border hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="badge-tag bg-sage-light text-primary">{post.category}</span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h2 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-2">{post.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
