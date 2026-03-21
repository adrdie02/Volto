const IdentitySection = () => {
  return (
    <section id="crew" className="border-t border-border bg-background px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          // THE STREETS
        </p>
        <h2 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tighter text-foreground md:text-8xl">
          DUEÑOS<br />DEL CAOS
        </h2>
        <div className="mx-auto mt-10 max-w-2xl border-l-4 border-primary pl-6 text-left">
          <p className="font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
            [MANIFIESTO_URBANO]
          </p>
          <p className="mt-6 font-mono text-sm leading-relaxed text-muted-foreground md:text-base">
            No pedimos permiso. No pedimos perdón. Nacidos en el cemento, criados
            por el ruido. <span className="text-primary">VOLTØ</span> no
            es ropa, es el uniforme de los que no se quedan quietos. Si no patinas,
            no lo entiendes.
          </p>
        </div>
        <a
          href="#"
          className="mt-10 inline-block border-2 border-foreground px-10 py-4 font-display text-sm uppercase text-foreground transition-all hover:border-primary hover:text-primary"
        >
          Únete al crew →
        </a>
      </div>
    </section>
  );
};

export default IdentitySection;
