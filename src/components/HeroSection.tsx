import heroImg from "@/assets/hero-fisheye.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-svh w-full overflow-hidden bg-background">
      <img
        src={heroImg}
        alt="Skater en parking subterráneo"
        className="h-full w-full object-cover opacity-70 grayscale contrast-125 saturate-150 transition-all duration-700 hover:grayscale-0"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <h1 className="text-center text-[12vw] font-display leading-[0.9] uppercase tracking-tighter text-foreground md:text-[10vw]">
          VOLTØ
        </h1>
        <p className="mt-4 font-mono text-sm uppercase tracking-widest text-muted-foreground">
          Nacidos en el cemento. Criados por el ruido.
        </p>
        <a
          href="#drops"
          className="mt-8 bg-primary px-12 py-4 font-display text-xl uppercase text-primary-foreground transition-shadow duration-300 hover:shadow-[0_0_30px_hsl(72_100%_53%_/_0.6)]"
          style={{ borderRadius: "2px" }}
        >
          Shop the Drop
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
