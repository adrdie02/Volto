import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface OrderItem {
  name: string;
  size: string;
  quantity: number;
  price: number;
}

interface OrderEmailPayload {
  orderId: string;
  email: string;
  name: string;
  total: number;
  items: OrderItem[];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload: OrderEmailPayload = await req.json();
    const { orderId, email, name, total, items } = payload;

    if (!orderId || !email || !items?.length) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build email HTML
    const itemsHtml = items
      .map(
        (item) =>
          `<tr>
            <td style="padding:8px;border-bottom:1px solid #262626;color:#fff;font-family:monospace">${item.name}</td>
            <td style="padding:8px;border-bottom:1px solid #262626;color:#fff;font-family:monospace">${item.size}</td>
            <td style="padding:8px;border-bottom:1px solid #262626;color:#fff;font-family:monospace">${item.quantity}</td>
            <td style="padding:8px;border-bottom:1px solid #262626;color:#DFFF11;font-family:monospace">${(item.price * item.quantity).toFixed(2)}€</td>
          </tr>`
      )
      .join("");

    const emailHtml = `
      <div style="background:#0A0A0A;padding:40px;max-width:600px;margin:0 auto;font-family:'Arial',sans-serif">
        <h1 style="color:#DFFF11;font-size:28px;margin:0;text-transform:uppercase;letter-spacing:-0.05em">
          PEDIDO CONFIRMADO
        </h1>
        <p style="color:#999;font-family:monospace;font-size:12px;margin-top:8px">
          Pedido #${orderId.slice(0, 8).toUpperCase()}
        </p>
        <p style="color:#fff;font-family:monospace;font-size:14px;margin-top:20px">
          Qué pasa ${name},
        </p>
        <p style="color:#999;font-family:monospace;font-size:13px">
          Tu pedido está en camino. Aquí tienes el resumen:
        </p>
        <table style="width:100%;border-collapse:collapse;margin-top:20px">
          <thead>
            <tr>
              <th style="padding:8px;border-bottom:2px solid #DFFF11;color:#DFFF11;font-family:monospace;text-align:left;font-size:11px">PRODUCTO</th>
              <th style="padding:8px;border-bottom:2px solid #DFFF11;color:#DFFF11;font-family:monospace;text-align:left;font-size:11px">TALLA</th>
              <th style="padding:8px;border-bottom:2px solid #DFFF11;color:#DFFF11;font-family:monospace;text-align:left;font-size:11px">CANT.</th>
              <th style="padding:8px;border-bottom:2px solid #DFFF11;color:#DFFF11;font-family:monospace;text-align:left;font-size:11px">PRECIO</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <div style="margin-top:20px;padding-top:16px;border-top:2px solid #DFFF11">
          <p style="color:#fff;font-family:monospace;font-size:14px;margin:0">
            TOTAL: <span style="color:#DFFF11;font-size:20px;font-weight:bold">${total.toFixed(2)}€</span>
          </p>
        </div>
        <p style="color:#555;font-family:monospace;font-size:11px;margin-top:30px">
          [NOMBRE_DE_LA_MARCA] — Nacidos en el asfalto.
        </p>
      </div>
    `;

    // Log the email (in production, integrate with a real email provider like Resend)
    console.log(`Order confirmation email for ${email}:`, {
      orderId,
      name,
      total,
      itemCount: items.length,
    });

    // For now, store the email content in the order for reference
    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    await adminClient.from("orders").update({ status: "confirmed" }).eq("id", orderId);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Order confirmation processed",
        emailPreview: emailHtml,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error processing order email:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
