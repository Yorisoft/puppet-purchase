#!/bin/bash
echo ' Start of bestbuy-bot test '
echo ' Should run a full cycle of bestbuy-bot.js script, then exit: 0 '

USER_ENV=testUserInfo npm run bestbuy-bot

exit

# if [ $? -eq 0 ]; then
 
# echo 'Finished running bestbuy-bot'

# else

# echo 'ERROR bestbuy-bot test Failed'
# exit 2

# fi