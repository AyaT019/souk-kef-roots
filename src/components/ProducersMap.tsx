import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Star, Navigation, X, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { producers, products, type Producer } from "@/data/mockData";

const filters = [
  { key: "all", label: "Tous", emoji: "🗺️" },
  { key: "Huile d'olive", label: "Huile d'olive", emoji: "🫒" },
  { key: "Miel", label: "Miel", emoji: "🍯" },
  { key: "Artisanat", label: "Artisanat", emoji: "🧺" },
  { key: "Couscous", label: "Couscous", emoji: "🌾" },
];

const ProducersMap = () => {
  const [selected, setSelected] = useState<Producer | null>(producers[0]);
  const [filter, setFilter] = useState<string>("all");
  const [near, setNear] = useState(false);

  const visible = useMemo(() => {
    let list = producers;
    if (filter !== "all") list = list.filter((p) => p.productType === filter);
    if (near) {
      // mock "near me" — pick the 3 closest to a virtual user position (Le Kef center ~ 50,50)
      list = [...list]
        .sort(
          (a, b) =>
            Math.hypot(a.coords.x - 50, a.coords.y - 50) -
            Math.hypot(b.coords.x - 50, b.coords.y - 50),
        )
        .slice(0, 3);
    }
    return list;
  }, [filter, near]);

  const firstProductOf = (producerId: string) =>
    products.find((p) => p.producerId === producerId);

  return (
    <section className="container-soft py-16">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-secondary font-semibold">
          <MapPin className="h-3.5 w-3.5" /> Carte du terroir
        </span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-2 text-balance">
          📍 Découvrez les productrices près de chez vous
        </h2>
        <p className="text-muted-foreground mt-3 leading-relaxed">
          Explorez les femmes productrices de toute la région du Kef et trouvez
          des produits locaux authentiques près de chez vous.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-smooth ${
              filter === f.key
                ? "bg-primary text-primary-foreground border-primary shadow-soft"
                : "bg-card text-foreground border-border/60 hover:border-primary/50"
            }`}
          >
            <span>{f.emoji}</span> {f.label}
          </button>
        ))}
        <button
          onClick={() => setNear((v) => !v)}
          className={`ml-auto inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-smooth ${
            near
              ? "bg-secondary text-secondary-foreground border-secondary shadow-soft"
              : "bg-card text-foreground border-border/60 hover:border-secondary/50"
          }`}
        >
          <Navigation className="h-3.5 w-3.5" />
          Près de moi
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-5">
        {/* MAP */}
        <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-3xl overflow-hidden border border-border/60 shadow-warm bg-gradient-warm">
          {/* Stylized Kef region map */}
          <svg
            viewBox="0 0 100 75"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="land" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--muted))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <pattern id="dots" width="3" height="3" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.3" fill="hsl(var(--primary) / 0.15)" />
              </pattern>
            </defs>
            <rect width="100" height="75" fill="url(#land)" />
            <rect width="100" height="75" fill="url(#dots)" />
            {/* Mountain silhouettes */}
            <path
              d="M0,55 L15,35 L25,45 L40,25 L55,40 L70,30 L85,42 L100,32 L100,75 L0,75 Z"
              fill="hsl(var(--primary) / 0.18)"
            />
            <path
              d="M0,65 L20,50 L35,58 L50,45 L65,55 L80,48 L100,58 L100,75 L0,75 Z"
              fill="hsl(var(--primary) / 0.28)"
            />
            {/* Roads */}
            <path
              d="M5,65 Q35,55 50,55 T95,40"
              stroke="hsl(var(--background))"
              strokeWidth="0.6"
              strokeDasharray="1.5 1.2"
              fill="none"
              opacity="0.7"
            />
            <path
              d="M20,10 Q35,30 50,38 T80,68"
              stroke="hsl(var(--background))"
              strokeWidth="0.5"
              strokeDasharray="1.2 1.2"
              fill="none"
              opacity="0.5"
            />
          </svg>

          {/* Region label */}
          <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-semibold shadow-soft">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            Gouvernorat du Kef · Tunisie
          </div>

          {/* Village labels */}
          {visible.map((p) => (
            <span
              key={`label-${p.id}`}
              style={{
                left: `${p.coords.x}%`,
                top: `${p.coords.y - 8}%`,
              }}
              className="pointer-events-none absolute -translate-x-1/2 text-[10px] md:text-xs font-medium text-foreground/70 whitespace-nowrap"
            >
              {p.village}
            </span>
          ))}

          {/* Pins */}
          {visible.map((p) => {
            const isActive = selected?.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelected(p)}
                style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full group"
                aria-label={`${p.name} – ${p.village}`}
              >
                {/* Pulse */}
                <span
                  className={`absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 h-10 w-10 rounded-full bg-secondary/30 ${
                    isActive ? "animate-ping" : ""
                  }`}
                />
                <div
                  className={`relative flex flex-col items-center transition-smooth ${
                    isActive ? "scale-110" : "group-hover:scale-110"
                  }`}
                >
                  <div
                    className={`relative h-12 w-12 rounded-full border-[3px] overflow-hidden shadow-warm bg-background ${
                      isActive ? "border-secondary" : "border-primary"
                    }`}
                  >
                    <img
                      src={p.photo}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span
                    className={`-mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full text-sm shadow-soft ${
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {p.productEmoji}
                  </span>
                </div>
              </button>
            );
          })}

          {visible.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="rounded-xl bg-background/90 px-4 py-2 text-sm text-muted-foreground shadow-soft">
                Aucune productrice pour ce filtre.
              </p>
            </div>
          )}
        </div>

        {/* Selected card / sidebar */}
        <div className="rounded-3xl border border-border/60 bg-card shadow-soft p-5 flex flex-col">
          {selected ? (
            <>
              <div className="flex items-start gap-3">
                <img
                  src={selected.photo}
                  alt={selected.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-border"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold leading-tight">
                    {selected.name}
                  </h3>
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" /> {selected.village}
                  </p>
                  <p className="inline-flex items-center gap-1 text-xs mt-1">
                    <Star className="h-3 w-3 fill-honey text-honey" />
                    <span className="font-medium">{selected.rating}</span>
                    <span className="text-muted-foreground">
                      · {selected.productsCount} produits
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-muted transition-smooth lg:hidden"
                  aria-label="Fermer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-accent px-3 py-1 text-xs font-medium">
                <span>{selected.productEmoji}</span> {selected.productType}
              </div>

              <p className="text-sm text-muted-foreground mt-3 line-clamp-4 leading-relaxed">
                {selected.story}
              </p>

              <div className="mt-4 flex flex-col gap-2">
                {(() => {
                  const prod = firstProductOf(selected.id);
                  return prod ? (
                    <Button asChild variant="hero" className="w-full">
                      <Link to={`/product/${prod.id}`}>Voir le produit</Link>
                    </Button>
                  ) : null;
                })()}
                <Button asChild variant="soft" className="w-full">
                  <Link to={`/products?producer=${selected.id}`}>
                    Tous ses produits
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-6">
              <MapPin className="h-8 w-8 mb-2" />
              <p className="text-sm">
                Cliquez sur une épingle pour découvrir une productrice.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Producer cards strip */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {visible.map((p) => (
          <button
            key={`mini-${p.id}`}
            onClick={() => setSelected(p)}
            className={`text-left rounded-2xl border bg-card p-3 flex items-center gap-3 transition-smooth shadow-soft hover:shadow-warm hover:-translate-y-0.5 ${
              selected?.id === p.id ? "border-primary" : "border-border/60"
            }`}
          >
            <img
              src={p.photo}
              alt={p.name}
              className="h-12 w-12 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <div className="font-medium text-sm truncate">{p.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {p.productEmoji} {p.village}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Impact message */}
      <div className="mt-8 rounded-2xl bg-gradient-warm border border-border/60 p-5 flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-secondary/15 text-secondary flex items-center justify-center shrink-0">
          <Heart className="h-5 w-5 fill-current" />
        </div>
        <p className="text-sm text-foreground/90 leading-relaxed">
          Cette carte connecte directement les clients aux femmes productrices
          rurales du Kef — pour plus de visibilité, plus de revenus, et un
          terroir qui rayonne.
        </p>
      </div>
    </section>
  );
};

export default ProducersMap;
