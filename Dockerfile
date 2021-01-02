FROM stefanscherer/node-windows

COPY . .

RUN apk update && apk add git && apk add tree