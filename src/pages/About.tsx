import { Heart, Sparkles, MapPin, Users, Leaf, TrendingUp, MessageCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { impactStats, producers } from "@/data/mockData";
import ProducerCard from "@/components/ProducerCard";
import heroImg from "@/assets/hero-women.jpg";

const About = () => (
  <Layout>
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" width={1920} height={800} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      <div className="relative container-soft py-20 md:py-28 text-primary-foreground">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-4 py-1.5 text-xs font-medium uppercase tracking-wider">
          <Heart className="h-3.5 w-3.5 fill-current" /> Notre mission
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-bold mt-4 max-w-3xl text-balance leading-[1.05]">
          Une économie locale, juste, et fière de ses racines.
        </h1>
        <p className="mt-5 text-lg text-white/90 max-w-2xl leading-relaxed">
          Souk El Kef est né d'une conviction : les femmes rurales du Kef ont un savoir-faire
          exceptionnel qui mérite d'être visible, valorisé et rémunéré équitablement.
        </p>
      </div>
    </section>

    <section className="container-soft py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {impactStats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-card border border-border/60 p-6 text-center shadow-soft">
            <div className="text-3xl mb-2">{s.icon}</div>
            <div className="font-display text-3xl font-bold text-primary">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{s.label}</div>
          </div>
        ))}
      </div>
    </section>

    <section className="container-soft py-12 grid md:grid-cols-3 gap-6">
      {[
        { icon: Users, title: "Autonomiser les femmes", text: "Chaque commande renforce l'indépendance économique des productrices et artisanes du Kef." },
        { icon: Leaf, title: "Préserver le terroir", text: "Nos produits respectent la tradition, sans intermédiaires abusifs ni intrants chimiques." },
        { icon: TrendingUp, title: "Dynamiser les villages", text: "Plus de revenus locaux signifient plus d'écoles, de santé et de jeunes qui restent au pays." },
      ].map(({ icon: Icon, title, text }) => (
        <div key={title} className="rounded-2xl bg-card border border-border/60 p-7 shadow-soft hover:shadow-warm transition-smooth">
          <div className="h-12 w-12 rounded-2xl bg-gradient-olive text-primary-foreground flex items-center justify-center shadow-soft">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="font-display text-xl font-semibold mt-4">{title}</h3>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">{text}</p>
        </div>
      ))}
    </section>

    <section className="container-soft py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="inline-block text-xs uppercase tracking-wider text-secondary font-semibold">Visages</span>
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-2">Les femmes derrière les produits</h2>
        <p className="text-muted-foreground mt-3">Des histoires de courage, de savoir-faire et de transmission.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {producers.map((p) => <ProducerCard key={p.id} producer={p} />)}
      </div>
    </section>

    <section className="container-soft py-12">
      <div className="rounded-3xl bg-gradient-terracotta text-secondary-foreground p-8 md:p-14 text-center shadow-warm">
        <Sparkles className="h-10 w-10 mx-auto" />
        <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 max-w-2xl mx-auto text-balance">
          Soutenez les femmes du Kef. Chaque achat compte.
        </h2>
        <p className="mt-4 text-lg text-white/95 max-w-xl mx-auto">
          Que vous soyez à Tunis, Paris ou ailleurs, vous pouvez faire la différence.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-7">
          <Button asChild variant="default" size="lg" className="bg-white text-secondary hover:bg-white/90">
            <Link to="/products">Découvrir les produits</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/15">
            <a href="https://wa.me/21600000000" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-5 w-5" /> Nous contacter
            </a>
          </Button>
        </div>
      </div>
    </section>

    <section className="container-soft py-16">
      <div className="rounded-3xl bg-card border border-border/60 p-8 md:p-12 shadow-soft">
        <div className="flex items-start gap-3">
          <MapPin className="h-6 w-6 text-secondary mt-1" />
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">Points de retrait & livraison locale</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              Nous travaillons avec des points de retrait dans 8 villages du gouvernorat du Kef, et livrons
              partout en Tunisie en 2-5 jours. Paiement à la livraison disponible.
            </p>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default About;
