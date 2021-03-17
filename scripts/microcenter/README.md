# Special handling..
# About Microcenter puppet purchase bot

__For the best experience while using microcenter puppeteer workflow, be sure to add all necesarry account info such as phone number, located in Account > Profile > Update Account Information.__

As of now, Microcenter seems to demand the most manual input out of all the other bots. During the cycle of the program, the user will be required to complete some steps manually, these are steps the bot cannot perform on its own. Currently, work is still being done to make it so that there are no manual steps required. This is obviously not ideal, but keep in mind these steps are only required at the begining of the program - once they're complete, you can sit back and relax. Thank you for your patience.


# Usage:
__tldr below__

## Login 
Microcenter website will sometimes require users to complete a capcha puzzle during login

I had two option to get around this:
    a. Login with google signin. Quickly came to realize that google will probably have more account security protection steps associated with it.
    b. Give users a brief 30 second period to complete the captcha before the bot pickup the the workflow again.

I've settled on allowing for a 30 second period for completing the captcha. Hopefully this can be surcumvented in the future, but for now this is only a small compromise. The goal is to eventually have all bots fully automated. 

## Store selection
The user will need to select a microcenter location they wish the bot to monitor. This is the store the bot will check store inventory for and continue to monitor untill it notices a re-supply of stock. 

The problem: Microcenter doesnt allow for their users to define a default store in their profile. They say they do but you'll notice when using the puppeteer bot that your location in microcenter will not be selected. 

Solution: Once the bot nativagates to the item listing page, at the top center of the screen, click 'change' to change to your local microcenter store. 

## TLDR;
    a. Users will have to sign in manually. The bot will navigate to the login page and input user credentials but WILL NOT log in. The bot will wait 40 second for the user to select their prefered login method and finish the login step. ( captch has issues, google signin or facebook is recommended )

    b. Users will need to select their microcenter store. When the bot finishes loggin in, it will navigate to the item listing page ( the web-page listing of the item that it will purchase for the user). Once at the item listing page, the user must click on the 'change' button located in the top center of the screen and select their store. 

## You're done

### Don't forget, Options

As of now I have not found a way to get around the capcha puzzle, or not being able to pre-define a store in the account setup (only a matter of time before I do).

Don't feel like this bot lives up to your expectations ??? No problem ! Please find one of the other scripts in this repo :)

