# Stage 1: Build the Vue 3 app
FROM node:18 AS build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (if you use Yarn, copy yarn.lock instead)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the built files using nginx
FROM nginx:stable-alpine AS production-stage

# Copy the built files from the previous stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY ./conf/nginx.conf /etc/nginx/conf.d/default.conf


# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]