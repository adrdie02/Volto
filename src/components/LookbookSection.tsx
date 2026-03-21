import lb1 from "@/assets/lookbook-1.jpg";
import lb2 from "@/assets/lookbook-2.jpg";
import lb3 from "@/assets/lookbook-3.jpg";
import lb4 from "@/assets/lookbook-4.jpg";
import lb5 from "@/assets/lookbook-5.jpg";
import lb6 from "@/assets/lookbook-6.jpg";

const images = [lb1, lb2, lb3, lb4, lb5, lb6];

const LookbookSection = () => {
  return (
    <section className="border-t border-border bg-background">
      <div className="border-b border-border px-6 py-8">
        <h2 className="font-display text-5xl uppercase tracking-tighter text-foreground md:text-7xl">
          Lookbook
        </h2>
        <p className="mt-2 font-mono text-sm uppercase tracking-widest text-muted-foreground">
          En la calle. En el park. En acción.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3">
        {images.map((img, i) => (
          <div key={i} className="group relative aspect-square overflow-hidden border border-border">
            <img
              src={img}
              alt={`Lookbook ${i + 1}`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-background/0 transition-colors duration-300 group-hover:bg-background/40" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LookbookSection;
