# -------- BUILD STAGE --------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig*.json ./
COPY src ./src

RUN npm install
RUN npm run build

# -------- PRODUCTION STAGE --------
FROM node:20-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm install --omit=dev

CMD ["npm", "run", "start:prod"]
