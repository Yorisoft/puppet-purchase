# This Dockerfile is used to build an headles vnc image based on Ubuntu
FROM consol/sakuli-centos-xfce

USER root

# Create app directory
WORKDIR /usr/src/app
ENV DEBIAN_FRONTEND=noninteractive
ENV VNC_RESOLUTION=1920x1080

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Bundle app source
COPY package*.json ./

RUN yum install -y yum-plugin-versionlock gcc-c++ make dotenv procps dos2unix\
    && curl -sL https://rpm.nodesource.com/setup_10.x | bash -\
    && yum install nodejs-10.12.0-1nodesource.x86_64 -y \
    && yum versionlock nodejs* \
    && npm install --no-optional -y

COPY . ./

RUN find . -type f -name "*.sh" -exec dos2unix {} \+;
#RUN /bin/echo -e "3\ngfortran\n[...]" | ./configure && make

CMD "--wait"