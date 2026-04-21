import { Link } from "react-router-dom";
import { Search, Sparkles, Heart, Leaf, MapPin, ArrowRight, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import ProducerCard from "@/components/ProducerCard";
import { products, producers, categories, impactStats } from "@/data/mockData";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-women.jpg";

const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const featured = products.filter((p) => p.featured).slice(0, 4);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/products${search ? `?q=${encodeURIComponent(search)}` : ""}`);
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Femmes productrices du Kef"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>

        <div className="relative container-soft py-20 md:py-32 text-primary-foreground">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full bg-background/20 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" /> Le terroir authentique du Kef
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] text-balance">
              Le savoir-faire des femmes de Kef, à portée de clic.
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed text-balance max-w-xl">
              Découvrez l'huile d'olive, le miel, l'artisanat et les spécialités du
              terroir, directement auprès des femmes productrices et artisanes rurales.
            </p>

            <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2 max-w-lg pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher huile d'olive, miel, panier..."
                  className="h-14 pl-11 rounded-full bg-background text-foreground border-0 shadow-warm"
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="h-14">
                Explorer
              </Button>
            </form>

            <div className="flex flex-wrap gap-6 pt-4 text-sm">
              <div className="flex items-center gap-2"><Heart className="h-4 w-4" /> 120+ femmes soutenues</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> 8 villages</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> 100% authentique</div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-soft py-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold">Explorer par catégorie</h2>
            <p className="text-muted-foreground mt-2">Du verger à la table, tout le terroir tunisien.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Link
              key={c.name}
              to={`/products?category=${encodeURIComponent(c.name)}`}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-warm border border-border/60 p-5 shadow-soft hover:shadow-warm hover:-translate-y-1 transition-smooth"
            >
              <span className="text-3xl group-hover:scale-110 transition-smooth">{c.icon}</span>
              <span className="text-xs md:text-sm font-medium text-center text-foreground">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container-soft py-12">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block text-xs uppercase tracking-wider text-secondary font-semibold">À l'honneur</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Produits du moment</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/products">Tout voir <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* IMPACT STRIP */}
      <section className="py-16 bg-gradient-warm border-y border-border/60">
        <div className="container-soft">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-secondary font-semibold">
              <Heart className="h-3.5 w-3.5 fill-current" /> Notre impact
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-balance">
              Soutenir les femmes du Kef, une commande à la fois.
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {impactStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-background border border-border/60 p-6 text-center shadow-soft">
                <div className="text-3xl mb-2">{s.icon}</div>
                <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCERS */}
      <section className="container-soft py-16">
        <div className="flex items-end justify-between mb-8 gap-4">
          <div>
            <span className="inline-block text-xs uppercase tracking-wider text-secondary font-semibold">Visages du terroir</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-1">Productrices à découvrir</h2>
          </div>
          <Button asChild variant="ghost">
            <Link to="/about">Leur histoire <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {producers.map((p) => <ProducerCard key={p.id} producer={p} />)}
        </div>
      </section>

      {/* CTA STORY */}
      <section className="container-soft py-16">
        <div className="rounded-3xl overflow-hidden bg-gradient-olive text-primary-foreground p-8 md:p-14 grid md:grid-cols-2 gap-8 items-center shadow-elegant">
          <div className="space-y-5">
            <Leaf className="h-10 w-10" />
            <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight text-balance">
              Vous êtes productrice ou artisane ?
            </h2>
            <p className="text-white/90 text-lg leading-relaxed">
              Rejoignez Souk El Kef gratuitement. Publiez vos produits, racontez
              votre histoire, et recevez des commandes — même par WhatsApp.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="hero" size="lg">
                <Link to="/onboarding">Devenir vendeuse</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                <Link to="/about">En savoir plus</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {["📷 Publication facile", "💬 WhatsApp intégré", "🏘️ Livraison locale", "💰 Paiement à la livraison"].map((t) => (
              <div key={t} className="rounded-2xl bg-white/10 backdrop-blur p-5 border border-white/15">
                <div className="text-sm font-medium">{t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
