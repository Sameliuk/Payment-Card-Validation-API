# Base Node.js LTS image
FROM node:20-alpine

# Working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Copy the OpenAPI documentation separately (to make sure the file is available)
# If docs is already in the root of the project, this line can be omitted
# COPY docs ./docs

# Compile TypeScript
RUN npm run build

# Run tests (not required for production image)
RUN npm test

# Set the port (if Express server)
EXPOSE 3000

# Command to start the server
CMD ["node", "dist/index.js"]