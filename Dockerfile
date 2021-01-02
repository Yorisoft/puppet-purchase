FROM node:14-alpine

COPY . .

RUN apk update && apk add git && apk add tree