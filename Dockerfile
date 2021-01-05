# This Dockerfile is used to build an headles vnc image based on Ubuntu
FROM consol/sakuli-centos-xfce

USER root

# Create app directory
WORKDIR /usr/src/app
ENV DEBIAN_FRONTEND=noninteractive

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Bundle app source
COPY package*.json ./

RUN yum install -y yum-plugin-versionlock gcc-c++ make dotenv \
    && curl -sL https://rpm.nodesource.com/setup_10.x | bash -\
    && yum install nodejs-10.12.0-1nodesource.x86_64 -y \
    && yum versionlock nodejs* \
    && npm install -y 

COPY . .

CMD ["--wait"]