#!/bin/bash
echo ' Start of newegg-bot test '
echo '  Should run a full cycle of newegg-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run newegg-bot

if [ $? -eq 0 ]; then
 
echo 'Finished running newegg-bot'

else

echo 'ERROR newegg-bot test Failed'
exit 2

fi