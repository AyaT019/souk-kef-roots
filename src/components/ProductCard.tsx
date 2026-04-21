import { Link } from "react-router-dom";
import { MapPin, Sparkles } from "lucide-react";
import { Product, getProducer } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

const ProductCard = ({ product }: { product: Product }) => {
  const producer = getProducer(product.producerId);
  const { add } = useCart();

  return (
    <article className="group rounded-2xl bg-card border border-border/60 overflow-hidden shadow-soft hover:shadow-card transition-smooth hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={400}
          height={400}
          className="h-full w-full object-cover group-hover:scale-105 transition-smooth duration-500"
        />
        {product.handmade && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-background/95 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-secondary shadow-soft">
            <Sparkles className="h-3 w-3" /> Fait main
          </span>
        )}
        <span className="absolute top-3 right-3 rounded-full bg-primary/90 backdrop-blur text-primary-foreground px-2.5 py-1 text-[11px] font-medium">
          {product.category}
        </span>
      </Link>

      <div className="p-4 space-y-2">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-display text-base font-semibold leading-tight line-clamp-1 group-hover:text-primary transition-smooth">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{producer?.name} · {product.village}</span>
        </div>
        <div className="flex items-end justify-between pt-2">
          <div>
            <div className="font-display text-lg font-bold text-foreground">
              {product.price} <span className="text-xs font-sans font-normal text-muted-foreground">DT</span>
            </div>
            <div className="text-[11px] text-muted-foreground">/ {product.unit}</div>
          </div>
          <Button
            size="sm"
            variant="hero"
            onClick={(e) => {
              e.preventDefault();
              add(product);
              toast.success("Ajouté au panier", { description: product.name });
            }}
          >
            Ajouter
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
