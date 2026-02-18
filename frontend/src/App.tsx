import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";


const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const ForMothers = lazy(() => import("./pages/ForMothers"));
const Ingredients = lazy(() => import("./pages/Ingredients"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const Contact = lazy(() => import("./pages/Contact"));
const Impressum = lazy(() => import("./pages/Impressum"));
const Datenschutz = lazy(() => import("./pages/Datenschutz"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Cart = lazy(() => import("./pages/Cart"));
const Favorites = lazy(() => import("./pages/Favorites"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <p className="text-muted-foreground text-sm">Loading...</p>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/for-mothers" element={<ForMothers />} />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/impressum" element={<Impressum />} />
              <Route path="/datenschutz" element={<Datenschutz />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
