const myInfo = require('./myInfo');
const utils = require('./utils');
const colors = require('colors');

async function logIn(page) {
  try {
  // LOGIN
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
  await page.waitForSelector(utils.selectors.get('account_selector'));
  await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

  let list_items = await page.$eval(
    utils.selectors.get('account_selector'),
    (element) => {
      return element.innerText;
    }
  );
  let needsLogIn = list_items.includes('Account');

  // Navigate to login page
  while (needsLogIn) {
    console.log('Navigating to signin page ..'.yellow);
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
    await page.goto('https://www.bestbuy.com/signin');
    await page.waitForTimeout(700); // Avoid network slowdown

    // Enter login credentials & signin
    console.log('Signing in ..'.yellow);

    //email
    await page.waitForSelector(utils.selectors.get('email_selector'));
    await page.$eval(utils.selectors.get('email_selector'), (el) => el.click());
    await page.type(utils.selectors.get('email_selector'), `${myInfo.myemail}`, {delay: 150});

    //password
    await page.$eval(utils.selectors.get('password_selector'), (el) =>
      el.click()
    );
    await page.type(utils.selectors.get('password_selector'), `${myInfo.mypassw}`, {delay: 150});

    //submit
    await page.focus(utils.selectors.get('singin_selector'));
    await page.keyboard.press('Enter');
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_attempt.png` });

    await page.waitForTimeout(4000); // Time to load account username
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_attempt.png` });
    await page.waitForSelector(utils.selectors.get('account_selector'));
    list_items = await page.$eval(
      utils.selectors.get('account_selector'),
      (element) => {
        return element.innerText;
      }
    );
    needsLogIn = list_items.includes('Account');
  }
  console.log('Signed in succesfully ..'.yellow);
} catch (err) {
  console.log("\n" + err);
  throw err;
}
}

async function findListing(page, npage) {
  await npage.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');

  let stocks;
  let isInStock;
  let n = 1;

  try{
  await npage.waitForSelector(utils.selectors.get('zip_input_selector'));
  await npage.waitForSelector(utils.selectors.get('lookup_bttn_selector'));

  console.log('starting forloop');
  for (let i = 0; i < 5; i++) {
    await npage.$eval(utils.selectors.get('zip_input_selector'), (el) =>
      el.click()
    );
    await npage.type(utils.selectors.get('zip_input_selector'), myInfo.myloc);
    await npage.$eval(utils.selectors.get('lookup_bttn_selector'), (el) =>
      el.click()
    );
    await npage.waitForTimeout(300);
    await npage.screenshot({ path: `${myInfo.snapShotPath}+find_store2.png` });

    await npage.waitForSelector(utils.selectors.get('pick_store_selector'));
    let bttns = await npage.$$(utils.selectors.get('pick_store_selector'));
    await bttns[i].click();
    await npage.waitForTimeout(500);
    await npage.screenshot({
      path: `${myInfo.snapShotPath}_change_store_${n++}.png`,
    });
    console.log('\nSwitched Stores'.yellow);

    // Check if current store has listing
    await page.bringToFront();
    await page.reload();
    await page.waitForSelector(utils.selectors.get('pickUp_bttn_selector'));

    stocks = await page.$eval(
      utils.selectors.get('pickUp_bttn_selector'),
      (element) => {
        return element.innerHTML;
      }
    );
    isInStock = stocks.includes('Add');
    console.log('isInStock: ' + `${isInStock}`.red);

    let currentStore = await npage.$$('div.shop-location-card');
    let itemJsHandle = await currentStore[i + 1].getProperty('innerText');
    let storeText = await itemJsHandle.jsonValue();
    console.log('@ : ' + `${storeText}`.red);

    // Stop switching stores if listing is found
    if (isInStock = true) {
      break;
    }
  }
  return isInStock;
} catch(err){
  console.log("\n" + err);
  throw err;
}
}

async function checkoutCart(page) {
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
  
  try{
  await page.waitForSelector(utils.selectors.get('chekout_bttn_selector_1'));
  await page.focus(utils.selectors.get('chekout_bttn_selector_1'));
  await page.keyboard.press('Enter');

  await page.waitForTimeout(300);
  await page.screenshot({
    path: `${myInfo.snapShotPath}+checkout_started.png`,
  });

  page.evaluate(_ => {
    window.scrollBy(10, window.innerHeight);
  }); 
  
  // If proceed button is present, then click on it
  await page.waitForTimeout(1000);
  await page.waitForSelector('#checkoutApp > div.page-spinner.page-spinner--out > div:nth-child(1) > div.checkout.large-view.fast-track > main > div.checkout__container.checkout__container-fast-track > div.checkout__col.checkout__col--secondary.fast-track--align-top.anchor > section.order-summary.order-summary--inactive.order-summary__fast-track > div.order-summary__bd--fast-track > section > div > div.order-summary__total > div.order-summary__price > span');
  if (await page.$(utils.selectors.get('proceed_to_checkout')) !== null){
  await page.focus(utils.selectors.get('proceed_to_checkout'));
  await page.keyboard.press('Enter');
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_proceed.png` });
  }

  // Input credit-card  cvv
  await page.waitForSelector(utils.selectors.get('chekout_bttn_selector_2'));
  if (await page.$(utils.selectors.get('cvv_bttn_selector')) !== null){
    await page.focus(utils.selectors.get('cvv_bttn_selector'));
    await page.keyboard.press('Enter');
    await page.type(utils.selectors.get('cvv_bttn_selector'), `${myInfo.mycvv}`);
    await page.screenshot({ path: `${myInfo.snapShotPath}+cvv_added.png` });
  }
  
  //Moment of truth..
  await page.focus(utils.selectors.get('chekout_bttn_selector_2'));
  //SKIP IF RUNNING TEST
  if (`${process.env.USER_ENV}` == "userInfo" ) {
    await page.keyboard.press('Enter');
  }
  await page.waitForTimeout(7000);
  await page.screenshot({ path: `${myInfo.snapShotPath}+result_page.png` });
} catch(err){
  console.log("\n" + err);
  throw err;
}
}

module.exports = {
  logIn,
  findListing,
  checkoutCart,
};
