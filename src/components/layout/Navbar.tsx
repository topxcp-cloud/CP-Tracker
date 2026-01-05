import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Terminal, Zap, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";

/**
 * Main navigation component
 * Features responsive design with mobile hamburger menu
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/sheet", label: "CP Sheet" },
    { path: "/contests", label: "Contest Tracker" },
    { path: "/analytics", label: "Analytics" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 transition-all group-hover:bg-primary/20">
            <Terminal className="h-5 w-5 text-primary" />
            <div className="absolute inset-0 rounded-lg animate-glow-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-bold">
            CP<span className="gradient-text"> Tracker</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Theme Toggle & Auth Button - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {!loading && (
            user ? (
              <Button 
                variant="outline" 
                className="border-border"
                onClick={() => navigate('/profile')}
              >
                <User className="mr-2 h-4 w-4" />
                Profile
              </Button>
            ) : (
              <Button 
                className="bg-primary text-primary-foreground hover:bg-primary/90 glow-primary"
                onClick={() => navigate('/auth')}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            )
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg border border-border hover:bg-muted transition-colors"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="container mx-auto py-4 px-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg transition-colors ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {!loading && (
                user ? (
                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground"
                  >
                    Profile
                  </Link>
                ) : (
                  <Button 
                    className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                    onClick={() => { setIsOpen(false); navigate('/auth'); }}
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </Button>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
