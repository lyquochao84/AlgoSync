# Use Node.js base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Optional: expose the port your Express app runs on
EXPOSE 4000

# Run the development server using ts-node-dev
CMD ["npm", "run", "dev"]
