const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');
const taskHandler = require('./taskHandler');
const myInfo = require('./myInfo');
const utils = require('./utils');

async function addToCart(page) {
  await page.$eval(utils.selectors.get('chekout_bttn_selector_1'), (el) => el.click());
  console.log('Item added to cart ..');
  await page.screenshot({ path: `${myInfo.snapShotPath}+added_to_cart.png` });
}

(async () => {
  // Start of test: Launch and go to login website
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  const page = await browser.newPage();
  await page.goto('https://www.newegg.com');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

  // Spinner 
  var mySpinner = new Spinner.Spinner('processing.. %s');
  mySpinner.setSpinnerString('|/-\\');
  mySpinner.start();

  // Login
  await taskHandler.logIn(page);
  await page.waitForSelector('div.nav-complex-title');

  let amountOrdered = 0;
  while (amountOrdered < 1) {
    try {
      console.log('\n[1/4] .. Navigating to listing page ..'.bgCyan);
      await page.goto(myInfo.listingURL);
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${myInfo.snapShotPath}+listing_page.png` });

      // Checking to see if listing is out of stock
      await page.waitForSelector(utils.selectors.get('outOfStock_selector'));
      let stocks = await page.$eval(utils.selectors.get('outOfStock_selector'), (element) => { return element.innerHTML });
      let isOutOfStock = stocks.includes('Sold Out');

      // While listing is out of stock: Change store, check availability 
      var n = 1;
      while (isOutOfStock) {
        console.log('\nProduct is OUT OF STOCK'.red);

        await page.reload();
        console.log('\nRefreshed Page..'.yellow);

        // Check if current store has listing 
        await page.waitForSelector(utils.selectors.get('outOfStock_selector'));
        const stocks = await page.$eval(utils.selectors.get('outOfStock_selector'), (element) => { return element.innerHTML });
        isOutOfStock = stocks.includes('Sold Out');

        console.log('isOutOfStock: ' + `${isOutOfStock}`.red);
        await page.screenshot({ path: `${myInfo.snapShotPath}refreshStore_${n++}.png` });
      }
      console.log('\nListing is in stock !!'.bgCyan);

      // Add listing to cart
      console.log('\n[2/4] .. Adding item to cart ..'.bgCyan);
      await addToCart(page);

      // Navigate to cart
      console.log('\n[3/4] .. Navigating to cart ..'.bgCyan);
      const cartURL = 'https://secure.newegg.com/shop/cart';
      await page.goto(cartURL);
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${myInfo.snapShotPath}+nav_to_cart.png` });

      //Checkout listing
      console.log('\n[4/4] .. Checking out cart ..'.bgCyan);
      await page.waitForTimeout(500);
      await taskHandler.checkoutCart(page);

      // Ctrl+C && Celebrate
      console.log('\nDone. Goteee boiiis!!! \n'.rainbow);
      console.log('\nCtrl+C && Celebrate \n'.bgRed);

      // Done
      await page.goto('https://www.tenor.com/view/done-and-done-ron-swanson-gotchu-gif-10843254', { waitUntil: 'networkidle2' });
      amountOrdered++;
    } catch (error) {
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
      console.log('\n' + error);
      continue;
    }
  }
  await page.waitForTimeout(15000);
  await browser.close();
})();