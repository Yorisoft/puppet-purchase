#!/bin/bash
echo ' Start of micro-bot test '
echo ' Should run a full cycle of micro-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run micro-bot
echo ' Finished running micro-bot'