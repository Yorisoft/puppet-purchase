const myInfo = require('./myInfo');
const utils = require('./utils');
const colors = require('colors');

async function logIn(page) {
  // LOGIN
  await page.waitForSelector(utils.selectors.get('account_selector'));
  await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });
  
  await page.$eval(utils.selectors.get('account_selector'), (el) => el.click());
  let list_items = await page.$eval(
    utils.selectors.get('account_information_selector'),
    (element) => {
      return element.innerText;
    }
  );
  let needsLogIn = list_items.includes('Sign In');

  // Navigate to login page
  while (needsLogIn) {
    console.log('Navigating to signin page ..'.yellow);
    await page.goto('https://www.walmart.com/account/login');
    await page.waitForTimeout(700); // Avoid network slowdown

    // Enter login credentials & signin
    console.log('Signing in ..'.yellow);

    //email
    await page.waitForSelector(utils.selectors.get('email_selector'));
    await page.$eval(utils.selectors.get('email_selector'), (el) => el.click());
    await page.type(utils.selectors.get('email_selector'), myInfo.myemail, {delay: 150});

    //password
    await page.$eval(utils.selectors.get('password_selector'), (el) =>
      el.click()
    );
    await page.type(utils.selectors.get('password_selector'), myInfo.mypassw, {delay: 150});

    //submit
    await page.focus(utils.selectors.get('singin_selector'));
    await page.keyboard.press('Enter');
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_attempt.png` });
    await page.waitForTimeout(4000); // Time to load account username
    
    await page.goto('https://www.walmart.com', { waitUntil: "networkidle2" });

    await page.$eval(utils.selectors.get('account_selector'), (el) => el.click());
    list_items = await page.$eval(
      utils.selectors.get('account_information_selector'),
      (element) => {
        return element.innerText;
      }
    );
    needsLogIn = list_items.includes('Sign In');
  }
  console.log('Signed in succesfully ..'.yellow);
}

async function checkoutCart(page) {
  await page.focus(utils.selectors.get('chekout_bttn_selector_1'));
  await page.keyboard.press('Enter');
  await page.waitForTimeout(1000);
  
  // Delivery vs Pickup
  await page.screenshot({path: `${myInfo.snapShotPath}+checkout_delivery.png`});
  await page.waitForSelector(utils.selectors.get('chekout_bttn_selector_2'));
  await page.focus(utils.selectors.get('chekout_bttn_selector_2'));
  await page.keyboard.press('Enter');

  // Confirm Address
  await page.screenshot({path: `${myInfo.snapShotPath}+checkout_address.png`});
  await page.waitForSelector(utils.selectors.get('chekout_bttn_selector_3'));
  await page.focus(utils.selectors.get('chekout_bttn_selector_3'));
  await page.keyboard.press('Enter');

  // Input credit-card  cvv
  await page.waitForSelector(utils.selectors.get('review_bttn_selector'));
  if (await page.$(utils.selectors.get('cvv_input_selector')) !== null){
    await page.focus(utils.selectors.get('cvv_input_selector'));
    await page.keyboard.press('Enter');
    await page.type(utils.selectors.get('cvv_input_selector'), myInfo.mycvv);

    await page.focus(utils.selectors.get('review_bttn_selector'));
    await page.keyboard.press('Enter');
    await page.screenshot({ path: `${myInfo.snapShotPath}+cvv_added.png` });
  }
  
  //Moment of truth..
  await page.waitForSelector(utils.selectors.get('place_order_bttn_selector'));
  await page.focus(utils.selectors.get('place_order_bttn_selector'));
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
