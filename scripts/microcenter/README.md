# Special handling..
# About Microcenter puppet purchase bot

__For the best experience while using microcenter puppeteer workflow, be sure to add all necesarry account info such as phone number, located in Account > Profile > Update Account Information. Anything that is required for checkout should then be added to the .env.userInfo file__

As of now, Microcenter seems to demand the most out of all the other bots. During the cycle of the program, users will be required to complete a step manually, this is a step the bot cannot perform on its own. Currently, work is still being done to make it so that there are no manual steps required. This is obviously not ideal, but keep in mind this step is only required at the begining of the program - once that's complete, you can sit back and relax. 

The Microcenter website also has a captcha puzzle when login in, which this program has no way of handling. To get around this, the bot uses google single-signin.
This means that additional email credentials are required in order for the puppeteer to signin to the Microcenter account.
Rememeber to fill in all required information inside _**scripts/< bot >/userInfo/.env.userInfo**_ 

# Usage:
__tldr below__

## Store selection
The user will need to select a microcenter location they wish the bot to monitor. This is the store the bot will check store inventory for and continue to monitor untill it notices a re-supply of stock. 

The problem: Microcenter doesnt allow for their users to define a default store in their profile. They explain that they do but user will notice when using the puppeteer bots that your location in microcenter will not be selected.

Solution: Once the bot nativagates to the item listing page, at the top center of the screen, click 'change' to change to your local microcenter store. 

## TLDR;
    Users will need to select their microcenter store. When the bot finishes loggin in, it will navigate to the item listing page. Once at the item listing page, the user must click on the 'change' button located in the top center of the screen and select their store. 

## You're done

### Don't forget, Options

As of now I have not found a way to get around the capcha puzzle, or not being able to pre-define a store in the account setup ( only a matter of time before I do! ).

Don't feel like this bot lives up to your expectations ??? No problem ! Please find one of the other scripts in this repo :)