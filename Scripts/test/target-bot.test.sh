#!/bin/bash
echo ' Start of target-bot test '
echo '  Should run a full cycle of target-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run target-bot
echo ' Finished running target-bot'