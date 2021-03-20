const Spinner = require("cli-spinner");
const colors = require("colors");
const myInfo = require("./myInfo");
const utils = require("./utils");

async function logIn(page) {
  await page.waitForTimeout(1000);
  // Navigate to login page
  let signingText;
  let isSignedout;

  //signingText = await page.$eval("singin_selector_1", (el) => {return el.innerText});
  //isSignedout = signingText.includes("MY ACCOUNT");
  //console.log("signingText: " + signingText);
  //console.log("isSignedout: " + isSignedout);

  //while (isSignedout) {
    /* await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    await page.goto('https://www.gamestop.com/checkout/login/', { waitUntil: 'networkidle2' });
    console.log('Navigating to signin ..'.yellow); */

    /* await page.$eval(utils.selectors.get("singin_selector_1"), (el) =>
      el.click()
    );
    await page.$eval(utils.selectors.get("singin_selector_2"), (el) =>
      el.click()
    ); */
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_page.png` });

    // Enter login credentials & signin
    //email
    console.log("Signing in ..".yellow);
    await page.$eval(utils.selectors.get("email_selector"), (el) => el.click());
    await page.type(utils.selectors.get("email_selector"), myInfo.myemail);

    //password
    await page.$eval(utils.selectors.get("password_selector"), (el) =>el.click());
    await page.type(utils.selectors.get("password_selector"), myInfo.mypassw);

    //submit
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_submit.png` });
    await page.$eval(utils.selectors.get("singin_selector_3"), (el) =>el.click());

    /* await page.waitForSelector(utils.selectors.get("singin_selector_1"));
    await page.waitForTimeout(400); // Allow text to load
    signingText = await page.$eval(utils.selectors.get("singin_selector_1"), 
    (el) => {return el.innerText});
    isSignedout = signingText.includes("MY ACCOUNT");

    console.log("signingText: " + signingText);
    console.log("isSignedout: " + isSignedout); */
  //}

  await page.waitForTimeout(1000);
  console.log("Signed in succesfully ..".yellow);
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_success.png` });
}

async function findListing(page) {
  let stocks;
  let isOutOfStock;

  for (let i = 0; i < 5; i++) {
    /* await page.$eval(utils.selectors.get("change_store_selector"), (el) =>el.click());
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${myInfo.snapShotPath}+find_store1.png` }); */

    await page.$eval(utils.selectors.get("zip_input_selector"), (el) => el.click());
    await page.type(utils.selectors.get("zip_input_selector"), myInfo.myloc);
    await page.$eval(utils.selectors.get("lookup_bttn_selector"), (el) => el.click());
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${myInfo.snapShotPath}+find_store2.png` });

    let bttns = await page.$$(utils.selectors.get("pick_store_selector"));
    await bttns[i].click();
    await page.waitForTimeout(500);
    await page.screenshot({path: `${myInfo.snapShotPath}_change_store_${i}.png`});
    console.log("\nSwitched Stores".yellow);

    // Check if current store has listing
    stocks = await page.$eval(utils.selectors.get("pickUp_bttn_selector"),
      (element) => {
        return element.innerHTML;
      }
    );
    isOutOfStock = stocks.includes('Not Available');
    console.log("isOutOfStock: " + `${isOutOfStock}`.red);

    // Stop switching stores if listing is found
    if (isOutOfStock != true) {
      break;
    }
  }
  return isOutOfStock;
}

async function checkoutCart(page) {
  await page.$eval(utils.selectors.get("chekout_bttn_selector_1"), (el) =>
    el.click()
  );
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_process1.png` });

  // Signing in
  await logIn(page);

  await page.waitForSelector(utils.selectors.get("chekout_bttn_selector_2"));
  await page.$eval(utils.selectors.get("chekout_bttn_selector_2"), (el) => el.click());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_process2.png` });

  await page.waitForSelector(utils.selectors.get("chekout_bttn_selector_3"));
  if ((await page.$(utils.selectors.get("cvv_bttn_selector"))) !== null) {
    await page.waitForTimeout(500);
    await page.$eval(utils.selectors.get("cvv_bttn_selector"), (el) =>
      el.click()
    );
    await page.type(utils.selectors.get("cvv_bttn_selector"), myInfo.mycvv);
    await page.screenshot({ path: `${myInfo.snapShotPath}+cvv_added.png` });
    await page.$eval(utils.selectors.get("chekout_bttn_selector_3"), (el) => el.click());
  }

  // Checkout = 'Moment of truth..';
  await page.waitForSelector(utils.selectors.get("place_order_selector"));
  await page.focus(utils.selectors.get("place_order_selector"));
  //SKIP IF RUNNING TEST
  if (`${process.env.USER_ENV}` == "userInfo" ) {
    await page.keyboard.press('Enter');
  }
  await page.waitForTimeout(7000);
  await page.screenshot({ path: `${myInfo.snapShotPath}+result_page.png` });
}

module.exports = {
  logIn,
  findListing,
  checkoutCart,
};
