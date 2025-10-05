 # Use Node official image
 FROM node:18-alpine
 WORKDIR /server
 COPY package*.json ./
 RUN npm install
 COPY . .
 EXPOSE 5000
 CMD ["node", "server.js"]