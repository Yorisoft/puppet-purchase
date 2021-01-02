FROM node:12

COPY . .

RUN apk update && apk add git && apk add tree