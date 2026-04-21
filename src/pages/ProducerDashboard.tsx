import { useState } from "react";
import { Plus, Package, ShoppingBag, TrendingUp, Edit, Camera, Star, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { products, producers, categories } from "@/data/mockData";
import { toast } from "sonner";

const ProducerDashboard = () => {
  const me = producers[0]; // Fatma
  const myProducts = products.filter((p) => p.producerId === me.id);
  const [open, setOpen] = useState(false);

  const stats = [
    { label: "Produits actifs", value: myProducts.length, icon: Package, color: "bg-primary/10 text-primary" },
    { label: "Commandes (30j)", value: 24, icon: ShoppingBag, color: "bg-secondary/10 text-secondary" },
    { label: "Revenus (30j)", value: "640 DT", icon: TrendingUp, color: "bg-honey/10 text-honey" },
    { label: "Note moyenne", value: me.rating, icon: Star, color: "bg-honey/10 text-honey" },
  ];

  const orders = [
    { id: "#1042", product: "Huile d'olive 500ml", customer: "Sami K.", qty: 2, total: 56, status: "En préparation" },
    { id: "#1041", product: "Couscous fin 1kg", customer: "Lina B.", qty: 1, total: 14, status: "Livrée" },
    { id: "#1040", product: "Harissa 200g", customer: "Mohamed R.", qty: 3, total: 54, status: "Livrée" },
    { id: "#1039", product: "Huile d'olive 1L", customer: "Sarra M.", qty: 1, total: 42, status: "À expédier" },
  ];

  return (
    <Layout>
      <section className="bg-gradient-warm border-b border-border/60">
        <div className="container-soft py-10">
          <div className="flex flex-wrap items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <img src={me.photo} alt={me.name} className="h-16 w-16 rounded-full object-cover shadow-soft" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Bienvenue</p>
                <h1 className="font-display text-2xl md:text-3xl font-bold">{me.name}</h1>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><MapPin className="h-3 w-3" /> {me.village}</p>
              </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="hero" size="lg"><Plus className="h-4 w-4" /> Ajouter un produit</Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl">Nouveau produit</DialogTitle>
                </DialogHeader>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    toast.success("Produit ajouté", { description: "Il sera visible après validation." });
                    setOpen(false);
                  }}
                >
                  <button type="button" className="w-full h-32 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary hover:text-primary transition-smooth">
                    <Camera className="h-6 w-6" />
                    <span className="text-sm">Ajouter des photos</span>
                  </button>
                  <div>
                    <Label>Nom du produit</Label>
                    <Input className="mt-1" placeholder="Ex : Miel de thym 500g" required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Prix (DT)</Label>
                      <Input className="mt-1" type="number" placeholder="35" required />
                    </div>
                    <div>
                      <Label>Quantité</Label>
                      <Input className="mt-1" type="number" placeholder="20" required />
                    </div>
                  </div>
                  <div>
                    <Label>Catégorie</Label>
                    <select className="mt-1 w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                      {categories.map((c) => <option key={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea className="mt-1" rows={3} placeholder="Décrivez votre produit..." />
                  </div>
                  <Button type="submit" variant="hero" size="lg" className="w-full">Publier</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      <section className="container-soft py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-card border border-border/60 p-5 shadow-soft">
              <div className={`h-10 w-10 rounded-xl ${s.color} flex items-center justify-center`}>
                <s.icon className="h-5 w-5" />
              </div>
              <div className="font-display text-2xl font-bold mt-3">{s.value}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <Tabs defaultValue="products" className="mt-8">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="products">Mes produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="profile">Mon profil</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myProducts.map((p) => (
                <div key={p.id} className="flex gap-4 rounded-2xl bg-card border border-border/60 p-4 shadow-soft">
                  <img src={p.image} alt={p.name} className="h-20 w-20 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <h3 className="font-display font-semibold leading-tight">{p.name}</h3>
                      <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.category}</p>
                    <div className="flex items-center justify-between mt-2 text-sm">
                      <span className="font-semibold">{p.price} DT</span>
                      <span className="text-xs text-muted-foreground">Stock : {p.stock}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <div className="rounded-2xl bg-card border border-border/60 shadow-soft overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/60">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium">N°</th>
                    <th className="px-4 py-3 font-medium">Produit</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Cliente</th>
                    <th className="px-4 py-3 font-medium">Total</th>
                    <th className="px-4 py-3 font-medium">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} className="border-t border-border/60">
                      <td className="px-4 py-3 font-mono text-xs">{o.id}</td>
                      <td className="px-4 py-3">{o.product} <span className="text-muted-foreground">×{o.qty}</span></td>
                      <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{o.customer}</td>
                      <td className="px-4 py-3 font-semibold">{o.total} DT</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex rounded-full bg-primary/10 text-primary px-2.5 py-0.5 text-xs font-medium">
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <div className="rounded-2xl bg-card border border-border/60 p-6 shadow-soft max-w-2xl space-y-4">
              <div className="flex items-center gap-4">
                <img src={me.photo} alt={me.name} className="h-20 w-20 rounded-full object-cover" />
                <Button variant="soft" size="sm"><Camera className="h-4 w-4" /> Changer la photo</Button>
              </div>
              <div>
                <Label>Nom</Label>
                <Input defaultValue={me.name} className="mt-1" />
              </div>
              <div>
                <Label>Village</Label>
                <Input defaultValue={me.village} className="mt-1" />
              </div>
              <div>
                <Label>Mon histoire</Label>
                <Textarea defaultValue={me.story} rows={5} className="mt-1" />
              </div>
              <Button variant="hero" onClick={() => toast.success("Profil enregistré")}>Enregistrer</Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default ProducerDashboard;
