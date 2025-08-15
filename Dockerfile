ARG NODE_VERSION=22.14.0-alpine
FROM node:${NODE_VERSION} AS base

WORKDIR /app

COPY . .


RUN npm i lightningcss-linux-x64-musl && npm install --no-audit

EXPOSE 3000

CMD ["npm", "run", "dev"]