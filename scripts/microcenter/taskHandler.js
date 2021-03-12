const Spinner = require("cli-spinner");
const colors = require("colors");
const myInfo = require("./myInfo");
const utils = require("./utils");

async function logIn(page) {
  // Navigate to login page
  let signingText;
  let isSignedout;

  console.log("Navigating to signin page ..".yellow);
  await page.waitForSelector(utils.selectors.get("singin_selector_1"));
  signingText = await page.$eval(utils.selectors.get("singin_selector_1"),
    (el) => {
      return el.innerText;
    }
  );
  isSignedout = signingText.includes("Sign in");
  console.log("signingText: " + signingText);
  console.log("isSignedout: " + isSignedout);

  while (isSignedout) {
    console.log('Navigating to signin page ..'.yellow);
    await page.goto('https://account.microcenter.com/Login.aspx', { waitUntil: 'networkidle2' });

    // Enter login credentials & signin
    console.log('Signing in ..'.yellow);

    //email
    await page.waitForSelector(utils.selectors.get('email_selector'));
    await page.$eval(utils.selectors.get("email_selector"), (el) => el.click());
    await page.type(utils.selectors.get("email_selector"), myInfo.myemail);

    //password
    await page.$eval(utils.selectors.get("password_selector"), (el) =>
      el.click()
    );
    await page.type(utils.selectors.get("password_selector"), myInfo.mypassw);

    //submit
    // Giving the user time to complete captcha if necessary.
    await page.waitForTimeout(40000);

    /* await page.waitForTimeout(2000);
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_submit.png` });
    await page.$eval(utils.selectors.get("singin_selector_2"), (el) =>
      el.click()
    ); */

    await page.waitForSelector(utils.selectors.get("singin_selector_1"));
    await page.waitForTimeout(700); // Give time for inner text to show up
    signingText = await page.$eval(utils.selectors.get("singin_selector_1"),
      (el) => {
        return el.innerText;
      }
    );
    isSignedout = signingText.includes("Sign in");

    console.log("signingText: " + signingText);
    console.log("isSignedout: " + isSignedout);
  }

  await page.waitForTimeout(1000);
  console.log("Signed in succesfully ..".yellow);
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_success.png` });
}

async function checkoutCart(page) {
  await page.$eval(utils.selectors.get("chekout_bttn_selector_1"), (el) =>
    el.click()
  );
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_arrive.png` });

  // Input credit-card  cvv
  await page.waitForSelector(utils.selectors.get("chekout_bttn_selector_2"));
  if ((await page.$(utils.selectors.get("cvv_bttn_selector"))) !== null) {
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

module.exports = {
  logIn,
  checkoutCart,
};
