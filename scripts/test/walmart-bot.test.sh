#!/bin/bash
echo ' Start of walmart-bot test '
echo ' Should run a full cycle of walmart-bot.js script, then exit: 0 '

{ # try

USER_ENV=testUserInfo npm run walmart-bot
echo ' Finished running walmart-bot'

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