FROM node:18 AS builder

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install

COPY . .

RUN yarn run build

# 👇 new migrate and start app script
CMD [  "yarn", "run", "start:migrate:prod" ]