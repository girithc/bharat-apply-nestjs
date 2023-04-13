# Use a smaller base image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy and install app dependencies
COPY package*.json yarn.lock ./
RUN yarn install --production --frozen-lockfile
COPY prisma ./prisma/
RUN yarn install 

# Copy app source code and build
COPY . .
RUN yarn prisma generate
RUN yarn run build

# Run migrations and start app
CMD ["sh", "-c", "yarn prisma migrate deploy && yarn start"]

# Use a smaller base image for the final image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only production dependencies and app source code
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/prisma ./prisma

# Start the app
CMD [ "node", "dist/main.js" ]
