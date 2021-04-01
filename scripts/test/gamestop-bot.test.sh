#!/bin/bash
echo ' Start of gamestop-bot test '
echo ' Should run a full cycle of gamestop-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run gamestop-bot

if [ $? -eq 0 ]; then
 
echo 'Finished running gamestop-bot'

else

echo 'ERROR gamestop-bot test Failed'
exit 2

fi