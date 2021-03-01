# Puppet-Purchase: Auto Purchase Scripts  

puppet-purchase is a bot that automate the process of purchasing an item from a few of the major online retailers. In attempt to combat scalping, I've created puppet-purchase bot and am making  publicly available. Not perfect, but has helped me. Please share && contribute.     
     
These are scripts that automate the user flow of purchasing an item.     
- Navigate to site  
- Signin to account  
- Navigate to item listing page
- If no is stock available, switches store and refresh page until available. 
- Add item to cart  
- Checkout cart   


### Add your account login credentials.

To run these scripts, an online account setup with one of the retailers is required. To ensure  the scripts execute with no errors, be sure to plug in your account information. Each bot uses the **.env.userInfo** file located in _**scripts/<bot>/userInfo/**_ to define user specific information.

### Note  
### _**Do not include your payment information.**_ 
All payment information should be setup by using your web browser, logging into the account, and adding a payment option. Not in the scripts.  
Avoid cheking in personal account information to this repo / branches if you decide to contribute by adding _**.env.userInfo**_ to _**.gitignore**_

## Installation

To run these script use [node.js](https://nodejs.org/en/) in order to install the required node modules. Navigate to the project directory and install npm. 

```node
npm install
```
Because of the way that the environment variables are defined, a version of [WSL](https://docs.microsoft.com/en-us/windows/wsl/) will need to be installed on your machine. Alternatively, and perhaps an easier method for some, installing [Git](https://git-scm.com/downloads) and running the program using _**Git Bash**_

## Usage
Once npm finishes installing all the required node modules, the scripts are ready to go! Try running running one of the bot-test to see it in action. 
```node
npm run bestbuy-bot-test
```
A full list of available scripts can be found in _**package.json**_
## Docker
Alternatively, you can run program inside a docker container. Use the _**Dockerfile**_ provided to make a docker image and then run it inside a docker container. 
```node
docker build -t puppet-purchase .
docker run -p 8080:8080 -d puppet-purchase
```
Use [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/) to look inside the container and view the process. By default it is running on port 8080. Feel free to change the default port by editing the _**Dockerfile**_
```node
EXPOSE [new_port_number]
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
