#!/bin/bash
echo ' Start of target-bot test '
echo '  Should run a full cycle of target-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run target-bot

if [ $? -eq 0 ]; then
 
echo 'Finished running target-bot'

else

echo 'ERROR target-bot test Failed'
exit 2

fi