import { useState } from "react";
import productCap1 from "@/assets/product-cap-1.jpg";
import productCap2 from "@/assets/product-cap-2.jpg";
import productHoodie from "@/assets/product-hoodie-1.jpg";
import productTee from "@/assets/product-tee-1.jpg";
import productPants from "@/assets/product-pants-1.jpg";
import productCrew from "@/assets/product-crew-1.jpg";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  sizes: string[];
  image: string;
  tag?: "LIMITED" | "SOLD OUT";
}

const products: Product[] = [
  { id: "cap-1", name: "Chaos Snapback", category: "GORRAS", price: 39.99, sizes: ["S", "M", "L"], image: productCap1, tag: "LIMITED" },
  { id: "hoodie-1", name: "Volt Hoodie", category: "APPAREL", price: 89.99, sizes: ["S", "M", "L", "XL"], image: productHoodie },
  { id: "tee-1", name: "Skull Crossbones Tee", category: "CAMISETAS", price: 44.99, sizes: ["S", "M", "L", "XL"], image: productTee, tag: "LIMITED" },
  { id: "cap-2", name: "Acid Flash Cap", category: "GORRAS", price: 34.99, sizes: ["M", "L"], image: productCap2 },
  { id: "pants-1", name: "Shadow Cargo", category: "PANTALONES", price: 79.99, sizes: ["S", "M", "L", "XL"], image: productPants, tag: "SOLD OUT" },
  { id: "crew-1", name: "Street Crewneck", category: "APPAREL", price: 64.99, sizes: ["S", "M", "L", "XL"], image: productCrew },
];

const ProductCard = ({ product }: { product: Product }) => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const isSoldOut = product.tag === "SOLD OUT";

  const handleAdd = () => {
    if (isSoldOut) return;
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      size: selectedSize,
      image: product.image,
    });
  };

  return (
    <div className={`group border border-border bg-card ${isSoldOut ? "opacity-40" : ""}`}>
      <div className="relative aspect-[3/4] overflow-hidden">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        {product.tag === "LIMITED" && (
          <span className="absolute left-0 top-4 bg-primary px-3 py-1 font-mono text-xs font-bold text-primary-foreground">LIMITED EDITION</span>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rotate-12 border-4 border-destructive px-6 py-2 font-display text-4xl text-destructive">SOLD OUT</span>
          </div>
        )}
      </div>
      <div className="border-t border-border p-4">
        <p className="font-mono text-xs text-muted-foreground">{product.category}</p>
        <h3 className={`font-display text-lg uppercase text-foreground ${isSoldOut ? "line-through" : ""}`}>{product.name}</h3>
        <p className="font-mono text-primary">{product.price.toFixed(2)} EUR</p>

        {!isSoldOut && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-2 py-1 font-mono text-[10px] transition-all ${
                    selectedSize === size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border text-muted-foreground hover:border-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              onClick={handleAdd}
              className="ml-auto border border-primary bg-transparent px-4 py-1 font-mono text-xs font-bold uppercase text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              Pillarlo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const FeaturedDrops = () => {
  return (
    <section id="drops" className="border-t border-border bg-background px-0 py-0">
      <div className="border-b border-border px-6 py-8">
        <h2 className="font-display text-5xl uppercase tracking-tighter text-foreground md:text-7xl">Featured Drops</h2>
        <p className="mt-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">Lo nuevo. Lo limitado. Lo que no espera.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedDrops;
