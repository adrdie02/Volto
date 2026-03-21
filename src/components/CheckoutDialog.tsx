import { useState } from "react";
import { X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CheckoutDialogProps {
  onClose: () => void;
}

const CheckoutDialog = ({ onClose }: CheckoutDialogProps) => {
  const { items, totalPrice, clearCart, closeCart } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);

    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total: totalPrice,
          shipping_name: form.name,
          shipping_address: form.address,
          shipping_city: form.city,
          shipping_zip: form.zip,
          status: "confirmed",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_name: item.name,
        product_size: item.size,
        quantity: item.quantity,
        unit_price: item.price,
      }));

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      // Send confirmation email via edge function
      try {
        await supabase.functions.invoke("send-order-email", {
          body: {
            orderId: order.id,
            email: user.email,
            name: form.name,
            total: totalPrice,
            items: items.map((i) => ({
              name: i.name,
              size: i.size,
              quantity: i.quantity,
              price: i.price,
            })),
          },
        });
      } catch {
        // Email is non-blocking
        console.warn("Email sending failed, order still created");
      }

      clearCart();
      closeCart();
      onClose();
      toast.success("¡Pedido confirmado! Revisa tu email.");
    } catch (err: any) {
      toast.error(err.message || "Error al crear el pedido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg border border-border bg-background p-8">
        <button onClick={onClose} className="absolute right-4 top-4 text-foreground hover:text-primary">
          <X className="h-5 w-5" />
        </button>

        <h2 className="font-display text-3xl uppercase tracking-tighter text-foreground">Checkout</h2>
        <p className="mt-1 font-mono text-sm text-muted-foreground">Datos de envío</p>

        {/* Order summary */}
        <div className="mt-6 border border-border bg-card p-4">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Resumen</p>
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="mt-2 flex justify-between font-mono text-sm">
              <span className="text-foreground">
                {item.name} ({item.size}) x{item.quantity}
              </span>
              <span className="text-primary">{(item.price * item.quantity).toFixed(2)}€</span>
            </div>
          ))}
          <div className="mt-3 border-t border-border pt-3 flex justify-between">
            <span className="font-display text-sm uppercase text-foreground">Total</span>
            <span className="font-display text-xl text-primary">{totalPrice.toFixed(2)}€</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Nombre completo</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="mt-1 block w-full border-b-2 border-border bg-transparent py-2 font-mono text-foreground outline-none focus:border-primary"
              required
            />
          </div>
          <div>
            <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Dirección</label>
            <input
              type="text"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="mt-1 block w-full border-b-2 border-border bg-transparent py-2 font-mono text-foreground outline-none focus:border-primary"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Ciudad</label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="mt-1 block w-full border-b-2 border-border bg-transparent py-2 font-mono text-foreground outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Código Postal</label>
              <input
                type="text"
                value={form.zip}
                onChange={(e) => setForm({ ...form, zip: e.target.value })}
                className="mt-1 block w-full border-b-2 border-border bg-transparent py-2 font-mono text-foreground outline-none focus:border-primary"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-primary py-4 font-display text-lg uppercase text-primary-foreground transition-shadow hover:shadow-[0_0_30px_hsl(72_100%_53%_/_0.6)] disabled:opacity-50"
          >
            {loading ? "Procesando..." : "Confirmar pedido"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutDialog;
