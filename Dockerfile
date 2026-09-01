# ---------- STAGE 1: Build the React frontend ----------
FROM node:20-alpine AS client-build

WORKDIR /app/client

COPY client/package*.json ./
RUN npm ci || npm install

COPY client/ ./
RUN npm run build

# ---------- STAGE 2: Build the backend deps ----------
FROM node:20-alpine AS server-deps

WORKDIR /app/server

COPY server/package*.json ./
RUN npm ci --omit=dev || npm install --omit=dev

# ---------- STAGE 3: Runtime image ----------
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Backend source + its production deps
COPY --from=server-deps /app/server/node_modules ./server/node_modules
COPY server/ ./server/

# Built frontend statics
COPY --from=client-build /app/client/dist ./client/dist

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

WORKDIR /app/server
CMD ["node", "index.js"]
