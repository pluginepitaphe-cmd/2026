FROM node:20-alpine

WORKDIR /app

# Install root dependencies
COPY package.json .
RUN npm install

# Copy the rest of the application
COPY . .

# Build frontend
WORKDIR /app/frontend
RUN rm -rf node_modules package-lock.json
RUN npm cache clean --force
RUN npm install --force
RUN npm run build

# Go back to root workdir
WORKDIR /app

# Start the application
CMD ["npm", "start"]

