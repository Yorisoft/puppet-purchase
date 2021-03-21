const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');
const taskHandler = require('./taskHandler');
const myInfo = require('./myInfo');
const utils = require('./utils');

async function neweggBot() {
  // Spinner 
  var mySpinner = new Spinner.Spinner('processing.. %s');
  mySpinner.setSpinnerString('|/-\\');
  mySpinner.start();

  let launcherArgs;
  let isHeadless;
  if(process.env.USER_ENV === 'testUserInfo'){
    isHeadless = true;
    launcherArgs = ['--no-sandbox', '--deterministic-fetch', '--disable-setuid-sandbox', `--window-size=1025,1025`];
  } else {
    isHeadless = false;
    launcherArgs = ['--no-sandbox', `--window-size=1025,1025`];
  }
  // Start of test: Launch and go to login website
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
    args: launcherArgs,
    //executablePath: '/usr/bin/chromium-browser'
  });

  
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
  await page.goto('https://www.newegg.com');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

  

  // Login
  await taskHandler.logIn(page, isHeadless);
  await page.waitForSelector('div.nav-complex-title');

  let amountOrdered = 0;
  while (amountOrdered < 1) {
    try {
      console.log('\n[1/4] .. Navigating to listing page ..'.bgBlue);
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      await page.goto(myInfo.listingURL, { waitUntil: 'networkidle2' });
      console.log(`${myInfo.listingURL}`);
      await page.screenshot({ path: `${myInfo.snapShotPath}+listing_page.png` });

      // Checking to see if listing is out of stock
      await page.waitForSelector(utils.selectors.get('outOfStock_selector'));
      let inventoryText = await page.$eval(utils.selectors.get('outOfStock_selector'), (element) => { return element.innerHTML });
      let isOutOfStock = inventoryText.includes('OUT OF STOCK');
      console.log('isOutOfStock: ' + `${isOutOfStock}`.red);

      // While listing is out of stock: Refresh page, check availability 
      let testRuns = 0;
      while (isOutOfStock) { // reversing the logic for now, will create new variable for stock selector 
        console.log('\nOUT OF STOCK'.red);
        console.log('\nRefreshing Page..'.yellow);
        await page.reload();
        
        // Check if current store has listing 
        await page.waitForTimeout(500);
        await page.waitForSelector(utils.selectors.get('outOfStock_selector'));
        inventoryText = await page.$eval(utils.selectors.get('outOfStock_selector'), (element) => { return element.innerHTML });
        isOutOfStock = inventoryText.includes('OUT OF STOCK');

        if((`${process.env.USER_ENV}` == 'testUserInfo' && testRuns == 10)){
          testRuns++;
          return;
        }
        
      }
      console.log('\nListing is in stock !!'.bgBlue);

      // Add listing to cart
      console.log('\n[2/4] .. Adding item to cart ..'.bgBlue);
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      let pickUp_bttn = await page.$$(utils.selectors.get('pickUp_bttn_selector'));
      await pickUp_bttn[0].click();
      await page.waitForTimeout({ waitUntil: 'networkidle2' });
      console.log('Item added to cart ..');
      await page.screenshot({ path: `${myInfo.snapShotPath}+added_to_cart.png` });

      // Navigate to cart
      console.log('\n[3/4] .. Navigating to cart ..'.bgBlue);
      const cartURL = 'https://secure.newegg.com/shop/cart';
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      await page.goto(cartURL);
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${myInfo.snapShotPath}+nav_to_cart.png` });

      //Checkout listing
      console.log('\n[4/4] .. Checking out cart ..'.bgBlue);
      await taskHandler.checkoutCart(page);

      // Ctrl+C && Celebrate
      console.log('\nDone. Goteee boiiis!!! \n'.rainbow);
      console.log('\nCtrl+C && Celebrate \n'.bgRed);

      // Done
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      await page.goto('https://www.tenor.com/view/done-and-done-ron-swanson-gotchu-gif-10843254', { waitUntil: 'networkidle2' });
      amountOrdered++;
    } catch (error) {
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
      console.log('\n' + error);
    } finally {
      await page.waitForTimeout(7000);
      await page.close();
      await browser.close();
      await mySpinner.stop();
      await process.exit(); 
    }
  }
}

neweggBot();