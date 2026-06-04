FROM node:20-alpine AS migrate
ENV NODE_ENV=production
WORKDIR /workspace

# Enable pnpm
RUN corepack enable

# Copy config files
COPY .npmrc ./
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy package.json for prisma package only (leverage cache)
COPY packages/prisma/package.json ./packages/prisma/package.json

# Install only prisma package dependencies
RUN pnpm install --frozen-lockfile --filter @drawn-lights-game/prisma --ignore-scripts

# Copy prisma source (schema, migrations, config)
COPY packages/prisma ./packages/prisma

WORKDIR /workspace/packages/prisma

CMD ["pnpm", "exec", "prisma", "migrate", "deploy"]
