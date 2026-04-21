import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { categories, products, villages } from "@/data/mockData";
import { cn } from "@/lib/utils";

const Products = () => {
  const [params] = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState<string | null>(params.get("category"));
  const [village, setVillage] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(200);

  useEffect(() => {
    setQ(params.get("q") ?? "");
    setCategory(params.get("category"));
  }, [params]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (q && !`${p.name} ${p.description} ${p.village}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (category && p.category !== category) return false;
      if (village && p.village !== village) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  }, [q, category, village, maxPrice]);

  return (
    <Layout>
      <section className="bg-gradient-warm border-b border-border/60">
        <div className="container-soft py-12 md:py-16">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-balance">Tous les produits</h1>
          <p className="text-muted-foreground mt-2 max-w-xl">
            {filtered.length} produit{filtered.length > 1 ? "s" : ""} sélectionné{filtered.length > 1 ? "s" : ""} avec soin par nos productrices.
          </p>

          <div className="relative mt-6 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher un produit, un village..."
              className="h-12 pl-11 rounded-full bg-background border-border shadow-soft"
            />
          </div>
        </div>
      </section>

      <section className="container-soft py-10 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Filters */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div>
            <h3 className="font-display text-lg font-semibold mb-3 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" /> Filtres
            </h3>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Catégorie</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setCategory(null)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth",
                  !category ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/40"
                )}
              >
                Toutes
              </button>
              {categories.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setCategory(c.name)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth",
                    category === c.name ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border hover:border-primary/40"
                  )}
                >
                  {c.icon} {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">Village</h4>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setVillage(null)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth",
                  !village ? "bg-secondary text-secondary-foreground border-secondary" : "bg-background border-border hover:border-secondary/40"
                )}
              >
                Tous
              </button>
              {villages.map((v) => (
                <button
                  key={v}
                  onClick={() => setVillage(v)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border transition-smooth",
                    village === v ? "bg-secondary text-secondary-foreground border-secondary" : "bg-background border-border hover:border-secondary/40"
                  )}
                >
                  📍 {v}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">
              Prix max : <span className="text-foreground">{maxPrice} DT</span>
            </h4>
            <Slider
              value={[maxPrice]}
              min={10}
              max={200}
              step={5}
              onValueChange={(v) => setMaxPrice(v[0])}
              className="mt-2"
            />
          </div>

          <Button
            variant="soft"
            className="w-full"
            onClick={() => {
              setQ(""); setCategory(null); setVillage(null); setMaxPrice(200);
            }}
          >
            Réinitialiser
          </Button>
        </aside>

        {/* Grid */}
        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <p className="text-muted-foreground">Aucun produit ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 animate-fade-in">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
