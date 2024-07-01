# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the port that the application will run on
EXPOSE 5022

# Specify the command to run the application
CMD ["npm", "run", "start:prod"]
