FROM node:12

COPY . .

RUN choco upgrade all -y