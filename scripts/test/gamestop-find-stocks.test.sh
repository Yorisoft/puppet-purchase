#!/bin/bash
echo ' Start of gamestop-find-listing test '
echo ' Should continuesly switch stores, check if the item is in-stock, then exit:0 '

USER_ENV=testUserInfo npm run gamestop-bot
echo ' Finished running gamestop-bot'