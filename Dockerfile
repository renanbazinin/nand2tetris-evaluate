# Multi-stage Dockerfile for api-lite

# 1) Install deps (cacheable)
FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2) Build TypeScript
FROM node:22-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src
COPY vendor ./vendor
RUN npm run build

# 3) Production runtime
FROM node:22-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
# Only production deps
COPY package*.json ./
RUN npm ci --omit=dev
# Copy build output and runtime assets
COPY --from=build /app/dist ./dist
COPY vendor ./vendor
# Client is intentionally NOT copied (see .dockerignore)

EXPOSE 3000
CMD ["node", "dist/server.js"]
