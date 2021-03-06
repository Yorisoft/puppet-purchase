#!/bin/bash
echo ' Start of bestbuy-bot test '
echo ' Should run a full cycle of bestbuy-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run bestbuy-bot
echo ' Finished running bestbuy-bot'