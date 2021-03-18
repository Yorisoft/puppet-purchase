#!/bin/bash
echo ' Start of walmart-bot test '
echo ' Should run a full cycle of walmart-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run walmart-bot
echo ' Finished running walmart-bot'