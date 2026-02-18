import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Heart, User, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Our Bakes" },
  { to: "/for-mothers", label: "For Mothers" },
  { to: "/ingredients", label: "Ingredients & Allergies" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <nav className="container-wide flex items-center justify-between px-6 py-4 md:px-12">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-foreground">
          BakeWell
        </Link>

        {/* Desktop */}
        <ul className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side icons */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <Link to="/favorites" className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <Heart size={20} />
              </Link>
              <Link to="/cart" className="p-2 text-muted-foreground hover:text-primary transition-colors relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {isAdmin && (
                <Link to="/admin" className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Admin">
                  <Shield size={20} />
                </Link>
              )}
              <button onClick={signOut} className="p-2 text-muted-foreground hover:text-primary transition-colors" title="Sign out">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden border-b border-border bg-background"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`block py-2 text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.to ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-border pt-2 mt-2">
                {user ? (
                  <div className="space-y-1">
                    <Link to="/favorites" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary">Favorites</Link>
                    <Link to="/cart" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary">Cart {cartCount > 0 && `(${cartCount})`}</Link>
                    {isAdmin && <Link to="/admin" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary">Admin</Link>}
                    <button onClick={() => { signOut(); setOpen(false); }} className="block py-2 text-sm font-medium text-muted-foreground hover:text-primary">Sign Out</button>
                  </div>
                ) : (
                  <Link to="/login" onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-primary">Sign In</Link>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
