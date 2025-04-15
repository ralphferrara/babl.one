# Use Node.js image from Docker Hub
FROM node:20

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]