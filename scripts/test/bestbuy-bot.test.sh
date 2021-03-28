#!/bin/bash
echo ' Start of bestbuy-bot test '
echo ' Should run a full cycle of bestbuy-bot.js script, then exit: 0 '

{ # try

USER_ENV=testUserInfo npm run bestbuy-bot
echo ' Finished running bestbuy-bot'

} || { # catch
    # save log for exception 
    set -e
    err_report() {
        echo "Error on line $1"
    }
        trap 'err_report $LINENO' ERR
        echo "x"
    }
}