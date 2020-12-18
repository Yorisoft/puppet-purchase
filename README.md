# Puppet-Purchase Auto Purchase Scripts  

puppet-purchase is a bot that automate the process of purchasing an item from BestBuy / Target. In attempt to combat scalping, I've created puppet-purchase bot and am making  publicly available. Not perfect, but has helped me. Please share && contribute.     
     
These are scripts that automate the user flow of purchasing an item.     
- Navigate to site  
- Signin to account  
- Navigate to item listing page  
- Add item to cart  
- Checkout cart   


### Add your account login credentials.

To run these scripts, an online account setup with one of the retailers is required. To ensure  the scripts execute with no errors, be sure to plug in your account information where required. Each script uses the first few lines to specify user specific information (lines 1 - 6)  

#### Note  
 
***Do not include your payment information.***  
All payment information should be setup by using your web browser, logging into the account, and adding a payment option. Not in the scripts.  
Avoid cheking in personal account information to this repo / branches if you decide to contribute. 

## Installation

To run these script use [node.js](https://nodejs.org/en/) in order to install the required node modules. 

```bash
npm install
```

## Usage


```python
# Navigate to a script using a command line, and run script
cd /path/to/file.js
node <file>.js

# Alternatively, run file from current directory
node /path/to/file.js
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

