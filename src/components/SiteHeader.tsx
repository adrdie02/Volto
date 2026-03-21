import { useState } from "react";
import { Search, ShoppingBag, Menu, X, User, LogOut } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const SiteHeader = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { openCart, totalItems } = useCart();
  const { user, signOut } = useAuth();

  const navLinks = [
    { label: "Drops", href: "#drops" },
    { label: "Gorras", href: "#drops" },
    { label: "Apparel", href: "#drops" },
    { label: "The Crew", href: "#crew" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-foreground/10 bg-background/80 backdrop-blur-md">
      <nav className="flex h-16 items-center justify-between px-6">
        <a href="/" className="font-display text-2xl uppercase tracking-tighter text-foreground">
          VOLTØ
        </a>

        <div className="hidden space-x-8 md:flex">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="font-mono text-sm font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {searchOpen && (
            <input type="text" placeholder="Buscar..." className="w-32 border-b border-foreground/30 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground md:w-48" autoFocus />
          )}
          <button onClick={() => setSearchOpen(!searchOpen)} className="text-foreground transition-colors hover:text-primary">
            <Search className="h-5 w-5" />
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden font-mono text-xs text-muted-foreground md:inline">{user.email?.split("@")[0]}</span>
              <button onClick={signOut} className="text-foreground transition-colors hover:text-primary" title="Cerrar sesión">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <a href="/auth" className="text-foreground transition-colors hover:text-primary" title="Entrar">
              <User className="h-5 w-5" />
            </a>
          )}

          <button onClick={openCart} className="relative text-foreground">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 bg-primary px-1 font-mono text-[10px] font-bold text-primary-foreground">
              {totalItems}
            </span>
          </button>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground md:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-foreground/10 bg-background px-6 py-6 md:hidden">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block py-3 font-mono text-lg font-bold uppercase tracking-widest text-foreground transition-colors hover:text-primary">
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
