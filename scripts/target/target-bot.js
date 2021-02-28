const taskHandler = require('./taskHandler');
const myInfo = require('./myInfo');
const utils = require('./utils');
const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');

async function addToCart(page) {
  await page.$eval(utils.selectors.get('pickUp_bttn_selector'), (el) => el.click());
  console.log('Item added to cart ..');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPathPath}+added_to_cart.png` });
}

async function targetBot() {
  // Spinner 
  var mySpinner = new Spinner.Spinner('processing.. %s');
  mySpinner.setSpinnerString('|/-\\');
  mySpinner.start();

  // Puppeteer
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox'],
    //executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  const page = await browser.newPage();
  await page.goto('https://www.target.com', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${myInfo.snapShotPathPath}+start.png` });

  // Signing in
  await taskHandler.logIn(page);

  // TESTING - Comment out when done.
  // await cleanUpAccount(page);
  // For cleaning up account/pause program - usefull for test setup
  // await page.waitForTimeout(9000000);

  // Navigate to listing & add to cart
  let amountOrdered = 0;
  while (amountOrdered < 1) {
    try {
      console.log('\n[1/4] .. Navigating to listing page ..'.bgBlue);
      await page.goto(myInfo.listingURL, { waitUntil: 'networkidle2' });
      await page.screenshot({ path: `${myInfo.snapShotPathPath}+listing_page.png` });

      // Checking to see if listing is out of stock
      let stocks = await page.$eval(utils.selectors.get('outOfStock_selector'), (element) => { return element.innerHTML });
      let isOutOfStock = stocks.includes('Out of stock');
      console.log('isOutOfStock: ' + `${isOutOfStock}`.red);

      // While listing is out of stock: Change store, check availability 
      let testRuns = 0;
      while (isOutOfStock) {
        console.log('\nProduct is OUT OF STOCK'.red);
        isOutOfStock = await taskHandler.findListing(page);

        if((`${process.env.USER_ENV}` == 'findListingInfo' && testRuns == 1)){
          return;
        }
        testRuns++;
      }
      console.log('\nListing is in stock !!'.bgBlue);

      // Add listing to cart
      console.log('\n[2/4] .. Adding item to cart ..'.bgBlue);
      await page.waitForTimeout(500);
      await addToCart(page);

      // Navigate to cart
      console.log('\n[3/4] .. Navigating to cart ..'.bgBlue);
      const cartURL = 'https://www.target.com/co-cart';
      await page.goto(cartURL, { waitUntil: 'networkidle2' });
      await page.screenshot({ path: `${myInfo.snapShotPath}+nav_to_cart.png` });

      //Checkout listing
      console.log('\n[4/4] .. Checking out cart ..'.bgBlue);
      await page.waitForTimeout(500);
      await taskHandler.checkoutCart(page);

      // Ctrl+C && Celebrate
      console.log('\nDone. Goteee boiiis!!! \n'.rainbow);
      console.log('\nCtrl+C && Celebrate \n'.bgRed);

      // Done
      await page.goto('https://www.tenor.com/view/done-and-done-ron-swanson-gotchu-gif-10843254', { waitUntil: 'networkidle2' });
      amountOrdered++;
    } catch (error) {
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

targetBot();