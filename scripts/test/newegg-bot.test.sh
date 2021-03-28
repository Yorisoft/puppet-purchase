#!/bin/bash
echo ' Start of newegg-bot test '
echo '  Should run a full cycle of newegg-bot.js script, then exit: 0 '

{ # try

USER_ENV=testUserInfo npm run newegg-bot
echo ' Finished running newegg-bot'

} || { # catch
    # save log for exception 
    set -e
    err_report() {
        echo "Error on line $1"
    }
    trap 'err_report $LINENO' ERR
    exit 2
}