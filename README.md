# SARROZ Shoes Collection Ecommerce

Full-stack single-vendor ecommerce built with Next.js 14 + TypeScript + Tailwind + Prisma/PostgreSQL.

## Features
- Public storefront with product browsing, search, product detail pages, reviews, cart, and guest checkout.
- Admin-only dashboard (NextAuth credentials) for products, orders, categories, analytics, discounts, and reviews.
- Delivery fee engine with configurable zones in DB.
- Payment abstraction for M-Pesa, PayHero, PayPal, and Pay on Delivery.
- Notifications via Resend (email) and WhatsApp Cloud API.

## Setup
1. Install dependencies: `npm install`
2. Configure env: `cp .env.example .env`
3. Prisma:
   - `npx prisma migrate dev --name init`
   - `npm run prisma:seed`
4. Run app: `npm run dev`

## Seeded Admin
- Email: `roserocky92@gmail.com`
- Phone: `0715118292`
- Temporary password: `Rose92@.29`
- `mustChangePassword` is enabled on seed.

## New Improvements Added
- Cloudinary signed upload signature endpoint + media controls (attach/remove images with max 5 per product).
- Stock synchronization during checkout with out-of-stock protection and auto stock status updates.
- Enhanced analytics dashboard with date filters, AOV, payment/status mix, top products, and CSV export.
- Checkout anti-spam protections (honeypot + IP rate limiting) and automatic address distance estimation.
