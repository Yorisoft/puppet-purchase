const taskHandler = require('./taskHandler');
const myInfo = require('./myInfo');
const utils = require('./utils');
const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');

async function addToCart(page) {
  await page.waitForTimeout(500);
  await page.$eval(utils.selectors.get('add_to_cart_selector'), (el) => el.click());

  console.log('Item added to cart ..');
  await page.screenshot({ path: `${myInfo.snapShotPath}+added_to_cart.png` });
}

async function microcenterBot() {
  // Spinner 
  var mySpinner = new Spinner.Spinner('processing.. %s');
  mySpinner.setSpinnerString('|/-\\');
  mySpinner.start();

  try {
    let launcherArgs;
    let pathToBrowser = process.env.PUPPETEER_EXEC_PATH;
    if (process.env.USER_ENV === 'testUserInfo') {
      launcherArgs = ['--no-sandbox', '--deterministic-fetch', `--window-size=750,750`];
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
    await page.goto('https://www.microcenter.com', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

    // Signing in
    await taskHandler.logIn(browser, page);

    // TESTING - Comment out when done.
    // await cleanUpAccount(page);
    // For cleaning up account/pause program - usefull for test setup
    // await page.waitForTimeout(9000000);

    // Navigate to listing & add to cart
    let amountOrdered = 0;
    while (amountOrdered < 1) {

      console.log('\n[1/4] .. Navigating to listing page ..'.bgBlue);
      console.log(`${myInfo.listingURL}`);
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      await page.goto(`${myInfo.listingURL}`, { waitUntil: 'networkidle2' });
      await page.screenshot({ path: `${myInfo.snapShotPath}+listing_page.png` });

      // Checking to see if listing is out of stock
      await page.waitForSelector(utils.selectors.get('inventory_count'));
      let stocks = await page.$eval(utils.selectors.get('inventory_count'), (element) => { return element.innerText });
      let isOutOfStock = stocks.includes("SOLD OUT");
      console.log('isOutOfStock: ' + `${isOutOfStock}`.red);

      // While listing is out of stock: Change store, check availability 
      let testRuns = 0;
      while (isOutOfStock) {
        console.log('\nOUT OF STOCK'.red);
        console.log('\nRefreshing Page..'.yellow);
        await page.reload();

        // Check if current store has listing 
        await page.waitForTimeout(500);
        await page.waitForSelector(utils.selectors.get('inventory_count'));
        inventoryText = await page.$eval(utils.selectors.get('inventory_count'), (element) => { return element.innerText });
        isOutOfStock = inventoryText.includes("SOLD OUT");

        if ((`${process.env.USER_ENV}` == 'testUserInfo') && (testRuns == 10)) {
          testRuns++;
          return;
        }
      }
      console.log('\nListing is in stock !!'.bgBlue);

      // Add listing to cart
      console.log('\n[2/4] .. Adding item to cart ..'.bgBlue);
      await page.waitForTimeout(500);
      await addToCart(page);

      // Navigate to cart
      console.log('\n[3/4] .. Navigating to cart ..'.bgBlue);
      const cartURL = 'https://cart.microcenter.com/cart.aspx';
      await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
      await page.goto(`${cartURL}`, { waitUntil: 'networkidle2' });
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
    }
    await page.waitForTimeout(7000);
    await page.close();
    await browser.close();
    await mySpinner.stop();
    await process.exit();
    return;
  } catch (error) {
    console.log('\n' + error);
    throw error;
  } finally {

  }
}


microcenterBot();