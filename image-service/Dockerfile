FROM node:20-alpine
WORKDIR /usr/app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 8080
CMD [ "node", "src/index.js" ]