#!/bin/bash
echo ' Start of all-bots-find-stocks test. '
echo ' Should run each bot.js script, try to find available stock, then exit:0 '

npm run bestbuy-find-stocks-test
echo ' Finished running bestbuy-bot'

npm run gamestop-find-stocks-test
echo ' Finished running gamestop-bot'

npm run micro-find-stocks-test
echo ' Finished running micro-bot'

npm run newegg-find-stocks-test
echo ' Finished running newegg-bot'

npm run target-find-stocks-test
echo ' Finished running target-bot'

npm run walmart-find-stocks-test
echo ' Finished running walmart-bot'



echo 'Done'