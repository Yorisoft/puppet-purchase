#!/bin/bash
echo ' Start of all-bots-fullCycle test. '
echo ' Should run a full cycle of all bot.js script, then exit: 0 '

npm run bestbuy-bot-test
echo ' Finished running bestbuy-bot'

npm run newegg-bot-test
echo ' Finished running newegg-bot'

npm run target-bot-test
echo ' Finished running target-bot'

echo 'Done'