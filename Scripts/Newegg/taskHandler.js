const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');
const myInfo = require('./myInfo');
const utils = require('./utils');

async function getSecutiryCode() {
  let securityCode;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [`--window-size=700,700`],
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  // Navigate to email.
  const page = await browser.newPage();
  await page.goto('https://www.gmail.com', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

  // Enter login credentials & signin
  // Email
  await page.$eval(utils.selectors.get('inbox_email_selector'), (el) => el.click());
  await page.type(utils.selectors.get('inbox_email_selector'), myInfo.myemail);
  await page.$eval(utils.selectors.get('inbox_singin_selector'), (el) => el.click());
  await page.screenshot({ path: `${myInfo.snapShotPath}+inboxEmail.png` });

  // Password
  await page.waitForTimeout(4000);
  await page.$eval(utils.selectors.get('inbox_password_selector'), (el) => el.click());
  await page.type(utils.selectors.get('inbox_password_selector'), myInfo.myInboxPass);
  await page.$eval(utils.selectors.get('inbox_singin_selector'), (el) => el.click());
  await page.screenshot({ path: `${myInfo.snapShotPath}+inboxPass.png` });

  await page.waitForTimeout(10000);
  await page.reload({ waitUntil: 'networkidle2' });

  // Select email
  await page.waitForSelector(utils.selectors.get('inbox_selector'));
  await page.$eval(utils.selectors.get('inbox_selector'), (el) => el.click());

  await page.waitForSelector(utils.selectors.get('securityCode_selector'));
  securityCode = await page.$eval(utils.selectors.get('securityCode_selector'), (element) => { return element.innerHTML });
  await page.screenshot({ path: `${myInfo.snapShotPath}+securityCode.png` });

  browser.close();

  console.log('Security Code: ' + securityCode);
  return securityCode;
}

async function logIn(page) {
  // Navigate to login page 
  console.log('Signing in ..'.yellow);
  await page.waitForSelector('div.nav-complex-title');
  await page.$eval('div.nav-complex-title', (el) => el.click());

  // Enter login credentials & signin
  //email
  await page.waitForSelector(utils.selectors.get('email_selector'));
  await page.$eval(utils.selectors.get('email_selector'), (el) => el.click());
  await page.type(utils.selectors.get('email_selector'), myInfo.myemail);
  //submit
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_submit.png` });
  await page.waitForTimeout(500);
  await page.$eval(utils.selectors.get('singin_selector_1'), (el) => el.click());

  // Getting security code
  const securityCode = await getSecutiryCode();

  //security code
  await page.$eval(utils.selectors.get('securityCode_input_selector'), (el) => el.click());
  await page.type(utils.selectors.get('securityCode_input_selector'), securityCode, { delay: 100 });
  //submit
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_submit.png` });
  await page.$eval(utils.selectors.get('singin_selector_1'), (el) => el.click());

  await page.waitForTimeout(500);
  console.log('Signed in succesfully ..'.yellow);
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_success.png` });
}

async function checkoutCart(page) {
  //Begin Checkout
  await page.waitForSelector(utils.selectors.get('chekout_bttn_selector_1'));
  await page.$eval(utils.selectors.get('chekout_bttn_selector_1'), (el) => el.click());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_start.png` });

  //shipping
  await page.waitForSelector(utils.selectors.get('checkout_bttns'));
  let bttns = await page.$$(utils.selectors.get('checkout_bttns'));
  
  await bttns[0].click();
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_shipping.png` });
  await page.waitForTimeout(500);
  console.log('shipping');

  //delivery
  await bttns[1].click();
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_shipping.png` });
  await page.waitForTimeout(500);
  console.log('delivery');

  // Input credit-card  cvv
  if (await page.$(utils.selectors.get('cvv_bttn_selector')) !== null){
    await page.$eval(utils.selectors.get('cvv_bttn_selector'), (el) => el.click());
    await page.type(utils.selectors.get('cvv_bttn_selector'), myInfo.mycvv);
    await page.screenshot({ path: `${myInfo.snapShotPath}+cvv_added.png` });
  }
  // Review
  await bttns[2].click();
  await page.screenshot({ path: `${myInfo.snapShotPath}+review_page.png` });
  await page.waitForTimeout(500);
  console.log('Review');

  let checkout = 'Moment of truth..';
  //await page.focus(utils.selectors.get('placeOrder_selector'));
  //await page.keyboard.press('Enter');
  //await page.waitForTimeout(3000);
  //await page.screenshot({ path: `${myInfo.snapShotPath}+result_page.png` });
  console.log(checkout);
}

module.exports = {
  logIn,
  checkoutCart,
}