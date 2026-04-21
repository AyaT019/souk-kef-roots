import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, MessageCircle, Truck, MapPin, Wallet } from "lucide-react";
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const Cart = () => {
  const { items, setQty, remove, total, clear } = useCart();
  const [delivery, setDelivery] = useState<"delivery" | "pickup">("delivery");
  const [payment, setPayment] = useState<"cod" | "whatsapp">("cod");
  const [info, setInfo] = useState({ name: "", phone: "", address: "" });

  const shipping = delivery === "delivery" ? 7 : 0;
  const grand = total + shipping;

  const onConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!info.name || !info.phone) {
      toast.error("Merci de remplir vos informations");
      return;
    }
    if (payment === "whatsapp") {
      const msg = `Bonjour ! Nouvelle commande Souk El Kef :\n\n${items
        .map((i) => `• ${i.quantity}× ${i.product.name} — ${i.product.price * i.quantity} DT`)
        .join("\n")}\n\nLivraison : ${delivery === "delivery" ? "Livraison" : "Retrait"}\nTotal : ${grand} DT\n\nNom : ${info.name}\nTéléphone : ${info.phone}${info.address ? `\nAdresse : ${info.address}` : ""}`;
      window.open(`https://wa.me/21600000000?text=${encodeURIComponent(msg)}`, "_blank");
      return;
    }
    toast.success("Commande confirmée !", { description: "Vous serez contactée pour la livraison." });
    clear();
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container-soft py-20 text-center max-w-md mx-auto">
          <div className="text-6xl mb-4">🧺</div>
          <h1 className="font-display text-3xl font-bold">Votre panier est vide</h1>
          <p className="text-muted-foreground mt-2">Découvrez les produits authentiques de nos productrices.</p>
          <Button asChild variant="hero" size="lg" className="mt-6">
            <Link to="/products">Explorer les produits</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-soft py-10">
        <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Votre panier</h1>

        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          {/* Items */}
          <div className="space-y-3">
            {items.map((i) => (
              <div key={i.product.id} className="flex gap-4 rounded-2xl bg-card border border-border/60 p-4 shadow-soft">
                <img src={i.product.image} alt={i.product.name} width={96} height={96} className="h-24 w-24 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/product/${i.product.id}`} className="font-display font-semibold leading-tight hover:text-primary">
                      {i.product.name}
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => remove(i.product.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{i.product.village} · {i.product.unit}</div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="inline-flex items-center rounded-full border border-border">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQty(i.product.id, i.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center text-sm font-medium">{i.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setQty(i.product.id, i.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="font-display font-bold">{i.product.price * i.quantity} DT</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary + checkout */}
          <form onSubmit={onConfirm} className="space-y-4 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft space-y-4">
              <h3 className="font-display text-lg font-semibold">Mode de livraison</h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: "delivery", icon: Truck, label: "Livraison", price: "7 DT" },
                  { key: "pickup", icon: MapPin, label: "Retrait", price: "Gratuit" },
                ].map((o) => (
                  <button
                    type="button"
                    key={o.key}
                    onClick={() => setDelivery(o.key as "delivery" | "pickup")}
                    className={cn(
                      "rounded-xl border-2 p-3 text-left transition-smooth",
                      delivery === o.key ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    )}
                  >
                    <o.icon className="h-4 w-4 mb-1 text-primary" />
                    <div className="text-sm font-medium">{o.label}</div>
                    <div className="text-xs text-muted-foreground">{o.price}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft space-y-3">
              <h3 className="font-display text-lg font-semibold">Vos informations</h3>
              <div>
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" value={info.phone} onChange={(e) => setInfo({ ...info, phone: e.target.value })} className="mt-1" required type="tel" />
              </div>
              {delivery === "delivery" && (
                <div>
                  <Label htmlFor="address">Adresse</Label>
                  <Input id="address" value={info.address} onChange={(e) => setInfo({ ...info, address: e.target.value })} className="mt-1" />
                </div>
              )}
            </div>

            <div className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft space-y-3">
              <h3 className="font-display text-lg font-semibold">Paiement</h3>
              <div className="space-y-2">
                {[
                  { key: "cod", icon: Wallet, label: "À la livraison", desc: "Espèces" },
                  { key: "whatsapp", icon: MessageCircle, label: "Confirmer via WhatsApp", desc: "Échange direct avec la vendeuse" },
                ].map((o) => (
                  <button
                    type="button"
                    key={o.key}
                    onClick={() => setPayment(o.key as "cod" | "whatsapp")}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-smooth",
                      payment === o.key ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
                    )}
                  >
                    <o.icon className="h-5 w-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">{o.label}</div>
                      <div className="text-xs text-muted-foreground">{o.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-warm border border-border/60 p-5 space-y-2">
              <div className="flex justify-between text-sm"><span>Sous-total</span><span>{total} DT</span></div>
              <div className="flex justify-between text-sm"><span>Livraison</span><span>{shipping === 0 ? "Gratuit" : `${shipping} DT`}</span></div>
              <div className="border-t border-border my-2" />
              <div className="flex justify-between font-display text-lg font-bold"><span>Total</span><span>{grand} DT</span></div>
              <Button
                type="submit"
                variant={payment === "whatsapp" ? "whatsapp" : "hero"}
                size="lg"
                className="w-full mt-3"
              >
                {payment === "whatsapp" ? <><MessageCircle className="h-5 w-5" />Confirmer sur WhatsApp</> : "Confirmer la commande"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Cart;
