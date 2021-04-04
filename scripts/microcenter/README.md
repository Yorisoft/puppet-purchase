# Special handling..
# About Microcenter puppet purchase bot

__For the best experience while using microcenter puppeteer workflow, be sure to add all necesarry account info such as phone number, located in Account > Profile > Update Account Information. Anything that is required for checkout should then be added to the .env.userInfo file__

The Microcenter website has a captcha puzzle when login in, which this program has no way of handling. To get around this, the bot uses google single-signin.
This means that additional email credentials are required in order for the puppeteer to signin to the Microcenter account.
Rememeber to fill in all required information inside _**scripts/< bot >/userInfo/.env.userInfo**_ 

# Usage:

Microcenter bot requires specifying the users desired store within the LISTING_URL or TEST_USER_LISTING_URL environment variables.
# EXAMPLE;
    TEST_USER_LISTING_URL=https://www.microcenter.com/product/600551/seagate-barracuda-2tb-7200rpm-sata-iii-6gb-s-35-internal-hard-drive/_**?storeid=121**_

    CA - Tustin                 = 101
    CO - Denver                 = 181
    GA - Duluth                 = 065
    GA - Marietta               = 041
    IL - Chicago                = 151
    IL - Westmont               = 025
    KS - Overland Park          = 191
    MA - Cambridge              = 121
    MD - Rockville              = 085
    MD - Parkville              = 125
    MI - Madison Heights        = 055
    MN - St. Louis Park         = 045
    MO - Brentwood              = 095
    NJ - North Jersey           = 075
    NY - Westbury               = 171
    NY - Brooklyn               = 115
    NY - Flushing               = 145
    NY - Yonkers                = 105
    OH - Columbus               = 141
    OH - Mayfield Heights       = 051
    OH - Sharonville            = 071
    PA - St. Davids             = 061
    TX - Houston                = 155
    TX - Dallas                 = 131
    VA - Fairfax                = 081


### Testing

When running the newegg bot multtiple times, its required that the last security code email be deleted. Currently working on having newegg bot do this automatically. 

### Don't forget, Options

As of now I have not found a way to get around the capcha puzzle, or not being able to pre-define a store in the account setup ( only a matter of time before I do! ).

Don't feel like this bot lives up to your expectations ??? No problem ! Please find one of the other scripts in this repo :)