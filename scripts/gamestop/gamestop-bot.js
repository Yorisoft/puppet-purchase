const taskHandler = require('./taskHandler');
const myInfo = require('./myInfo');
const utils = require('./utils');
const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');

async function addToCart(page) {
  await page.waitForSelector(utils.selectors.get("pickUp_bttn_selector"));
  await page.focus(utils.selectors.get("pickUp_bttn_selector"));
  await page.waitForSelector(utils.selectors.get("cart_inventory_selector"));
  let oldItemCount = await page.$eval(utils.selectors.get('cart_inventory_selector'),
  (element) => {return element.innerText});

  // It takes a reload and 6 keyboard presses to get the item to be added to cart for some reason
  while (!oldItemCount.includes('1')){
    console.log(oldItemCount);
    await page.waitForSelector(utils.selectors.get("pickUp_bttn_selector"));
    await page.focus(utils.selectors.get("pickUp_bttn_selector"));
    await page.keyboard.press('Enter');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(3000);
    
    //await page.reload();
    await page.waitForSelector(utils.selectors.get("cart_inventory_selector"));
    oldItemCount = await page.$eval(utils.selectors.get('cart_inventory_selector'),(element) => {return element.innerText});
  }

  console.log('Item added to cart ..');
  await page.screenshot({ path: `${myInfo.snapShotPath}+added_to_cart.png` });

}

async function gamestopBot() {
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
    headless: isHeadless,
    args: launcherArgs,
    //executablePath: '/usr/bin/chromium-browser'
  });

  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
  await page.goto('https://www.gamestop.com/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

  // TESTING - Comment out when done.
  // await cleanUpAccount(page);
  // For cleaning up account/pause program - usefull for test setup
  // await page.waitForTimeout(9000000);

  // Navigate to listing & add to cart
  let amountOrdered = 0;
  while (amountOrdered < 1) {
    try {
      console.log('\n[1/4] .. Navigating to listing page ..'.bgBlue);
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      await page.goto(myInfo.listingURL, { waitUntil: 'networkidle2' });
      console.log(`${myInfo.listingURL}`);
      await page.screenshot({ path: `${myInfo.snapShotPath}+listing_page.png` });

      // Checking to see if listing is out of stock
      let stocks = await page.$eval(utils.selectors.get('pickUp_bttn_selector'), (element) => { return element.innerHTML });
      let isOutOfStock = stocks.includes('Not Available');
      console.log('isOutOfStock: ' + `${isOutOfStock}`.red);

      // While listing is out of stock: Change store, check availability 
      let testRuns = 0;
      while (isOutOfStock) {
        console.log('\nProduct is OUT OF STOCK'.red);

        const npage = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
        await npage.goto("https://www.gamestop.com/stores/", { waitUntil: 'networkidle2' });
        await npage.screenshot({path: `${myInfo.snapShotPath}+store_locator.png`});

        isOutOfStock = await taskHandler.findListing(npage);
        await npage.close();

        if((`${process.env.USER_ENV}` == 'testUserInfo' && testRuns == 1)){
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
      const cartURL = 'https://www.gamestop.com/cart/';
      await page.goto(cartURL, { waitUntil: 'networkidle2' });
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

gamestopBot();