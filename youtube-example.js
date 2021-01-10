const myemail = '';   // Enter email. ex - const myemail = 'myEmail@email.com';
const mypassw = '';   // Enter password. ex - const mypassw = 'password';
let snapShotPath =    // ex, '/Users/me/Documents/<this_folder>/record/screen_shots/'
'../../record/screen_shots/' + 
  `${timeStamp}` +
  ".png";

const { time } = require("console");
const puppeteer = require("puppeteer");
var date = new Date();
var timeStamp = date.getTime();

let singin_selector_1 = '#button.style-scope.ytd-button-renderer.style-suggestive.size-small';
let singin_selector_2 = 'button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc';
let singin_selector_3 = 'button.VfPpkd-LgbsSe.VfPpkd-LgbsSe-OWXEXe-k8QpJ.VfPpkd-LgbsSe-OWXEXe-dgl2Hf.nCP5yc.AjY5Oe.DuMIQc.qIypjc.TrZEUc';
const email_selector = 'input#identifierId.whsOnd.zHQkBf';
const password_selector = 'input.whsOnd.zHQkBf';

(async () => {
  // Start of test: Launch and go to login website
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    //executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com', { waitUntil: "networkidle2" });

  const html = await page.evaluate(() => document.body.innerHTML);
  await page.screenshot({ path: snapShotPath });

  // LOGIN
  // Navigate to login page
  await page.$eval(singin_selector_1, (el) => el.click());
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: snapShotPath });

  // Enter login credentials & signin
  // Email
  await page.$eval(email_selector, (el) => el.click());
  await page.type(email_selector, myemail, {delay: 30}); 
  await page.$eval(singin_selector_2, (el) => el.click());
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: snapShotPath });

  //Password
  await page.$eval(password_selector, (el) => el.click());
  await page.waitForTimeout(700);
  await page.type(password_selector, mypassw, {delay: 30}); 
  await page.$eval(singin_selector_3, (el) => el.click());
  await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
  await page.screenshot({ path: snapShotPath });
  
  await browser.close();
})();