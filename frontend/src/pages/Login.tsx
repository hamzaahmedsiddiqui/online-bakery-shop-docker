import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!" });
      navigate("/");
    }
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card rounded-xl p-8 border border-border"
          >
            <h1 className="font-serif text-3xl font-bold text-foreground mb-2 text-center">Welcome Back</h1>
            <p className="text-muted-foreground text-center mb-8">Sign in to your BakeWell account</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Password</label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
            <p className="text-sm text-muted-foreground text-center mt-6">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-medium hover:underline">Sign up</Link>
            </p>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;
