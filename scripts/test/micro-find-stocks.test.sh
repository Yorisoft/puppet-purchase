#!/bin/bash
echo ' Start of micro-find-listing test '
echo ' Should continuesly switch stores, check if the item is in-stock, then exit:0 '

USER_ENV=findListingInfo npm run micro-bot
echo ' Finished running micro-bot'