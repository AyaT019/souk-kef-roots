import oliveOil from "@/assets/product-olive-oil.jpg";
import honey from "@/assets/product-honey.jpg";
import couscous from "@/assets/product-couscous.jpg";
import basket from "@/assets/product-basket.jpg";
import herbs from "@/assets/product-herbs.jpg";
import harissa from "@/assets/product-harissa.jpg";
import producerFatma from "@/assets/producer-fatma.jpg";
import producerAicha from "@/assets/producer-aicha.jpg";
import producerLeila from "@/assets/producer-leila.jpg";

export type Category =
  | "Huile d'olive"
  | "Miel"
  | "Couscous & Plats"
  | "Artisanat"
  | "Herbes & Naturel"
  | "Spécialités";

export const categories: { name: Category; icon: string; color: string }[] = [
  { name: "Huile d'olive", icon: "🫒", color: "olive" },
  { name: "Miel", icon: "🍯", color: "honey" },
  { name: "Couscous & Plats", icon: "🌾", color: "terracotta" },
  { name: "Artisanat", icon: "🧺", color: "terracotta" },
  { name: "Herbes & Naturel", icon: "🌿", color: "olive" },
  { name: "Spécialités", icon: "🌶️", color: "terracotta" },
];

export interface Producer {
  id: string;
  name: string;
  village: string;
  photo: string;
  story: string;
  shortBio: string;
  joinedYear: number;
  productsCount: number;
  rating: number;
  /** Position en pourcentage (0-100) sur la carte stylisée du Kef */
  coords: { x: number; y: number };
  productType: string;
  productEmoji: string;
}

export interface Product {
  id: string;
  name: string;
  nameAr?: string;
  category: Category;
  price: number;
  unit: string;
  image: string;
  producerId: string;
  village: string;
  description: string;
  story: string;
  stock: number;
  handmade: boolean;
  featured?: boolean;
}

