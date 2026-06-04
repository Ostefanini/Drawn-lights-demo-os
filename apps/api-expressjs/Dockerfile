FROM dhi.io/node:24-alpine3.23-dev AS builder
ENV CI=true
WORKDIR /workspace

# Enable pnpm
RUN corepack enable

# Copy config files
COPY .npmrc ./
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package.json files for all packages to leverage cache
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/prisma/package.json ./packages/prisma/package.json
COPY apps/api-expressjs/package.json ./apps/api-expressjs/package.json

# Install dependencies (frozen lockfile, ignore scripts until sources are copied)
RUN pnpm install --frozen-lockfile --ignore-scripts

# Copy source code
COPY packages/shared ./packages/shared
COPY packages/prisma ./packages/prisma
COPY apps/api-expressjs ./apps/api-expressjs

# Build shared package
RUN pnpm -C packages/shared build

# Generate Prisma Client & build prisma package
ARG DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"
ENV DATABASE_URL=$DATABASE_URL
RUN pnpm -C packages/prisma exec prisma generate --config prisma.config.ts
RUN pnpm -C packages/prisma build

# Build API
RUN pnpm -C apps/api-expressjs build

# Produce a self-contained prod bundle
RUN pnpm --filter ./apps/api-expressjs deploy /deploy --prod

# Copy generated Prisma client into the deployed bundle
RUN cp -r ./packages/prisma/generated /deploy/node_modules/@drawn-lights-game/prisma/generated


# --- Runtime Stage ---
FROM dhi.io/node:24-alpine3.22 AS runtime
LABEL org.opencontainers.image.source="https://github.com/Ostefanini/drawn-lights-game"
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /deploy ./

EXPOSE 4000

CMD ["node", "dist/index.js"]
