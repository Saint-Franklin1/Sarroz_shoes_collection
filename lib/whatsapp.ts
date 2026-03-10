export async function sendWhatsAppNotification(message: string) {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const adminPhone = process.env.ADMIN_WHATSAPP_PHONE || "254715118292";
  if (!token || !phoneId) return { skipped: true };

  const response = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: adminPhone,
      type: "text",
      text: { body: message },
    }),
  });

  return response.json();
}
