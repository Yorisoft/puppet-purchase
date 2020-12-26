const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');
const myInfo = require('./myInfo');

async function getSecutiryCode() {
  let securityCode;
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: [`--window-size=500,500`],
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });

  // Navigate to email.
  const page = await browser.newPage();
  await page.goto('https://www.gmail.com', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

  const securityCode_selector = 'html body div div div div div div div div div div div div div div div div table tr td div div div div div div div div div div div div div div div table tbody tr td div div div strong';
  const inbox_selector = 'html body div div div div div div div div div div div div div div div div div div div div div table tbody tr';
  const singin_selector = 'button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc';
  const email_selector = 'input#identifierId.whsOnd.zHQkBf';
  const password_selector = 'input.whsOnd.zHQkBf';

  // Enter login credentials & signin
  // Email
  await page.$eval(email_selector, (el) => el.click());
  await page.type(email_selector, myInfo.myInboxEmail);
  await page.$eval(singin_selector, (el) => el.click());
  await page.screenshot({ path: `${myInfo.snapShotPath}+inboxEmail.png` });

  // Password
  await page.waitForTimeout(4000);
  await page.$eval(password_selector, (el) => el.click());
  await page.type(password_selector, myInfo.myInboxPass);
  await page.$eval(singin_selector, (el) => el.click());
  await page.screenshot({ path: `${myInfo.snapShotPath}+inboxPass.png` });

  await page.waitForTimeout(10000);
  await page.reload({ waitUntil: 'networkidle2' });

  // Select email
  await page.waitForSelector(inbox_selector);
  await page.$eval(inbox_selector, (el) => el.click());

  await page.waitForSelector(securityCode_selector);
  securityCode = await page.$eval(securityCode_selector, (element) => { return element.innerHTML });
  await page.screenshot({ path: `${myInfo.snapShotPath}+securityCode.png` });

  browser.close();

  console.log(securityCode);
  return securityCode;
}

async function logIn(page) {
  // LOGIN
  const email_selector = 'input#labeled-input-signEmail';
  const securitCode_selector = 'div.form-v-code input';
  const singin_selector_1 = 'button#signInSubmit.btn.btn-orange';

  // Navigate to login page 
  console.log('Signing in ..'.yellow);
  await page.waitForSelector('div.nav-complex-title');
  await page.$eval('div.nav-complex-title', (el) => el.click());

  // Enter login credentials & signin
  //email
  await page.waitForSelector(email_selector);
  await page.$eval(email_selector, (el) => el.click());
  await page.type(email_selector, myInfo.myemail);
  //submit
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_submit.png` });
  await page.waitForTimeout(500);
  await page.$eval(singin_selector_1, (el) => el.click());

  // Getting security code
  const securityCode = await getSecutiryCode();

  //security code
  await page.waitForSelector(securitCode_selector);
  await page.$eval(securitCode_selector, (el) => el.click());
  await page.type(securitCode_selector, securityCode, { delay: 100 });
  //submit
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_submit.png` });
  await page.$eval(singin_selector_1, (el) => el.click());

  await page.waitForTimeout(1000);
  console.log('Signed in succesfully ..'.yellow);
  await page.screenshot({ path: `${myInfo.snapShotPath}+login_success.png` });
}

async function checkoutCart(page) {
  const chekout_bttn_selector_1 = 'button.btn.btn-primary.btn-wide';
  await page.waitForSelector(chekout_bttn_selector_1);
  await page.$eval(chekout_bttn_selector_1, (el) => el.click());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_start.png` });

  const checkout_bttns = 'button.btn.btn-primary.checkout-step-action-done.layout-quarter';
  await page.waitForSelector(checkout_bttns);
  
  //shipping
  let bttns = await page.$$(checkout_bttns);
  await page.focus(checkout_bttns);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_shipping.png` });

  //delivery
  await page.waitForSelector(checkout_bttns);
  await page.focus(checkout_bttns);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_shipping.png` });

  // Input credit-card  cvv
  await page.waitForTimeout(1000);
  const cvv_bttn_selector = 'input.form-text.mask-cvv-4';
  if (await page.$(cvv_bttn_selector) !== null){
    await page.$eval(cvv_bttn_selector, (el) => el.click());
    await page.type(cvv_bttn_selector, myInfo.mycvv);
    await page.screenshot({ path: `${myInfo.snapShotPath}+cvv_added.png` });
  }

  // Review
  await page.focus(checkout_bttns);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${myInfo.snapShotPath}+review_page.png` });

  // Checkout = 'Moment of truth..';
  const placeOrder_selector = 'button#btnCreditCard.btn.btn-primary.btn-wide';
  await page.focus(placeOrder_selector);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(10000);
  await page.screenshot({ path: `${myInfo.snapShotPath}+result_page.png` });
  
}

module.exports = {
  logIn,
  checkoutCart,
}