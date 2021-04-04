const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');
const myInfo = require('./myInfo');
const utils = require('./utils');

async function getSecutiryCode() {
  let securityCode;

  let launcherArgs;
  let pathToBrowser;
    if (process.env.USER_ENV === 'testUserInfo') {
      launcherArgs = ['--no-sandbox', '--deterministic-fetch', '--disable-setuid-sandbox', `--window-size=700,700`];
      pathToBrowser = process.env.PUPPETEER_EXEC_PATH;
    } else {
      launcherArgs = ['--no-sandbox', `--window-size=1025,1025`];
    }

  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
    args: launcherArgs,
    executablePath: pathToBrowser,
  });
  

  // Navigate to email.
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');
  await page.goto('https://www.gmail.com', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

  // Enter login credentials & signin
  // Email
  await page.$eval(utils.selectors.get('inbox_email_selector'), (el) => el.click());
  await page.type(utils.selectors.get('inbox_email_selector'), myInfo.myemail, { delay: 100 });
  await page.$eval(utils.selectors.get('inbox_singin_selector'), (el) => el.click());
  await page.screenshot({ path: `${myInfo.snapShotPath}+inboxEmail.png` });

  // Password
  await page.waitForTimeout(3000);
  await page.$eval(utils.selectors.get('inbox_password_selector'), (el) => el.click());
  await page.type(utils.selectors.get('inbox_password_selector'), myInfo.myInboxPass, { delay: 100 });
  await page.$eval(utils.selectors.get('inbox_singin_selector'), (el) => el.click());
  await page.screenshot({ path: `${myInfo.snapShotPath}+inboxPass.png` });

  await page.waitForTimeout({ waitUntil: 'networkidle2' });

  // Select email
  await page.waitForSelector(utils.selectors.get('inbox_selector'));
  await page.$eval(utils.selectors.get('inbox_selector'), (el) => el.click());

  await page.waitForSelector(utils.selectors.get('securityCode_selector'));
  await page.waitForTimeout(5000); // 5 seconds
  securityCode = await page.$eval(utils.selectors.get('securityCode_selector'), (element) => { return element.innerHTML });
  await page.screenshot({ path: `${myInfo.snapShotPath}+securityCode.png` });
  
  // Delete email
  if (`${process.env.USER_ENV}` == "testUserInfo" ) {
    await page.focus(utils.selectors.get('delete_email_selector'));
    await page.keyboard.press('Enter');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: `${myInfo.snapShotPath}+email_deleted.png` });
  }

  let pages = await browser.pages();
  await Promise.all(pages.map(page =>page.close()))
  await browser.close();

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
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_submit.png` });
  //submit
  await page.focus(utils.selectors.get('singin_selector_1'));
  await page.waitForTimeout(1500); // wait for domdocument to lead
  await page.keyboard.press('Enter');
  
  // Getting security code
  const securityCode = await getSecutiryCode();

  //security code
  await page.$eval(utils.selectors.get('securityCode_input_selector'), (el) => el.click());
  await page.type(utils.selectors.get('securityCode_input_selector'), securityCode, { delay: 100 });
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_submit.png` });
  //submit
  await page.$eval(utils.selectors.get('singin_selector_1'), (el) => el.click());
  await page.waitForTimeout(500);
  console.log('Signed in succesfully ..'.yellow);
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_success.png` });
}

async function checkoutCart(page) {
  //Begin Checkout
  await page.$eval(utils.selectors.get('chekout_bttn_selector_1'), (el) => el.click());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_start.png` });

  //shipping
  await page.waitForSelector(utils.selectors.get('checkout_bttns'));
  let bttns = await page.$$(utils.selectors.get('checkout_bttns'));
  await page.waitForTimeout(800);
  
  await bttns[0].click();
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_shipping.png` });
  console.log('Done w. shipping');

  //delivery
  await page.waitForTimeout(1000);
  await bttns[1].click();
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_shipping.png` });
  console.log('Done w. Delivery');

  // Input credit-card  cvv 
  await page.waitForTimeout(1000);
  if (await page.$(utils.selectors.get('cvv_bttn_selector')) !== null){
    await page.$eval(utils.selectors.get('cvv_bttn_selector'), (el) => el.click());
    await page.type(utils.selectors.get('cvv_bttn_selector'), myInfo.mycvv);
    await page.screenshot({ path: `${myInfo.snapShotPath}+cvv_added.png` });
  }
  // Review  card card-add-new
  await page.waitForTimeout(800);
  await bttns[2].click();
  await page.screenshot({ path: `${myInfo.snapShotPath}+review_page.png` });
  console.log('Done w. Review');

  let checkout = 'Moment of truth..';
  await page.waitForSelector(utils.selectors.get('placeOrder_selector'));
  await page.focus(utils.selectors.get('placeOrder_selector'));
  //SKIP IF RUNNING TEST
  if (`${process.env.USER_ENV}` == "userInfo" ) {
    await page.keyboard.press('Enter');
  }
  await page.waitForTimeout(7000);
  await page.screenshot({ path: `${myInfo.snapShotPath}+result_page.png` });
  console.log(checkout);
}

module.exports = {
  logIn,
  checkoutCart,
}