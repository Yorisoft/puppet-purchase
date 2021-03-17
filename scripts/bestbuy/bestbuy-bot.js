const utils = require("./utils");
const myInfo = require("./myInfo");
const taskHandler = require("./taskHandler");
const Spinner = require("cli-spinner");
const puppeteer = require("puppeteer");
const colors = require("colors");

async function addToCart(page) {
  await page.waitForSelector(utils.selectors.get("add_cart_bttn_selector"));
  await page.focus(utils.selectors.get("add_cart_bttn_selector"));
  await page.keyboard.press("Enter");
  console.log("Item added to cart ..");

  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+added_to_cart.png` });
}

async function bestbuyBot() {
  // Spinner
  var mySpinner = new Spinner.Spinner("processing.. %s");
  mySpinner.setSpinnerString("|/-\\");
  mySpinner.start();

  // Start of test: Launch and go to login website
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ['--no-sandbox', `--window-size=1025,1025`],
    //executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.goto("https://www.bestbuy.com", { waitUntil: "networkidle2" });
  await taskHandler.logIn(page);

  // TESTING - Comment out when done.
  // For cleaning up account/pause program - usefull for test setup
  // await page.waitForTimeout(9000000);

  // Navigate to Sony PS5 listing & add to cart
  let amountOrdered = 0;
  while (amountOrdered < 1) {
    try {
      console.log("\n[1/4] .. Navigating to listing page ..".bgBlue);
      await page.goto(myInfo.listingURL);
      console.log(`${myInfo.listingURL}`)
      await page.screenshot({
        path: `${myInfo.snapShotPath}+listing_page.png`,
      });

      // Checking to see if listing is out of stock
      await page.waitForSelector(utils.selectors.get("pickUp_bttn_selector"));
      let stocks = await page.$eval(
        utils.selectors.get("pickUp_bttn_selector"),
        (element) => {
          return element.innerHTML;
        }
      );
      let isOutOfStock = stocks.includes("Sold Out");
      let testRuns = 0;
      while (isOutOfStock) {
        console.log("\nProduct is OUT OF STOCK".red);

        const npage = await browser.newPage();
        await npage.goto("https://www.bestbuy.com/site/store-locator/");
        await page.waitForTimeout(500);
        await npage.screenshot({
          path: `${myInfo.snapShotPath}+store_locator.png`,
        });

        isOutOfStock = await taskHandler.findListing(page, npage);
        await npage.close();

        //EXIT IF RUNNING TEST
        if ((`${process.env.USER_ENV}` == "testUserInfo" && testRuns == 1)) {
          return;
        }
        testRuns++;
      }
      console.log("\nListing is in stock !!".bgBlue);

      // Add listing to cart
      console.log("\n[2/4] .. Adding item to cart ..".bgBlue);
      await addToCart(page);

      // Navigate to cart
      console.log("\n[3/4] .. Navigating to cart ..".bgBlue);
      const cartURL = "https://www.bestbuy.com/cart";
      await page.goto(cartURL);
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${myInfo.snapShotPath}+nav_to_cart.png` });

      //Checkout listing
      console.log("\n[4/4] .. Checking out cart ..".bgBlue);
      await taskHandler.checkoutCart(page);

      // Ctrl+C && Celebrate
      console.log("\nDone. Goteee boiiis!!! \n".rainbow);
      console.log("\nLook at account purchase history to verify \n".bgRed);

      // Done
      await page.goto(
        "https://www.tenor.com/view/done-and-done-ron-swanson-gotchu-gif-10843254",
        { waitUntil: "networkidle2" }
      );
      amountOrdered++;
    } 
    catch (error) {
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
      console.log("\n" + error);
    } 
    finally {
      await page.waitForTimeout(7000);
      await page.close();
      await browser.close();
      await mySpinner.stop();
      await process.exit(); 
      return;
    }
  }
}

bestbuyBot();
