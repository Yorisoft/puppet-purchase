# This Dockerfile is used to build an headles vnc image based on Ubuntu
FROM consol/ubuntu-xfce-vnc

USER root

# Setting env
ENV DEBIAN_FRONTEND=noninteractive
ENV VNC_RESOLUTION=1920x1080

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Bundle app source
COPY . ./

RUN apt-get -y update \
    && apt-get -y install apt-utils dos2unix \
    && apt-get -y install nodejs-legacy \
    && apt-get -y autoremove

RUN find . -type f -name "*.sh" -exec dos2unix {} \+;

EXPOSE 5901
ENTRYPOINT /bin/bash