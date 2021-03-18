#!/bin/bash
echo ' Start of walmart-find-listing test '
echo ' Should continuesly switch stores, check if the item is in-stock, then exit:0 '

USER_ENV=testUserInfo npm run walmart-bot
echo ' Finished running walmart-bot'