# Use Node.js base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy files
COPY package*.json ./
RUN npm install

COPY . .

# Expose the email service port
EXPOSE 5001

# Run the service
CMD ["npm", "run", "dev"]
