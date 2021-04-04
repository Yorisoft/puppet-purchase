# Special handling..
# About Newegg puppet purchase bot

__For the best experience while using newegg puppeteer workflow, be sure to add all necesarry account info , located in MyAccount > Account Settings. Anything that is required for checkout should then be added to the .env.userInfo file__

Newegg website required that you enter a 6 pin security code - ***sent to the email attempting to loggin.*** 
This means that additional email credentials are required in order for the puppeteer to retrieve the security code from the email adress.
Rememeber to fill in all required information inside _**scripts/< bot >/userInfo/.env.userInfo**_ 

### Testing

When running the newegg bot multtiple times, its required that the last security code email be deleted. Currently working on having newegg bot do this automatically. 

### Don't forget, Options

As of now I have not found a way to get around the 6 pin security code (only a matter of time before I do).

Not comfortable with inputing your email credentials into a random scripts found online ??? No problem ! Please find one of the other scripts in this repo :)