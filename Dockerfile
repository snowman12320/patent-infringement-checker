# Use official Node.js image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Clean pnpm cache and install dependencies
RUN pnpm store prune && pnpm install

# Copy application code
COPY . .

# Build Next.js application
RUN pnpm run build

# Expose port 3000
EXPOSE 3000

# Start Next.js application
CMD ["pnpm", "start"]