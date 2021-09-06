const Spinner = require("cli-spinner");
const colors = require("colors");
const myInfo = require("./myInfo");
const utils = require("./utils");

async function logIn(page) {
  // Navigate to login page
  let signingText;
  let isSignedout;
  
  try {
    console.log("Navigating to signin page ..".yellow);
    await page.waitForSelector(utils.selectors.get("singin_selector_1"));
    signingText = await page.$eval(
      "span.styles__AccountName-sc-1kk0q5l-0.iQFCAn",
      (el) => {
        return el.innerText;
      }
    );
    isSignedout = signingText === "Sign in";
    console.log("signingText: " + signingText);
    console.log("isSignedout: " + isSignedout);

    while (isSignedout) {
      await page.$eval(utils.selectors.get("singin_selector_1"), (el) =>
        el.click()
      );
      await page.screenshot({ path: `${myInfo.snapShotPath}+login_page.png` });
      await page.$eval(utils.selectors.get("singin_selector_2"), (el) =>
        el.click()
      );
      await page.screenshot({ path: `${myInfo.snapShotPath}_login_page.png` });

      // Enter login credentials & signin
      //email
      console.log("Signing in ..".yellow);
      await page.$eval(utils.selectors.get("email_selector"), (el) => el.click());
      await page.type(utils.selectors.get("email_selector"), myInfo.myemail, { delay: 100 });

      //password
      await page.$eval(utils.selectors.get("password_selector"), (el) =>
        el.click()
      );
      await page.type(utils.selectors.get("password_selector"), myInfo.mypassw, { delay: 100 });

      //submit
      await page.screenshot({ path: `${myInfo.snapShotPath}+login_submit.png` });
      await page.$eval(utils.selectors.get("singin_selector_3"), (el) =>
        el.click()
      );

      await page.waitForTimeout(3000); // Allow text to load
      await page.screenshot({ path: `${myInfo.snapShotPath}+login_result.png` });

      await page.waitForSelector("#account > span.styles__AccountName-sc-1kk0q5l-0.iQFCAn");
      await page.waitForTimeout(400); // Allow text to load
      signingText = await page.$eval(
        "#account > span.styles__AccountName-sc-1kk0q5l-0.iQFCAn",
        (el) => {
          return el.innerText;
        }
      );
      isSignedout = signingText === "Sign in";

      console.log("signingText: " + signingText);
      console.log("isSignedout: " + isSignedout);
    }

    await page.waitForTimeout(1000);
    console.log("Signed in succesfully ..".yellow);
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_success.png` });
  } 
  catch(err) {
    console.log('\n' + err);
    throw err;
  }
}

async function findListing(page) {
  let stocks;
  let isOutOfStock;

  try {
  for (let i = 0; i < 5; i++) {
    await page.waitForSelector(utils.selectors.get("change_store_selector"));
    await page.$eval(utils.selectors.get("change_store_selector"), (el) =>
      el.click()
    );
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${myInfo.snapShotPath}+find_store1.png` });

    await page.$eval(utils.selectors.get("zip_input_selector"), (el) =>
      el.click()
    );
    await page.type(utils.selectors.get("zip_input_selector"), myInfo.myloc);
    await page.$eval(utils.selectors.get("lookup_bttn_selector"), (el) =>
      el.click()
    );
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${myInfo.snapShotPath}+find_store2.png` });

    let bttns = await page.$$(utils.selectors.get("pick_store_selector"));
    await bttns[i].click();
    await page.waitForTimeout(500);
    await page.screenshot({
      path: `${myInfo.snapShotPath}_change_store_${i}.png`,
    });
    console.log("\nSwitched Stores".yellow);

    // Check if current store has listing
    stocks = await page.$eval(
      utils.selectors.get("pickUp_bttn_selector"),
      (element) => {
        return element.innerHTML;
      }
    );
    isOutOfStock = stocks.includes("Out of stock");
    console.log("isOutOfStock: " + `${isOutOfStock}`.red);

    // Stop switching stores if listing is found
    if (isOutOfStock != true) {
      break;
    }
  }
  return isOutOfStock;
} catch(err){
  console.log('\n' + err);
  throw err;
}
}

async function checkoutCart(page) {
  try {
    await page.waitForSelector(utils.selectors.get("chekout_bttn_selector_1"));
    await page.$eval(utils.selectors.get("chekout_bttn_selector_1"), (el) =>
      el.click()
    );
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_arrive.png` });

    // Input credit-card  cvv
    await page.waitForSelector(utils.selectors.get("chekout_bttn_selector_2"));
    if ((await page.$(utils.selectors.get("cvv_bttn_selector"))) !== null) {
      await page.waitForTimeout(500);
      await page.$eval(utils.selectors.get("cvv_bttn_selector"), (el) =>
        el.click()
      );
      await page.type(utils.selectors.get("cvv_bttn_selector"), myInfo.mycvv);
      await page.screenshot({ path: `${myInfo.snapShotPath}+cvv_added.png` });
    }

    // Checkout = 'Moment of truth..';
    await page.focus(utils.selectors.get("chekout_bttn_selector_2"));
    //SKIP IF RUNNING TEST
    if (`${process.env.USER_ENV}` == "userInfo" ) {
      await page.keyboard.press('Enter');
    }
    await page.waitForTimeout(7000);
    await page.screenshot({ path: `${myInfo.snapShotPath}+result_page.png` });
  } 
  catch(err){
      console.log('\n' + err);
      throw err;
  }
}

module.exports = {
  logIn,
  findListing,
  checkoutCart,
};
