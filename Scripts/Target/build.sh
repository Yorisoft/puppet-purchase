#!/bin/bash

if [ -z "$USER_ENV" ]
then
    export USER_ENV=userInfo
else
    export USER_ENV=$USER_ENV
fi
echo "Environmnet: $USER_ENV"

USER_ENV=$USER_ENV node scripts/target/target-bot.js