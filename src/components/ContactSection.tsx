import { useState } from "react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder submit
    alert("Mensaje enviado. Te respondemos pronto.");
  };

  return (
    <section className="border-t border-border bg-background px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          // TALK TO US
        </p>
        <h2 className="mt-4 font-display text-5xl uppercase tracking-tighter text-foreground md:text-7xl">
          ¿QUÉ PASA?
        </h2>
        <p className="mt-4 font-mono text-sm text-muted-foreground">
          Suelta lo que tengas. Sin filtros.
        </p>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Apodo / Nombre</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-2 block w-full border-b-2 border-border bg-transparent py-3 font-mono text-foreground outline-none transition-colors focus:border-primary"
              placeholder="¿Cómo te llaman?"
              required
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-2 block w-full border-b-2 border-border bg-transparent py-3 font-mono text-foreground outline-none transition-colors focus:border-primary"
              placeholder="tu@correo.com"
              required
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">¿Qué pasa?</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="mt-2 block w-full resize-none border-b-2 border-border bg-transparent py-3 font-mono text-foreground outline-none transition-colors focus:border-primary"
              rows={4}
              placeholder="Dinos lo que sea..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary py-4 font-display text-lg uppercase text-primary-foreground transition-shadow hover:shadow-[0_0_30px_hsl(72_100%_53%_/_0.6)]"
          >
            Enviar
          </button>
        </form>

        {/* Social Links */}
        <div className="mt-16 flex items-center justify-center gap-10">
          {[
            { name: "Instagram", url: "#" },
            { name: "TikTok", url: "#" },
            { name: "Discord", url: "#" },
          ].map((s) => (
            <a
              key={s.name}
              href={s.url}
              className="font-display text-2xl uppercase text-foreground transition-colors hover:text-primary md:text-3xl"
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
