# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose ports
EXPOSE 3000
EXPOSE 3001

# Start the server
CMD ["node", "server.js"]