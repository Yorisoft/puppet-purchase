# Puppet-Purchase: Auto Purchase Scripts  

puppet-purchase is a bot that automates the process of purchasing an item from a few of the major online retailers. In attempt to combat scalping, I've created puppet-purchase bot and am making it publicly available with you all. Not perfect, but has helped me. Please share && contribute.     
     
These are scripts that automate the user flow of purchasing an item.     
That flow is as followed:
- Navigate to site  
- Sign-in to the account  
- Navigate to item listing page
- If no is stock available:
    switches store and refresh page until it finds available stock.
- Adds item to cart  
- Checks-out cart   


### Connecting it to your account

To run these scripts, setting up an online account with one of the retailers is required. To ensure  the scripts execute with no errors, be sure to plug in your account information. Each bot uses the **.env.userInfo** file located in _**scripts/< bot >/userInfo/.env.userInfo**_ to define user specific information.

### Note !!!
### _**Do not include your payment information.**_ 
All payment information should be setup by using your web browser, logging into the account, and adding a payment option. Not in the scripts.  
Avoid checking in personal account information to this repo / branches if you decide to contribute by adding _**.env.userInfo**_ to _**.gitignore**_.
Or even better, by creating a new a _**.env.**_ file and pointing to it in 

## Installation

To run these script use [node.js](https://nodejs.org/en/) in order to install the required node modules. Navigate to the project directory and install npm. 

```node
npm install
```
Because of the way that the environment variables are defined, a version of [WSL](https://docs.microsoft.com/en-us/windows/wsl/) will need to be installed on your machine if running on windows machine. Alternatively, and perhaps an easier method for some, installing [Git](https://git-scm.com/downloads) and running the program using _**Git Bash**_

## Usage
Once npm finishes installing all the required node modules, the scripts are ready to go! Try filling out the necessary account info in _**scripts/< bot >/userInfo/.env.userInfo**_, then running one of the bots to see it in action. 
```node
npm run target-bot
```
A full list of available scripts can be found in _**package.json**_

## Docker
Alternatively, you can run program inside a docker container. Use the _**Dockerfile**_ provided to make a docker image and then run it inside a docker container. 
```node
docker build -t puppet-purchase .
docker run -p 5901:5901 -d puppet-purchase
```

## VNC
Use [VNC Viewer](https://www.realvnc.com/en/connect/download/viewer/) to look inside the container and view the process. By default it is running on port 5901. Feel free to change the default port by editing the -p flag and the  _**Dockerfile**_
```node
# Inside Dockerfile, add this
EXPOSE [new_port_number]
```
default password: puppeteer

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
