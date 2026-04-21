import { Link } from "react-router-dom";
import { Heart, MapPin, Mail } from "lucide-react";

const Footer = () => (
  <footer className="mt-24 border-t border-border/60 bg-muted/40">
    <div className="container-soft py-14 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-olive text-primary-foreground font-display font-bold text-lg">
            س
          </div>
          <div className="font-display text-lg font-semibold">Souk El Kef</div>
        </div>
        <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
          Une plateforme solidaire qui connecte les femmes productrices et artisanes
          du Kef avec des clients qui valorisent l'authenticité du terroir tunisien.
        </p>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-secondary font-medium">
          <Heart className="h-4 w-4 fill-current" /> Fait avec amour à Le Kef, Tunisie
        </p>
      </div>

      <div>
        <h4 className="font-display text-base font-semibold mb-3">Découvrir</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/products" className="hover:text-foreground">Tous les produits</Link></li>
          <li><Link to="/about" className="hover:text-foreground">Notre impact</Link></li>
          <li><Link to="/onboarding" className="hover:text-foreground">Devenir vendeuse</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="font-display text-base font-semibold mb-3">Contact</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Le Kef, Tunisie</li>
          <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@soukelkef.tn</li>
        </ul>
      </div>
    </div>

    <div className="border-t border-border/60">
      <div className="container-soft py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
        <p>© 2025 Souk El Kef · Hackathon Innovation Rurale</p>
        <div className="flex gap-4">
          <Link to="/dashboard" className="hover:text-foreground">Espace productrice</Link>
          <Link to="/admin" className="hover:text-foreground">Admin</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
