FROM node:22.4.1-alpine3.20

WORKDIR /app

COPY package*.json .

RUN npm install --only=production

COPY . .

EXPOSE 3000

CMD ["node", "src/server.js"]
