import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container-wide px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-serif text-xl font-bold text-foreground mb-3">BakeWell</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nourishing bakes made with love. Wholesome ingredients, gentle recipes, crafted for mothers and families.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-2">
              {[
                { to: "/products", label: "Our Bakes" },
                { to: "/for-mothers", label: "For Mothers" },
                { to: "/ingredients", label: "Ingredients" },
                { to: "/about", label: "About Us" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Support</h4>
            <ul className="space-y-2">
              {[
                { to: "/contact", label: "Contact" },
                { to: "/blog", label: "Blog" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-sans text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Rechtliches</h4>
            <ul className="space-y-2">
              {[
                { to: "/impressum", label: "Impressum" },
                { to: "/datenschutz", label: "Datenschutzerklärung" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} BakeWell. Alle Rechte vorbehalten. Hergestellt mit Liebe in Deutschland.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
