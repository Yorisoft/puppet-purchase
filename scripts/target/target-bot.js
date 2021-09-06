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
  await page.screenshot({ path: `${myInfo.snapShotPath}+added_to_cart.png` });
}

async function targetBot() {
  // Spinner 
  var mySpinner = new Spinner.Spinner('processing.. %s');
  mySpinner.setSpinnerString('|/-\\');
  mySpinner.start();

  try {
    let launcherArgs;
    let pathToBrowser;
    if (process.env.USER_ENV === 'testUserInfo') {
      launcherArgs = ['--no-sandbox', '--deterministic-fetch', '--disable-setuid-sandbox', `--window-size=1025,1025`];
      pathToBrowser = process.env.PUPPETEER_EXEC_PATH;
    } else {
      launcherArgs = ['--no-sandbox', `--window-size=1025,1025`];
    }

    // Start of test: Launch and go to login website
    const browser = await puppeteer.launch({
      defaultViewport: null,
      headless: false, // not sure about running headless.. Bot detection.
      args: launcherArgs,
      executablePath: pathToBrowser,
    });

    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    await page.goto('https://www.target.com', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

    // Signing in
    await taskHandler.logIn(page);

    // TESTING - Comment out when done.
    // await cleanUpAccount(page);
    // For cleaning up account/pause program - usefull for test setup
    // await page.waitForTimeout(9000000);

    // Navigate to listing & add to cart
    let amountOrdered = 0;
    while (amountOrdered < 1) {

      console.log('\n[1/4] .. Navigating to listing page ..'.bgBlue);
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      await page.goto(`${myInfo.listingURL}`, { waitUntil: 'networkidle2' });
      console.log(`${myInfo.listingURL}`);
      await page.screenshot({ path: `${myInfo.snapShotPath}+listing_page.png` });

      // Checking to see if listing is out of stock
      let stocks = await page.$eval( utils.selectors.get("pickUp_bttn_selector"), (element) => { return element.innerHTML });
      let isOutOfStock = stocks.includes('Out of stock');
      console.log('isOutOfStock: ' + `${isOutOfStock}`.red);

      // While listing is out of stock: Change store, check availability 
      let testRuns = 0;
      while (isOutOfStock) {
        console.log('\nProduct is OUT OF STOCK'.red);
        isOutOfStock = await taskHandler.findListing(page);

        if ((`${process.env.USER_ENV}` == 'testUserInfo' && testRuns == 1)) {
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
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      await page.goto(`${cartURL}`);
      await page.waitForTimeout(4000);
      await page.screenshot({ path: `${myInfo.snapShotPath}+nav_to_cart.png` });

      //Checkout listing
      console.log('\n[4/4] .. Checking out cart ..'.bgBlue);
      await page.waitForTimeout(500);
      await taskHandler.checkoutCart(page);

      // Ctrl+C && Celebrate
      console.log('\nDone. Goteee boiiis!!! \n'.rainbow);
      console.log('\nCtrl+C && Celebrate \n'.bgRed);

      // Done
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      await page.goto('https://www.tenor.com/view/done-and-done-ron-swanson-gotchu-gif-10843254', { waitUntil: 'networkidle2' });
      amountOrdered++;
    }
    await page.waitForTimeout(7000);
    await page.close();
    await browser.close();
    await mySpinner.stop();
  } 
  catch (err) {
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser

    console.log('\n' + err);
    throw err;
  } 
  finally {
    
    return;
  }
}

targetBot();