#!/bin/bash
echo ' Start of newegg-find-listing test '
echo ' Should continuesly switch stores, check if the item is in-stock, then exit:0 '

USER_ENV=testUserInfo npm run newegg-bot
echo ' Finished running newegg-bot'