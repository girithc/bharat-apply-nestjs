FROM node:18

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install -y yarn && \
    yarn install --production

EXPOSE 5432

CMD ["yarn", "start:prod"]
