# Custom Gift Hub – Vendure Blueprint

## Overview
This repository contains a production‑ready Vendure configuration for **Custom Gift Hub ~ By Chaturmal & Co.**, configured for a **$0/month** infrastructure stack:

- **Database:** Supabase Free Tier (PostgreSQL)
- **Media storage:** Cloudinary Free Tier
- **Hosting:** Hostinger Business Web App (Node.js) via Git push‑to‑deploy

## Project Structure
```
custom-gift-hub/
│
├─ .env                     # Environment variables (fill in real values)
├─ package.json             # Dependencies and scripts
├─ tsconfig.json            # TypeScript config
│
├─ src/
│   ├─ product-types.ts          # ProductType enum (15 categories)
│   ├─ entities/
│   │   └─ gift-product.entity.ts # Core product entity with jsonb customFields
│   ├─ plugins/
│   │   └─ cloudinary-asset-strategy.ts  # Uploads straight to Cloudinary
│   └─ vendure-config.ts        # Vendure core config wiring everything together
│
├─ migrations/               # (optional) TypeORM migration files
└─ README.md                # This file
```

## Getting Started Locally

1. **Install dependencies**

   ```bash
   cd custom-gift-hub
   npm install @vendure/core @vendure/admin-ui-plugin @cloudinary/url-gen cloudinary typeorm pg
   ```

2. **Set up the `.env`** (copy the provided `.env` and replace placeholders):
   - `DATABASE_URL` – Supabase PostgreSQL connection string.
   - `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` – from your Cloudinary account.
   - `CORS_ORIGINS` – your Hostinger domain.
   - `ADMIN_EMAIL` / `ADMIN_PASSWORD` – for the Vendure admin UI.

3. **Run database migrations** (creates the `gift_product` table and any future tables):

   ```bash
   npx typeorm migration:run
   ```

   *If you haven’t generated migrations yet, you can create an initial one:*

   ```bash
   npx typeorm migration:generate -n InitialSchema
   ```

4. **Start the Vendure server** (development mode with hot‑reload):

   ```bash
   npm run start:dev
   ```

   The admin UI will be available at `http://localhost:3000/admin`. Log in with the credentials from `.env`.

5. **Verify Cloudinary integration**
   - In the admin, upload a product image.
   - Check your Cloudinary dashboard – the asset should appear in the `custom-gift-hubiquit` folder, proving that uploads bypass the local filesystem.

## Deploying to Hostinger

1. **Push to GitHub** (or any Git host):

   ```bash
   git init
   git add .
   git commit -m "initial Vendure + custom entities + Cloudinary plugin"
   git remote add origin git@github.com:YOUR_USER/custom-gift-hub.git
   git branch -M main
   git push -u origin main
   ```

2. **Create a Node.js app on Hostinger**
   - Go to **Websites → Manage → Node.js** in the Hostinger dashboard.
   - Click **Create new app** → **Connect to GitHub repository** and select your repo.
   - Set the **Build Command** to `npm run build` (or `npm run compile` if you have that script).
   - Set the **Start Command** to `node dist/main.js` (adjust if your entry point differs).
   - In the **Environment variables** section, add all keys from `.env` (`DATABASE_URL`, `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET`, `PORT`, `CORS_ORIGINS`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`).

3. **Deploy** – Hostinger will `npm install`, run the build script, and start the app.  
   Visit `https://your-hostinger-app.hostinger.site` and add `/admin` to reach the Vendure admin UI.

## Extending the Catalog

- **Add a new product type**: extend the `ProductType` enum in `src/product-types.ts` and add a new entry to the `productTypes` array in `vendure-config.ts`.
- **Category‑specific custom fields**: add new keys to the `customFields` JSON column or sa, or create dedicated interfaces (e.g., `HumanMiniatureCustomFields`) and use the `setCustomField` helper method in `GiftProduct`.

## License
MIT – feel free to adapt for your own gifting marketplace.