export const producers: Producer[] = [
  {
    id: "p1",
    name: "Fatma Ben Salah",
    village: "Dahmani",
    photo: producerFatma,
    shortBio: "Productrice d'huile d'olive depuis 25 ans",
    story:
      "Fatma cultive les oliviers de sa famille depuis trois générations. Avec ses sœurs, elle presse à froid une huile d'olive d'exception dans les collines de Dahmani. Son rêve : faire connaître le goût authentique du Kef au-delà des frontières.",
    joinedYear: 2023,
    productsCount: 4,
    rating: 4.9,
    coords: { x: 58, y: 62 },
    productType: "Huile d'olive",
    productEmoji: "🫒",
  },
  {
    id: "p2",
    name: "Aïcha Trabelsi",
    village: "Tajerouine",
    photo: producerAicha,
    shortBio: "Apicultrice & herboriste de montagne",
    story:
      "Au pied des montagnes, Aïcha élève ses abeilles depuis 18 ans. Son miel de thym et de romarin sauvage est récolté à la main, sans aucun additif. Elle forme aujourd'hui d'autres femmes du village à l'apiculture durable.",
    joinedYear: 2023,
    productsCount: 3,
    rating: 5.0,
    coords: { x: 42, y: 70 },
    productType: "Miel",
    productEmoji: "🍯",
  },
  {
    id: "p3",
    name: "Leïla Mhamdi",
    village: "Nebeur",
    photo: producerLeila,
    shortBio: "Tisseuse & artisane traditionnelle",
    story:
      "Leïla perpétue l'art du tissage berbère transmis par sa grand-mère. Chaque pièce raconte une histoire : motifs des montagnes, couleurs de la terre du Kef. Elle dirige une coopérative de 12 femmes artisanes.",
    joinedYear: 2024,
    productsCount: 5,
    rating: 4.8,
    coords: { x: 38, y: 38 },
    productType: "Artisanat",
    productEmoji: "🧺",
  },
  {
    id: "p4",
    name: "Salma Gharbi",
    village: "Kalaat Senan",
    photo: producerLeila,
    shortBio: "Artisane des fibres naturelles",
    story:
      "À Kalaat Senan, Salma confectionne paniers, tapis et objets décoratifs à partir de fibres locales. Elle anime des ateliers pour transmettre son savoir-faire aux jeunes filles du village.",
    joinedYear: 2024,
    productsCount: 4,
    rating: 4.7,
    coords: { x: 22, y: 50 },
    productType: "Artisanat",
    productEmoji: "🧶",
  },
  {
    id: "p5",
    name: "Mariem Khelifi",
    village: "Dahmani",
    photo: producerFatma,
    shortBio: "Spécialiste du couscous traditionnel",
    story:
      "Mariem roule chaque grain de couscous à la main, selon la recette de sa mère. Sa coopérative regroupe 8 femmes de Dahmani et fournit aujourd'hui plusieurs restaurants de la région.",
    joinedYear: 2024,
    productsCount: 2,
    rating: 4.9,
    coords: { x: 70, y: 48 },
    productType: "Couscous",
    productEmoji: "🌾",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Huile d'olive extra vierge",
    nameAr: "زيت زيتون بكر ممتاز",
    category: "Huile d'olive",
    price: 28,
    unit: "500ml",
    image: oliveOil,
    producerId: "p1",
    village: "Dahmani",
    description:
      "Huile pressée à froid dans les 24h après la récolte. Notes herbacées, finale poivrée. Idéale pour assaisonner ou déguster sur du pain.",
    story:
      "Récoltée à la main par Fatma et ses sœurs en novembre, dans la même oliveraie familiale depuis 1952.",
    stock: 24,
    handmade: true,
    featured: true,
  },
  {
    id: "2",
    name: "Miel de thym sauvage",
    nameAr: "عسل الزعتر البري",
    category: "Miel",
    price: 35,
    unit: "500g",
    image: honey,
    producerId: "p2",
    village: "Sakiet Sidi Youssef",
    description:
      "Miel ambré récolté dans les montagnes du Kef. Goût intense de thym, propriétés naturelles reconnues.",
    story:
      "Aïcha déplace ses ruches au printemps vers les champs de thym sauvage en altitude. Une récolte limitée chaque année.",
    stock: 12,
    handmade: true,
    featured: true,
  },
  {
    id: "3",
    name: "Couscous fin fait main",
    nameAr: "كسكسي يدوي",
    category: "Couscous & Plats",
    price: 14,
    unit: "1 kg",
    image: couscous,
    producerId: "p1",
    village: "Dahmani",
    description:
      "Semoule de blé dur roulée à la main selon la tradition. Cuisson rapide, grain léger et parfumé.",
    story:
      "Préparé dans la cour familiale par les femmes du village, séché au soleil pendant 3 jours.",
    stock: 30,
    handmade: true,
    featured: true,
  },
  {
    id: "4",
    name: "Panier berbère tissé",
    nameAr: "سلة أمازيغية",
    category: "Artisanat",
    price: 65,
    unit: "pièce",
    image: basket,
    producerId: "p3",
    village: "Nebeur",
    description:
      "Panier en fibres naturelles teintes, motifs traditionnels berbères. Pièce unique faite main.",
    story:
      "Tissé pendant 3 jours par Leïla. Les motifs représentent les montagnes du Kef et les étoiles.",
    stock: 6,
    handmade: true,
    featured: true,
  },
  {
    id: "5",
    name: "Bouquet d'herbes séchées",
    nameAr: "أعشاب مجففة",
    category: "Herbes & Naturel",
    price: 12,
    unit: "100g",
    image: herbs,
    producerId: "p2",
    village: "Sakiet Sidi Youssef",
    description:
      "Romarin, thym et menthe sauvages séchés naturellement. Cueillette éthique.",
    story:
      "Cueillis à la main au printemps dans les collines, séchés à l'ombre pendant 2 semaines.",
    stock: 40,
    handmade: true,
  },
  {
    id: "6",
    name: "Harissa traditionnelle",
    nameAr: "هريسة تقليدية",
    category: "Spécialités",
    price: 18,
    unit: "200g",
    image: harissa,
    producerId: "p1",
    village: "Dahmani",
    description:
      "Pâte de piments rouges, ail, cumin et coriandre. Recette familiale du Kef, sans conservateur.",
    story:
      "Les piments sont séchés au soleil puis pilés à la main avec les épices fraîches.",
    stock: 20,
    handmade: true,
  },
  {
    id: "7",
    name: "Huile d'olive bio premium",
    category: "Huile d'olive",
    price: 42,
    unit: "1L",
    image: oliveOil,
    producerId: "p1",
    village: "Dahmani",
    description: "Édition limitée certifiée biologique. Production de 2024.",
    story: "Sélection des meilleurs olives Chetoui de la récolte.",
    stock: 8,
    handmade: true,
  },
  {
    id: "8",
    name: "Tapis kilim mural",
    category: "Artisanat",
    price: 180,
    unit: "pièce",
    image: basket,
    producerId: "p3",
    village: "Nebeur",
    description: "Tapis tissé main, laine teinte naturellement. Format 80x120cm.",
    story: "3 semaines de travail. Motifs uniques inspirés du Jebel Dyr.",
    stock: 3,
    handmade: true,
  },
];

export const villages = [
  "Dahmani",
  "Sakiet Sidi Youssef",
  "Nebeur",
  "Tajerouine",
  "Le Kef",
  "Jérissa",
];

export const impactStats = [
  { label: "Femmes soutenues", value: "120+", icon: "👩" },
  { label: "Villages connectés", value: "8", icon: "🏘️" },
  { label: "Commandes livrées", value: "2 400+", icon: "📦" },
  { label: "Revenu moyen", value: "+45%", icon: "📈" },
];

export const getProducer = (id: string) => producers.find((p) => p.id === id);
export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getProductsByProducer = (id: string) =>
  products.filter((p) => p.producerId === id);
