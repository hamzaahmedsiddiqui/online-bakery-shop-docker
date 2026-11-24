FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Copy package files first so the install step is cached
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY . .

# Run as the non-root "node" user that ships with the image
USER node

EXPOSE 5050
CMD ["node", "server.js"]
