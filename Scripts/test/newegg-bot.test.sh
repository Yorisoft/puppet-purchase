#!/bin/bash
echo ' Start of newegg-bot test '
echo '  Should run a full cycle of newegg-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run newegg-bot
echo ' Finished running newegg-bot'