# Special handling..
# About Newegg puppet purchase bot

Newegg website required that you enter a 6 pin security code - ***sent to the email attempting to loggin.*** 
This means that additional email credentials are required in order for the puppeteer to retrieve the security code from the email adress.
Rememeber to fill in all required information inside _**scripts/< bot >/userInfo/.env.userInfo**_ 

### Don't forget, Options

As of now I have not found a way to get around the 6 pin security code (only a matter of time before I do).

Not comfortable with inputing your email credentials into a random scripts found online ??? No problem ! Please find one of the other scripts in this repo :)

### Testing

When running the newegg bot multtiple times, its required that the last security code email be deleted. Currently working on having newegg bot do this automatically. 

### FIXED!!!
***Update: March.6.2021*** 

Due to changes in the naming convention of html selectors within newegg emails, for the time being manual entry of the security code is required. 

What does this mean? The newegg bot is not able to copy the security code from the email. So for now, it is set up to open up the email for the user and wait _10 Seconds_ for the user to copy and paste the security code into the browser. _Only copy and paste is required_ the bot will take care of the rest. 