import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendAdminOrderEmail(subject: string, html: string) {
  if (!process.env.RESEND_API_KEY || !process.env.ADMIN_EMAIL) return { skipped: true };
  return resend.emails.send({
    from: process.env.FROM_EMAIL || "orders@sarroz.co.ke",
    to: process.env.ADMIN_EMAIL,
    subject,
    html,
  });
}
