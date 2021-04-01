#!/bin/bash
echo ' Start of micro-bot test '
echo ' Should run a full cycle of micro-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run micro-bot

if [ $? -eq 0 ]; then
 
echo 'Finished running micro-bot'

else

echo 'ERROR micro-bot test Failed'
exit 2

fi