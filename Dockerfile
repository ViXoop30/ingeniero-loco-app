# Stage 1: Build the frontend
FROM node:20-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
# Install only production dependencies
RUN npm install --production
# Copy built frontend
COPY --from=build-stage /app/dist ./dist
# Copy server file and other necessary files
COPY --from=build-stage /app/server.ts ./
COPY --from=build-stage /app/tsconfig.json ./
# Install tsx to run the server
RUN npm install -g tsx

# Set environment variables
ENV NODE_ENV=production
ENV PORT=7001

# Expose the port
EXPOSE 7001

# Start the server
CMD ["tsx", "server.ts"]
