# This Dockerfile is used to build an headles vnc image based on Ubuntu
FROM consol/ubuntu-xfce-vnc

USER root

# Setting env
ENV VNC_RESOLUTION=1920x1080 \
    VNC_PW=puppeteer \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXEC_PATH=google-chrome-stable

# Create app directory
WORKDIR /usr/src/app

COPY . ./
# update, install puppeteer dependencies, and install node
RUN apt-get update -y \
    && apt-get install -yq libgconf-2-4 sudo curl wget xvfb \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
#RUN sudo Xvfb -ac :1 -screen 1 1280x1024x16

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && sudo apt-get install -y nodejs \
    && node -v \
    && npm -v

RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo \
    && useradd -m jenkins && echo "jenkins:jenkins" | chpasswd && adduser jenkins sudo

#USER jenkins 
#RUN  whoami \
#    && xhost + \
#    && xhost localhost \
#    && xauth list|grep `uname -n`\
#    && DISPLAY=:0; export DISPLAY \
#    && xauth add $DISPLAY . hexkey  

RUN  whoami

#COPY entrypoint.sh /entrypoint.sh
ENTRYPOINT ["Xvfb -ac :1 -screen 1 1280x1024x16"]   
#CMD Xvfb -ac :1 -screen 1 1280x1024x16