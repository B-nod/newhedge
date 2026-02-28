# Deploying to Vercel

This project is configured to deploy on [Vercel](https://vercel.com).

## 1. Push your code to Git

Vercel deploys from Git (GitHub, GitLab, or Bitbucket). Push this repo to your remote.

## 2. Import the project on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New** → **Project**.
3. Import your Git repository.
4. Vercel will detect Next.js; leave **Build Command** as `npm run build` and **Output Directory** as default.

## 3. Set environment variables

In your Vercel project: **Settings** → **Environment Variables**. Add at least:

| Variable        | Description                          | Required |
|----------------|--------------------------------------|----------|
| `DB_HOST`      | MySQL host (e.g. from PlanetScale)   | Yes*     |
| `DB_PORT`      | MySQL port (usually `3306`)          | Yes*     |
| `DB_USER`      | Database user                        | Yes*     |
| `DB_PASSWORD`  | Database password                    | Yes*     |
| `DB_NAME`      | Database name                        | Yes*     |
| `JWT_SECRET`   | Long random string for admin auth    | Yes      |
| `ADMIN_USER`   | Admin username                       | Yes      |
| `ADMIN_PASSWORD` | Admin password                    | Yes      |

\* Required if you want live testimonials and admin. Without a database, the app still runs and shows fallback testimonials.

Optional:

- `NEXT_PUBLIC_APP_URL` – Set if you use a custom domain (otherwise Vercel’s `VERCEL_URL` is used).
- `INSTAGRAM_ACCESS_TOKEN`, `INSTAGRAM_USER_ID` – For the Instagram feed.

Use **.env.example** in the repo as a reference.

## 4. Deploy

Click **Deploy**. Vercel will run `npm run build` and deploy. Your site will be available at `https://<project>.vercel.app`.

## 5. Database on Vercel

Vercel does not run MySQL. Use a hosted MySQL service and point the env vars to it, for example:

- [PlanetScale](https://planetscale.com) (MySQL-compatible)
- [Railway](https://railway.app)
- [Aiven](https://aiven.io)
- Any other hosted MySQL with a public or allowed connection

Ensure the host allows connections from Vercel’s IPs (or uses a public endpoint with auth). For serverless, keep connection limits and timeouts in mind; you may need a connection pooler (e.g. PlanetScale’s or a proxy).

## Local production build (no Vercel)

To run a production build locally without the standalone server (e.g. for testing):

```bash
npm run build
npx next start
```

For the original standalone + custom server setup (e.g. Docker), use a separate branch or restore `output: "standalone"` in `next.config.ts` and run `npm run start`.
