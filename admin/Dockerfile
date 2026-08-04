FROM node:22-bookworm-slim AS deps
WORKDIR /app
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        python3 \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS builder
WORKDIR /app
ARG PUBLIC_URL
ENV NODE_ENV=production
ENV PUBLIC_URL=$PUBLIC_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build \
    && npm prune --omit=dev

FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=1337

COPY --from=builder --chown=node:node /app/package.json /app/package-lock.json /app/tsconfig.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/config ./config
COPY --from=builder --chown=node:node /app/src ./src
COPY --from=builder --chown=node:node /app/database ./database
COPY --from=builder --chown=node:node /app/dist ./dist
COPY --from=builder --chown=node:node /app/favicon.png ./favicon.png
COPY --from=builder --chown=node:node /app/public ./public
RUN mkdir -p /app/.cache /app/.tmp /app/public/uploads \
    && chown -R node:node /app/.cache /app/.tmp /app/public

USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
