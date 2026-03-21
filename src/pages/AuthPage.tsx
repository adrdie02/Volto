import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { display_name: displayName },
            emailRedirectTo: window.location.origin,
          },
        });
        if (error) throw error;
      }
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error de autenticación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md border border-border bg-card p-8">
        <h1 className="font-display text-4xl uppercase tracking-tighter text-foreground">
          {isLogin ? "ENTRAR" : "UNIRSE"}
        </h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          {isLogin ? "Bienvenido de vuelta al crew." : "Únete al movimiento."}
        </p>

        {error && (
          <div className="mt-4 border border-destructive bg-destructive/10 px-4 py-2 font-mono text-sm text-destructive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isLogin && (
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Apodo</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="mt-2 block w-full border-b-2 border-border bg-transparent py-3 font-mono text-foreground outline-none transition-colors focus:border-primary"
                placeholder="¿Cómo te llaman?"
                required
              />
            </div>
          )}
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full border-b-2 border-border bg-transparent py-3 font-mono text-foreground outline-none transition-colors focus:border-primary"
              placeholder="tu@correo.com"
              required
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full border-b-2 border-border bg-transparent py-3 font-mono text-foreground outline-none transition-colors focus:border-primary"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary py-4 font-display text-lg uppercase text-primary-foreground transition-shadow hover:shadow-[0_0_30px_hsl(72_100%_53%_/_0.6)] disabled:opacity-50"
          >
            {loading ? "..." : isLogin ? "Entrar" : "Crear cuenta"}
          </button>
        </form>

        <button
          onClick={() => { setIsLogin(!isLogin); setError(""); }}
          className="mt-6 w-full text-center font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Entra"}
        </button>

        <a
          href="/"
          className="mt-4 block text-center font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Volver a la tienda
        </a>
      </div>
    </div>
  );
};

export default AuthPage;
