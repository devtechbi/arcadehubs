import { Link, useLocation } from "react-router-dom";
import { Gamepad2, Home } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Gamepad2 className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display font-bold text-xl neon-text text-primary">
            ARCADE HUB
          </span>
        </Link>

        {!isHome && (
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors font-display text-sm uppercase tracking-wider"
          >
            <Home className="w-4 h-4" />
            All Games
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
