// createDockerfile.mjs
import fs from 'fs';
import path from 'path';

// Read the generated .env file to get MySQL credentials (username and password)
function readEnvFile() {
  const envPath = path.resolve(process.cwd(), '.env');
  const envData = fs.readFileSync(envPath, 'utf8');
  
  const envVariables = {};
  envData.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
      envVariables[key.trim()] = value.trim();
    }
  });

  return envVariables;
}

// Create the Dockerfile with MySQL and Node.js setup
function createDockerfile() {
  const { MYSQL_USER, MYSQL_PASSWORD } = readEnvFile();

  const dockerfileContent = `
# Use the official Node.js image
FROM node:16

# Install MySQL
RUN apt-get update && \\
    apt-get install -y mysql-server && \\
    apt-get clean;

# Set up the working directory for your app
WORKDIR /usr/src/app

# Copy package.json and install Node.js dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's source code
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Set environment variables for MySQL
ENV MYSQL_USER=${MYSQL_USER}
ENV MYSQL_PASSWORD=${MYSQL_PASSWORD}
ENV MYSQL_ROOT_PASSWORD=rootpassword
ENV MYSQL_DATABASE=babl_sync_db

# Create MySQL database and user
RUN service mysql start && \\
    mysql -e "CREATE DATABASE IF NOT EXISTS babl_sync_db;" && \\
    mysql -e "CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'localhost' IDENTIFIED BY '${MYSQL_PASSWORD}';" && \\
    mysql -e "GRANT ALL PRIVILEGES ON babl_sync_db.* TO '${MYSQL_USER}'@'localhost';" && \\
    mysql -e "FLUSH PRIVILEGES;"

# Start both MySQL and the Node.js app
CMD service mysql start && \\
    npm run start
  `;

  // Write the Dockerfile content to the Dockerfile
  const dockerfilePath = path.resolve(process.cwd(), 'Dockerfile');
  fs.writeFileSync(dockerfilePath, dockerfileContent, { encoding: 'utf8' });

  console.log('Dockerfile generated successfully!');
}

// Run the function to generate the Dockerfile
createDockerfile();
