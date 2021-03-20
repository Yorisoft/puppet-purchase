#!/bin/bash
echo ' Start of gamestop-bot test '
echo ' Should run a full cycle of gamestop-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run gamestop-bot
echo ' Finished running gamestop-bot'