import { Users, Package, ShoppingBag, Star, Check, X, MapPin } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { producers, products } from "@/data/mockData";
import { toast } from "sonner";

const Admin = () => {
  const stats = [
    { label: "Productrices", value: producers.length, icon: Users, color: "bg-primary/10 text-primary" },
    { label: "Produits", value: products.length, icon: Package, color: "bg-secondary/10 text-secondary" },
    { label: "Commandes (30j)", value: 187, icon: ShoppingBag, color: "bg-honey/10 text-honey" },
    { label: "Note moyenne", value: "4.9", icon: Star, color: "bg-honey/10 text-honey" },
  ];

  const pending = [
    { id: "n1", name: "Confiture de figues", producer: "Khadija Mansouri", village: "Tajerouine", price: 22 },
    { id: "n2", name: "Savon à l'huile d'olive", producer: "Salma Trabelsi", village: "Le Kef", price: 8 },
    { id: "n3", name: "Tissage traditionnel", producer: "Leïla Mhamdi", village: "Nebeur", price: 95 },
  ];

  return (
    <Layout>
      <section className="bg-gradient-warm border-b border-border/60">
        <div className="container-soft py-10">
          <span className="inline-block text-xs uppercase tracking-wider text-secondary font-semibold">Coordination</span>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Tableau de bord administrateur</h1>
          <p className="text-muted-foreground mt-2">Validez les produits, accompagnez les vendeuses, suivez l'impact.</p>
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

        <Tabs defaultValue="pending" className="mt-8">
          <TabsList className="bg-muted/60">
            <TabsTrigger value="pending">À valider <span className="ml-2 rounded-full bg-secondary text-secondary-foreground text-[10px] px-1.5">{pending.length}</span></TabsTrigger>
            <TabsTrigger value="producers">Productrices</TabsTrigger>
            <TabsTrigger value="products">Tous les produits</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-3">
              {pending.map((p) => (
                <div key={p.id} className="flex flex-wrap items-center gap-4 rounded-2xl bg-card border border-border/60 p-4 shadow-soft">
                  <div className="h-12 w-12 rounded-xl bg-gradient-warm flex items-center justify-center text-2xl">📦</div>
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="font-display font-semibold">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.producer} · {p.village}</p>
                  </div>
                  <div className="font-semibold">{p.price} DT</div>
                  <div className="flex gap-2">
                    <Button variant="soft" size="sm" onClick={() => toast.error("Refusé")}><X className="h-4 w-4" /> Refuser</Button>
                    <Button variant="olive" size="sm" onClick={() => toast.success("Produit approuvé")}><Check className="h-4 w-4" /> Approuver</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="producers" className="mt-6">
            <div className="grid md:grid-cols-2 gap-4">
              {producers.map((p) => (
                <div key={p.id} className="flex gap-4 rounded-2xl bg-card border border-border/60 p-4 shadow-soft">
                  <img src={p.photo} alt={p.name} className="h-16 w-16 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="font-display font-semibold">{p.name}</h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" /> {p.village}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-medium">
                        <Star className="h-3 w-3 fill-honey text-honey" /> {p.rating}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs">
                      <span className="text-muted-foreground">{p.productsCount} produits · depuis {p.joinedYear}</span>
                      <Button variant="soft" size="sm">Mettre en avant</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products" className="mt-6">
            <div className="rounded-2xl bg-card border border-border/60 shadow-soft overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/60">
                  <tr className="text-left">
                    <th className="px-4 py-3 font-medium">Produit</th>
                    <th className="px-4 py-3 font-medium hidden sm:table-cell">Catégorie</th>
                    <th className="px-4 py-3 font-medium hidden md:table-cell">Village</th>
                    <th className="px-4 py-3 font-medium">Prix</th>
                    <th className="px-4 py-3 font-medium">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-border/60">
                      <td className="px-4 py-3 flex items-center gap-3">
                        <img src={p.image} alt="" className="h-9 w-9 rounded-lg object-cover" />
                        <span className="font-medium">{p.name}</span>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell text-muted-foreground">{p.category}</td>
                      <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{p.village}</td>
                      <td className="px-4 py-3 font-semibold">{p.price} DT</td>
                      <td className="px-4 py-3">{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
};

export default Admin;
