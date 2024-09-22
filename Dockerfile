# Stage 1: Build the application
FROM node:21-alpine3.19 AS build
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files and install dependencies
COPY --chown=node:node ./pnpm-lock.yaml ./
COPY --chown=node:node ./package.json ./
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY --chown=node:node . .

# Build the application
RUN pnpm build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
# Copy the default Nginx configuration file
COPY ./default.conf /etc/nginx/conf.d/default.conf    
# Copy the built application from the build stage
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
