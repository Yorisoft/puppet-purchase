FROM node:14-alpine

WORKDIR /usr/src/

COPY . .

RUN apk update && apk add git && apk add tree