FROM node:13-alpine

RUN mkdir -p /app

WORKDIR /app

ADD . .

RUN yarn

RUN yarn install --force

# EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ]