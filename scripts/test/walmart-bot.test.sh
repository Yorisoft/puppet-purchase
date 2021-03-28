#!/bin/bash
echo ' Start of walmart-bot test '
echo ' Should run a full cycle of walmart-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run walmart-bot

if [ $? -eq 0 ]; then
 
echo 'Finished running walmart-bot'

else

echo 'ERROR walmart-bot test Failed'
exit 2

fi