const Spinner = require("cli-spinner");
const colors = require("colors");
const myInfo = require("./myInfo");
const utils = require("./utils");

function getNewPageWhenLoaded(browser) {
  return new Promise((x) => browser.once('targetcreated', async (target) => {
    let newPage = await target.page();
    let newPagePromise = new Promise(() => newPage.once('domcontentloaded', () => x(newPage)));
    let isPageLoaded = await newPage.evaluate(() => document.readyState);
    return isPageLoaded.match('complete|interactive') ? x(newPage) : newPagePromise;
  }));
}

async function logIn(browser, page) {
  // Navigate to login page
  let signingText;
  let isSignedout;

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
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    await page.goto('https://account.microcenter.com/Login.aspx', { waitUntil: 'networkidle2' });
    console.log('Signing in ..'.yellow);

    
    let newPagePromise = getNewPageWhenLoaded(browser);
    await page.$eval(utils.selectors.get("google_signin_selector"), (el) => el.click());
    let newPage = await newPagePromise;
    await newPage.screenshot({ path: `${myInfo.snapShotPath}+google_signin_selector.png` });

    // Enter login credentials & signin
    await newPage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    //email
    await newPage.$eval(utils.selectors.get('inbox_email_selector'), (el) => el.click());
    await newPage.type(utils.selectors.get('inbox_email_selector'), myInfo.myemail, {delay: 100});
    await newPage.$eval(utils.selectors.get('singin_selector_2'), (el) => el.click());

    //password
    await newPage.waitForTimeout(3400);
    await newPage.$eval(utils.selectors.get('inbox_password_selector'), (el) => el.click());
    await newPage.type(utils.selectors.get('inbox_password_selector'), myInfo.myInboxPass, {delay: 100});
    await newPage.screenshot({ path: `${myInfo.snapShotPath}+inbox_signin.png` });
    await newPage.$eval(utils.selectors.get('singin_selector_3'), (el) => el.click());
    await newPage.waitForTimeout(4000);
    //submit
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_result.png` });
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

  // Input phone if required..
  // Users should have that filled on their online accounts
  // Not going to program for this step

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
