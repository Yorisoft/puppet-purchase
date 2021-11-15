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
    && apt-get install libgconf-2-4 sudo curl wget xvfb dos2unix apt-transport-https ca-certificates -y \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update -y \
    && apt-get install google-chrome-stable --no-install-recommends -y
    #&& rm -rf /var/lib/apt/lists/*

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && sudo apt-get install nodejs -y \
    && node -v \
    && npm -v 
RUN find . -type f -name "*.sh" -exec dos2unix {} \+;

RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo \
    && useradd -m jenkins && echo "jenkins:jenkins" | chpasswd && adduser jenkins sudo

RUN  whoami
