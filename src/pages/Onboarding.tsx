import { useState } from "react";
import { Link } from "react-router-dom";
import { Camera, Check, ChevronRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { categories, villages } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const steps = ["Vous", "Votre activité", "Votre histoire"];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    village: "",
    category: "",
    story: "",
  });

  const next = () => setStep((s) => Math.min(steps.length - 1, s + 1));
  const prev = () => setStep((s) => Math.max(0, s - 1));
  const submit = () => {
    setDone(true);
    toast.success("Inscription envoyée !", { description: "Notre équipe vous contactera sous 48h." });
  };

  if (done) {
    return (
      <Layout>
        <div className="container-soft py-20 max-w-lg mx-auto text-center">
          <div className="h-20 w-20 mx-auto rounded-full bg-gradient-olive flex items-center justify-center text-primary-foreground shadow-elegant">
            <Check className="h-10 w-10" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-6">Bienvenue, {form.name} !</h1>
          <p className="text-muted-foreground mt-3 leading-relaxed">
            Votre demande d'inscription a bien été reçue. Une coordinatrice de Souk El Kef
            vous appellera sous 48h pour vous aider à publier vos premiers produits.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Button asChild variant="hero" size="lg"><Link to="/dashboard">Voir mon espace</Link></Button>
            <Button asChild variant="outline" size="lg"><Link to="/">Retour à l'accueil</Link></Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="container-soft py-12 max-w-2xl mx-auto">
        <span className="inline-block text-xs uppercase tracking-wider text-secondary font-semibold">Inscription gratuite</span>
        <h1 className="font-display text-3xl md:text-4xl font-bold mt-2">Devenir vendeuse sur Souk El Kef</h1>
        <p className="text-muted-foreground mt-2">3 étapes simples. Aucune compétence technique requise.</p>

        {/* Stepper */}
        <div className="flex items-center gap-2 mt-8">
          {steps.map((s, i) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-semibold transition-smooth",
                i <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("text-xs font-medium hidden sm:block", i === step ? "text-foreground" : "text-muted-foreground")}>{s}</span>
              {i < steps.length - 1 && <div className="flex-1 h-0.5 bg-border" />}
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-card border border-border/60 p-6 md:p-8 shadow-soft animate-fade-in">
          {step === 0 && (
            <div className="space-y-5">
              <div className="flex flex-col items-center gap-3">
                <button className="h-24 w-24 rounded-full bg-muted border-2 border-dashed border-border flex items-center justify-center hover:border-primary transition-smooth">
                  <Camera className="h-7 w-7 text-muted-foreground" />
                </button>
                <span className="text-xs text-muted-foreground">Ajouter une photo (optionnel)</span>
              </div>
              <div>
                <Label htmlFor="name" className="text-base">Votre nom complet</Label>
                <Input id="name" className="mt-2 h-12" placeholder="Ex : Fatma Ben Salah" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone" className="text-base">Téléphone</Label>
                <Input id="phone" type="tel" className="mt-2 h-12" placeholder="Ex : 90 000 000" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <p className="text-xs text-muted-foreground mt-1.5">Nous utilisons WhatsApp pour les commandes.</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <Label className="text-base mb-3 block">Votre village</Label>
                <div className="flex flex-wrap gap-2">
                  {villages.map((v) => (
                    <button
                      key={v}
                      onClick={() => setForm({ ...form, village: v })}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border-2 transition-smooth",
                        form.village === v ? "border-primary bg-primary/10 text-primary" : "border-border hover:border-primary/40"
                      )}
                    >
                      📍 {v}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="text-base mb-3 block">Que produisez-vous ?</Label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setForm({ ...form, category: c.name })}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-xl border-2 text-sm font-medium transition-smooth text-left",
                        form.category === c.name ? "border-primary bg-primary/10" : "border-border hover:border-primary/40"
                      )}
                    >
                      <span className="text-xl">{c.icon}</span>
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <Label htmlFor="story" className="text-base">Racontez votre histoire</Label>
                <p className="text-xs text-muted-foreground mb-2">
                  Quelques phrases sur vous, votre savoir-faire, et ce qui rend vos produits uniques.
                </p>
                <Textarea
                  id="story"
                  rows={6}
                  placeholder="Ex : Je presse l'huile d'olive de la famille depuis 25 ans..."
                  value={form.story}
                  onChange={(e) => setForm({ ...form, story: e.target.value })}
                />
              </div>
              <div className="rounded-xl bg-muted/60 p-4 text-sm text-muted-foreground">
                💡 Une coordinatrice vous aidera à prendre les photos et publier vos premiers produits.
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8 gap-3">
            {step > 0 ? (
              <Button variant="ghost" onClick={prev}>Retour</Button>
            ) : <div />}
            {step < steps.length - 1 ? (
              <Button variant="hero" size="lg" onClick={next}>Continuer <ChevronRight className="h-4 w-4" /></Button>
            ) : (
              <Button variant="hero" size="lg" onClick={submit}>Terminer mon inscription</Button>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Onboarding;
