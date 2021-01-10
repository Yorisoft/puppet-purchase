#!/bin/bash
echo ' Start of target-find-listing test '
echo ' Should continuesly switch stores, check if the item is in-stock, then exit:0 '

USER_ENV=findListingInfo npm run target-bot
echo ' Finished running target-bot'