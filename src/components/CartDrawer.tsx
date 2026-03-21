import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import CheckoutDialog from "./CheckoutDialog";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const [showCheckout, setShowCheckout] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" onClick={closeCart} />

      {/* Drawer */}
      <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-display text-2xl uppercase tracking-tighter text-foreground">
            Tu Carrito ({totalItems})
          </h2>
          <button onClick={closeCart} className="text-foreground transition-colors hover:text-primary">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center">
              <p className="font-mono text-sm text-muted-foreground">Carrito vacío.</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">Pilla algo, no seas tímido.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-4 border border-border bg-card p-3">
                  <img src={item.image} alt={item.name} className="h-20 w-20 object-cover" />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-display text-sm uppercase text-foreground">{item.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">
                        {item.category} · Talla: {item.size}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="border border-border p-1 text-foreground transition-colors hover:border-primary"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="font-mono text-sm text-foreground">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="border border-border p-1 text-foreground transition-colors hover:border-primary"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-primary">
                          {(item.price * item.quantity).toFixed(2)}€
                        </span>
                        <button
                          onClick={() => removeItem(item.id, item.size)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm uppercase text-muted-foreground">Total</span>
              <span className="font-display text-2xl text-primary">{totalPrice.toFixed(2)}€</span>
            </div>
            {user ? (
              <button
                onClick={() => setShowCheckout(true)}
                className="mt-4 w-full bg-primary py-4 font-display text-lg uppercase text-primary-foreground transition-shadow hover:shadow-[0_0_30px_hsl(72_100%_53%_/_0.6)]"
              >
                Hacer pedido
              </button>
            ) : (
              <a
                href="/auth"
                className="mt-4 block w-full bg-primary py-4 text-center font-display text-lg uppercase text-primary-foreground transition-shadow hover:shadow-[0_0_30px_hsl(72_100%_53%_/_0.6)]"
              >
                Entra para comprar
              </a>
            )}
          </div>
        )}
      </div>

      {showCheckout && <CheckoutDialog onClose={() => setShowCheckout(false)} />}
    </>
  );
};

export default CartDrawer;
