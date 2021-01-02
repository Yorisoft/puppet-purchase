FROM stefanscherer/node-windows

WORKDIR C:\\Users\\.jenkins\\puppeteer-public

COPY . .

RUN apk update && apk add git && apk add tree