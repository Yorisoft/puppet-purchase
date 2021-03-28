#!/bin/bash
echo ' Start of target-bot test '
echo '  Should run a full cycle of target-bot.js script, then exit: 0 '

{ # try

USER_ENV=testUserInfo npm run target-bot
echo ' Finished running target-bot'

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