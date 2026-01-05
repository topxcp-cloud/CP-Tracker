import { Link } from "react-router-dom";
import { Terminal, Github, Twitter, Linkedin, Heart } from "lucide-react";

/**
 * Footer component with links and social media
 */
const Footer = () => {
  const footerLinks = {
    product: [
      { label: "CP Tracker", path: "/sheet" },
      { label: "Contest Tracker", path: "/contests" },
      { label: "Analytics", path: "/analytics" },
      { label: "Profile", path: "/profile" },
    ],
    resources: [
      { label: "Getting Started", path: "#" },
      { label: "Documentation", path: "#" },
      { label: "Problem Set", path: "#" },
      { label: "Community", path: "#" },
    ],
    company: [
      { label: "About", path: "#" },
      { label: "Blog", path: "#" },
      { label: "Careers", path: "#" },
      { label: "Contact", path: "#" },
    ],
  };

  return (
    <footer className="border-t border-border bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Terminal className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold">
                CP<span className="gradient-text">Tracker</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Master competitive programming from daily practice with our structured roadmap and practice problems.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted hover:border-primary/50 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted hover:border-primary/50 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted hover:border-primary/50 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 CP Tracker. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for competitive programmers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
