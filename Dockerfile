# This Dockerfile is used to build an headles vnc image based on Ubuntu
FROM consol/ubuntu-xfce-vnc

USER root

# Setting env
ENV VNC_RESOLUTION=1920x1080 \
    DISPLAY=:0

# Create app directory
WORKDIR /usr/src/app

COPY . ./

RUN apt-get -y update \
    && apt-get -y install dos2unix curl sudo \
    && curl -sL https://deb.nodesource.com/setup_10.x | bash - \
    && apt-get install -y nodejs \
    && apt-get -y autoremove \
    && node -v \
    && npm -v

# RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo
RUN whoami \
    #&& xhost localhost \
    && xhost +
 
#ENTRYPOINT ["/dockerstartup/vnc_startup.sh"]
#CMD /bin/bash