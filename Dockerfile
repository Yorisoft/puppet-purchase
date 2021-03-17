# This Dockerfile is used to build an headles vnc image based on Ubuntu
FROM consol/ubuntu-xfce-vnc

USER root

# Setting env
ENV VNC_RESOLUTION=1920x1080 \
    VNC_PW=puppeteer

# Create app directory
WORKDIR /usr/src/app

COPY . ./
# update, install puppeteer dependencies, and install node
RUN apt-get update -y \
    && apt-get install -y sudo curl wget\
    #&& sudo apt-get install -y dos2unix sudo gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 \
    #libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 gcc g++ make libc6 \
    #libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 \
    #libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 \
    #libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation \
    #libappindicator1 libnss3 lsb-release libgbm-dev xdg-utils wget \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
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
    
#ENTRYPOINT ["/dockerstartup/vnc_startup.sh"]
#CMD /bin/bash