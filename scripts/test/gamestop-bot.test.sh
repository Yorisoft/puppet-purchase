#!/bin/bash
echo ' Start of gamestop-bot test '
echo ' Should run a full cycle of gamestop-bot.js script, then exit: 0 '

{ # try

USER_ENV=testUserInfo npm run gamestop-bot
echo ' Finished running gamestop-bot'

} || { # catch
    # save log for exception 
    set -e
    err_report() {
        echo "Error on line $1"
    }
    trap 'err_report $LINENO' ERR
    exit 2
    }
}