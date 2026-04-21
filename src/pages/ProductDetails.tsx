import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Sparkles, ShieldCheck, Truck, Minus, Plus, MessageCircle, Star } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { getProduct, getProducer, products } from "@/data/mockData";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProduct(id) : undefined;
  const producer = product ? getProducer(product.producerId) : undefined;
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const navigate = useNavigate();

  if (!product || !producer) {
    return (
      <Layout>
        <div className="container-soft py-20 text-center">
          <p className="text-muted-foreground">Produit introuvable.</p>
          <Button asChild variant="ghost" className="mt-4"><Link to="/products">Retour aux produits</Link></Button>
        </div>
      </Layout>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const onAdd = () => {
    add(product, qty);
    toast.success("Ajouté au panier", { description: `${qty} × ${product.name}` });
  };

  const whatsappLink = `https://wa.me/21600000000?text=${encodeURIComponent(
    `Bonjour ${producer.name}, je suis intéressé(e) par "${product.name}" (${product.price} DT / ${product.unit}). Est-il disponible ?`
  )}`;

  return (
    <Layout>
      <div className="container-soft py-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4" /> Retour
        </Button>
      </div>

      <section className="container-soft pb-12 grid md:grid-cols-2 gap-8 lg:gap-14">
        <div className="rounded-3xl overflow-hidden bg-muted aspect-square shadow-card">
          <img src={product.image} alt={product.name} width={800} height={800} className="h-full w-full object-cover" />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
                {product.category}
              </span>
              {product.handmade && (
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 text-secondary px-3 py-1 text-xs font-medium">
                  <Sparkles className="h-3 w-3" /> Fait main · 100% authentique
                </span>
              )}
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold leading-tight">{product.name}</h1>
            {product.nameAr && (
              <p className="font-display text-xl text-muted-foreground" dir="rtl">{product.nameAr}</p>
            )}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> {product.village}, Le Kef
            </div>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-foreground">{product.price} DT</span>
            <span className="text-sm text-muted-foreground">/ {product.unit}</span>
          </div>

          <p className="text-base text-foreground/80 leading-relaxed">{product.description}</p>

          {/* Producer story card */}
          <Link
            to={`/products?producer=${producer.id}`}
            className="flex items-center gap-4 rounded-2xl bg-gradient-warm border border-border/60 p-4 shadow-soft hover:shadow-warm transition-smooth"
          >
            <img src={producer.photo} alt={producer.name} width={64} height={64} className="h-16 w-16 rounded-full object-cover" />
            <div className="flex-1">
              <div className="text-xs uppercase tracking-wider text-secondary font-semibold">Productrice</div>
              <div className="font-display text-base font-semibold">{producer.name}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Star className="h-3 w-3 fill-honey text-honey" /> {producer.rating} · {producer.shortBio}
              </div>
            </div>
          </Link>

          {/* Quantity + actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center rounded-full border border-border bg-background">
              <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-medium">{qty}</span>
              <Button variant="ghost" size="icon" onClick={() => setQty((q) => Math.min(product.stock, q + 1))}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">{product.stock} en stock</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="hero" size="lg" className="flex-1" onClick={onAdd}>
              Ajouter au panier · {(product.price * qty).toFixed(0)} DT
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> Commander via WhatsApp
              </a>
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { i: ShieldCheck, t: "Authentique" },
              { i: Truck, t: "Livraison locale" },
              { i: Sparkles, t: "Fait main" },
            ].map(({ i: Icon, t }) => (
              <div key={t} className="flex flex-col items-center gap-1 rounded-xl bg-muted/60 py-3 text-center">
                <Icon className="h-4 w-4 text-primary" />
                <span className="text-[11px] text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story behind */}
      <section className="container-soft py-12">
        <div className="rounded-3xl bg-card border border-border/60 p-8 md:p-12 shadow-soft">
          <span className="inline-block text-xs uppercase tracking-wider text-secondary font-semibold">L'histoire derrière le produit</span>
          <h2 className="font-display text-2xl md:text-3xl font-bold mt-2 mb-4">Du verger à votre table</h2>
          <p className="text-foreground/80 leading-relaxed text-lg">{product.story}</p>
          <p className="text-foreground/80 leading-relaxed mt-4">{producer.story}</p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container-soft py-8 pb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Vous aimerez aussi</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </Layout>
  );
};

export default ProductDetails;
