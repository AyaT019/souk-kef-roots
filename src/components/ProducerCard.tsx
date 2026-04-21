import { Link } from "react-router-dom";
import { Star, MapPin, Package } from "lucide-react";
import { Producer } from "@/data/mockData";

const ProducerCard = ({ producer }: { producer: Producer }) => (
  <Link
    to={`/products?producer=${producer.id}`}
    className="group block rounded-2xl bg-card border border-border/60 overflow-hidden shadow-soft hover:shadow-warm transition-smooth hover:-translate-y-1"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-muted">
      <img
        src={producer.photo}
        alt={producer.name}
        loading="lazy"
        width={500}
        height={625}
        className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-500"
      />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
        <h3 className="font-display text-xl font-semibold">{producer.name}</h3>
        <p className="text-sm opacity-90 mt-0.5">{producer.shortBio}</p>
      </div>
      <div className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-background/95 backdrop-blur px-2.5 py-1 text-xs font-medium shadow-soft">
        <Star className="h-3 w-3 fill-honey text-honey" />
        {producer.rating}
      </div>
    </div>
    <div className="px-5 py-3 flex items-center justify-between text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{producer.village}</span>
      <span className="inline-flex items-center gap-1.5"><Package className="h-3.5 w-3.5" />{producer.productsCount} produits</span>
    </div>
  </Link>
);

export default ProducerCard;
