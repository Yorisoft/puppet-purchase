FROM node:12

WORKDIR /usr/src/

COPY . .

RUN choco upgrade all -y