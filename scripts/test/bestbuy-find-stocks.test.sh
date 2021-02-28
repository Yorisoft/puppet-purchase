#!/bin/bash
echo ' Start of bestbuy-find-listing test '
echo ' Should continuesly switch stores, check if the item is in-stock, then exit:0 '

USER_ENV=findListingInfo npm run bestbuy-bot
echo ' Finished running bestbuy-bot'