# --- STAGE 1: deps (cache dependencies) ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- STAGE 2: builder (build the Next app) ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Install TypeScript and build the project
RUN npm install -D typescript @types/node @types/react @types/react-dom
RUN npm run build

# Create public directory if it doesn't exist
RUN mkdir -p public && \
    echo -e "User-agent: *\nDisallow: /admin\nDisallow: /api\nAllow: /" > public/robots.txt

# --- STAGE 3: runner (runtime, minimal image) ---
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

# Copy only the production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Create necessary directories
RUN mkdir -p .next/static

# Copy built assets and public folder from builder
COPY --from=builder /app/.next/standalone/. ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/next-sitemap.js ./

# Generate sitemap if config exists
RUN if [ -f "next-sitemap.js" ]; then \
      npx next-sitemap; \
    fi


# Command to run the app
CMD ["node", "server.js"]