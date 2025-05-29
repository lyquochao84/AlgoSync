# Development Mode
FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy code after installed node_modules to avoid bad cache
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

