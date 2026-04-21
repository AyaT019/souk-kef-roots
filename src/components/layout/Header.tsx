import { Link, useLocation } from "react-router-dom";
import { ShoppingBasket, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/products", label: "Produits" },
  { to: "/about", label: "Notre impact" },
  { to: "/onboarding", label: "Devenir vendeuse" },
];

const Header = () => {
  const { pathname } = useLocation();
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-soft flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-olive text-primary-foreground font-display font-bold text-lg shadow-soft group-hover:scale-105 transition-smooth">
            س
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold text-foreground">Souk El Kef</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Terroir & Artisanat</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-smooth",
                pathname === l.to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart" aria-label="Panier">
              <ShoppingBasket className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-[11px] font-semibold flex items-center justify-center shadow-soft">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background animate-fade-in">
          <nav className="container-soft py-3 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-lg text-base font-medium transition-smooth",
                  pathname === l.to ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-sm text-muted-foreground hover:bg-muted"
            >
              Espace productrice
            </Link>
            <Link
              to="/admin"
              onClick={() => setOpen(false)}
              className="px-4 py-3 rounded-lg text-sm text-muted-foreground hover:bg-muted"
            >
              Admin
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
