FROM node:14-alpine

WORKDIR /usr/src/puppet-purchase

RUN apk update && apk add git && apk add tree