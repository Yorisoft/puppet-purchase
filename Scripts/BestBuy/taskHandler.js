const myInfo = require("./myInfo");
const utils = require("./utils");
const colors = require("colors");

async function logIn(page) {
  // LOGIN
  await page.waitForSelector(utils.selectors.get("account_selector"));
  await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

  let list_items = await page.$eval(
    utils.selectors.get("account_selector"),
    (element) => {
      return element.innerText;
    }
  );
  let needsLogIn = list_items.includes("Account");

  // Navigate to login page
  while (needsLogIn) {
    console.log("Navigating to signin page ..".yellow);
    await page.goto("https://www.bestbuy.com/signin");
    await page.waitForTimeout(500); // Avoid network slowdown

    // Enter login credentials & signin
    console.log("Signing in ..".yellow);
    //email
    await page.waitForSelector(utils.selectors.get("email_selector"));
    await page.$eval(utils.selectors.get("email_selector"), (el) => el.click());
    await page.type(utils.selectors.get("email_selector"), myInfo.myemail);

    //password
    await page.$eval(utils.selectors.get("password_selector"), (el) =>
      el.click()
    );
    await page.type(utils.selectors.get("password_selector"), myInfo.mypassw);

    //submit
    await page.focus(utils.selectors.get("singin_selector"));
    await page.keyboard.press('Enter');
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_attempt.png` });

    await page.waitForSelector(utils.selectors.get("account_selector"));
    await page.waitForTimeout(500); // Time to load account username
    list_items = await page.$eval(
      utils.selectors.get("account_selector"),
      (element) => {
        return element.innerText;
      }
    );
    needsLogIn = list_items.includes("Account");
  }
  console.log("Signed in succesfully ..".yellow);
}

async function findListing(page, npage) {
  let stocks;
  let isOutOfStock;
  var n = 1;

  await npage.waitForSelector(utils.selectors.get("zip_input_selector"));
  await npage.waitForSelector(utils.selectors.get("lookup_bttn_selector"));

  for (let i = 0; i < 5; i++) {
    await npage.$$(utils.selectors.get("zip_input_selector"), (el) =>
      el.click()
    );
    await npage.type(utils.selectors.get("zip_input_selector"), myInfo.myloc);
    await npage.$eval(utils.selectors.get("lookup_bttn_selector"), (el) =>
      el.click()
    );
    await npage.waitForTimeout(300);
    await npage.screenshot({ path: `${myInfo.snapShotPath}+find_store2.png` });

    await npage.waitForSelector(utils.selectors.get("pick_store_selector"));
    let bttns = await npage.$$(utils.selectors.get("pick_store_selector"));
    await bttns[i].click();
    await npage.waitForTimeout(500);
    await npage.screenshot({
      path: `${myInfo.snapShotPath}_change_store_${n++}.png`,
    });
    console.log("\nSwitched Stores".yellow);

    // Check if current store has listing
    await page.bringToFront();
    await page.reload();
    await page.waitForSelector(utils.selectors.get("pickUp_bttn_selector"));

    stocks = await page.$eval(
      utils.selectors.get("pickUp_bttn_selector"),
      (element) => {
        return element.innerHTML;
      }
    );
    isOutOfStock = stocks.includes("Sold Out");
    console.log("isOutOfStock: " + `${isOutOfStock}`.red);

    let currentStore = await npage.$$("div.shop-location-card");
    let itemJsHandle = await currentStore[i + 1].getProperty("innerText");
    let storeText = await itemJsHandle.jsonValue();
    console.log("@ : " + `${storeText}`.red);

    // Stop switching stores if listing is found
    if (isOutOfStock != true) {
      break;
    }
  }
  if (isOutOfStock != true) {
    return isOutOfStock;
  }
  return isOutOfStock;
}

async function checkoutCart(page) {
  await page.waitForSelector(utils.selectors.get("chekout_bttn_selector_1"));
  await page.focus(utils.selectors.get("chekout_bttn_selector_1"));
  await page.keyboard.press('Enter');

  await page.waitForTimeout(300);
  await page.screenshot({
    path: `${myInfo.snapShotPath}+checkout_started.png`,
  });

  // Input credit-card  cvv
  await page.waitForSelector(utils.selectors.get("chekout_bttn_selector_2"));
  if (await page.$(utils.selectors.get('cvv_bttn_selector')) !== null){
    await page.focus(utils.selectors.get("cvv_bttn_selector"));
    await page.keyboard.press('Enter');
    await page.type(utils.selectors.get("cvv_bttn_selector"), myInfo.mycvv);
    await page.screenshot({ path: `${myInfo.snapShotPath}+cvv_added.png` });
  }
  
  //Moment of truth..
  await page.focus(utils.selectors.get("chekout_bttn_selector_2"));
  //await page.keyboard.press('Enter');
  await page.waitForTimeout(100000);
  await page.screenshot({ path: `${myInfo.snapShotPath}+result_page.png` });
}

module.exports = {
  logIn,
  findListing,
  checkoutCart,
};
