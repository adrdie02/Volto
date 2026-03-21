import { useState } from "react";

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Estás dentro. Prepárate.");
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background">
      {/* Newsletter */}
      <div className="border-b border-border px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h3 className="font-display text-3xl uppercase tracking-tighter text-foreground md:text-5xl">
            NO TE PIERDAS EL PRÓXIMO DROP
          </h3>
          <p className="mt-3 font-mono text-sm text-muted-foreground">
            Entra en la lista o quédate fuera. Sin spam, solo fuego.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="mt-8 flex gap-0">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="flex-1 border-2 border-foreground bg-transparent px-4 py-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
              required
            />
            <button
              type="submit"
              className="bg-primary px-8 py-3 font-display text-sm uppercase text-primary-foreground transition-shadow hover:shadow-[0_0_20px_hsl(72_100%_53%_/_0.6)]"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
        <div className="font-display text-lg uppercase tracking-tighter text-foreground">
          VOLTØ
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          © 2026 VOLTØ. Todos los derechos reservados. Nacidos en el asfalto.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
