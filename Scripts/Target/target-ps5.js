const myemail = '';    // Enter email. ex - const myemail = 'myEmail@email.com';
const mypassw = '';    // Enter password. ex - const mypassw = 'password';
const myloc = ''; // Enter zip code. ex - const myloc = '01234';
const mycvv = '';    // Enter payment cvv. ex - const mycvv = '123';
let snapShotPath =  // ex, '/Users/me/Documents/<this_folder>/record/screen_shots/bestbuy'
  '/<path_to_project>/record/screen_shots/target/' + 
  `${timeStamp}`;

const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');
var date = new Date();
var timeStamp = date.getTime();
var n = 1;

async function logIn(page) {
  await page.waitForTimeout(500);
  // LOGIN
  // Navigate to login page
  console.log('Navigating to signin page ..'.yellow);
  const singin_selector_1 = 'a#account.Link-sc-1khjl8b-0.dJwaza.AccountLink-gx13jw-1.hoYfWX';
  const singin_selector_2 = 'div.Row-uds8za-0.kRWFss';
  await page.$eval(singin_selector_1, (el) => el.click());
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${snapShotPath}+login_page.png` });
  await page.$eval(singin_selector_2, (el) => el.click());
  await page.waitForTimeout(1000);

  // Enter login credentials & signin
  //email
  console.log('Signing in ..'.yellow);
  const email_selector = 'input#username.sc-iwsKbI.eAChmV.sc-kIPQKe.frLPpE';
  await page.$eval(email_selector, (el) => el.click());
  await page.type(email_selector, myemail);

  //password
  const password_selector = 'input#password.sc-iwsKbI.eAChmV.sc-kIPQKe.frLPpE';
  await page.$eval(password_selector, (el) => el.click());
  await page.type(password_selector, mypassw);

  //submit
  const singin_selector_3 = '#login.sc-VigVT.sc-hrWEMg.ipjqdX';
  await page.screenshot({ path: `${snapShotPath}+login_submit.png` });
  await page.$eval(singin_selector_3, (el) => el.click());


  await page.waitForTimeout(1000);
  console.log('Signed in succesfully ..'.yellow);
  await page.screenshot({ path: `${snapShotPath}+login_success.png` });
}
async function navigateToListing(page) {
  const listingURL = 'https://www.target.com/p/playstation-5-console/-/A-81114595#lnk=sametab';//'https://www.target.com/p/marvel-39-s-spider-man-miles-morales-launch-edition-8211-playstation-5/-/A-81255580';
  await page.goto(listingURL, { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${snapShotPath}+listing_page.png` });
}
async function findListing(page) {
  const change_store_selector = 'button#storeId-utilityNavBtn.Button-bwu3xu-0.StoreIdMessageComponent__StyledButton-vpf6s6-1.gUIqgH.dVwSut';
  const zip_input_selector = 'input#zipOrCityState';
  const pick_store_selector = 'button.Button-bwu3xu-0.jwSLus.h-text-sm';
  const lookup_bttn_selector = 'button.Button-bwu3xu-0.StoreLocationSearch__SearchButton-o3wd93-1.hfjCZR.eEaapM.h-padding-h-wide.h-padding-v-tight';
  const outOfStock_selector = 'div.styles__BaseWrapper-sc-11r1it6-0.joRrfH div div';

  let stocks;
  let isOutOfStock;

  let forLoopCounter = 0;
  for (let i = 0; i < 5; i++) {
    forLoopCounter++;
    console.log('forLoopCounter: ' + `${forLoopCounter}`.green);
    console.log('i: ' + ` ${i}`.blue);

    await page.$eval(change_store_selector, (el) => el.click());
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${snapShotPath}+find_store1.png` });

    await page.$eval(zip_input_selector, (el) => el.click());
    await page.type(zip_input_selector, myloc);
    await page.$eval(lookup_bttn_selector, (el) => el.click());
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${snapShotPath}+find_store2.png` });

    let bttns = await page.$$(pick_store_selector);
    await bttns[i].click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${snapShotPath}_change_store_${n++}.png` });
    console.log('\nSwitched Stores'.yellow);

    // Check if current store has listing 
    stocks = await page.$eval(outOfStock_selector, (element) => { return element.innerHTML });
    isOutOfStock = stocks.includes('Out of stock');
    console.log('isOutOfStock: ' + `${isOutOfStock}`.red);

    // Stop switching stores if listing is found
    if (isOutOfStock != true) {
      break;
    }
  }
  if (isOutOfStock != true) {
    return;
  }
  //Resetting test
  console.log('\nResetting Switch-store loop ..'.yellow);
  await page.$eval(change_store_selector, (el) => el.click());
  await page.waitForTimeout(500);
  await page.$eval(zip_input_selector, (el) => el.click());
  await page.type(zip_input_selector, myloc);
  await page.$eval(lookup_bttn_selector, (el) => el.click());
  await page.waitForTimeout(500);
  bttns = await page.$$(pick_store_selector);
  await bttns[0].click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${snapShotPath}+reset_store.png` });
  console.log('\nSwitch-store loop reset ..'.yellow);
}
async function addToCart(page) {
  const pickUp_bttn_selector = 'button.Button__ButtonWithStyles-y45r97-0.styles__StyledButton-sc-1f2lsll-0.eLsRDh.iyUhph';
  await page.$eval(pickUp_bttn_selector, (el) => el.click());
  console.log('Item added to cart ..');
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${snapShotPath}+added_to_cart.png` });
}
async function checkoutCart(page) {
  await page.waitForTimeout(500);
  const chekout_bttn_selector_1 = 'button.Button__ButtonWithStyles-y45r97-0.bAbouK';
  await page.$eval(chekout_bttn_selector_1, (el) => el.click());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${snapShotPath}+checkout_arrive.png` });

  // Input credit-card  cvv
  await page.waitForTimeout(2500)
  const cvv_bttn_selector = 'input#creditCardInput-cvv.Input__StyledInput-jjclbi-0.kzBXdW.ChosenPaymentCard__StyledCvvInput-sc-1jo5a44-0.gWpNiB';
  await page.$eval(cvv_bttn_selector, (el) => el.click());
  await page.type(cvv_bttn_selector, mycvv);
  await page.screenshot({ path: `${snapShotPath}+cvv_added.png` });

  // Checkout = 'Moment of truth..';
  const chekout_bttn_selector_2 = 'button.Button__ButtonWithStyles-y45r97-0.llFxzy';
  await page.$eval(chekout_bttn_selector_2, (el) => el.click());
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${snapShotPath}+result_page.png` });
}
async function cleanUpAccount(page) {
  const change_store_selector = 'button#storeId-utilityNavBtn.Button-bwu3xu-0.StoreIdMessageComponent__StyledButton-vpf6s6-1.gUIqgH.dVwSut';
  const zip_input_selector = 'input#zipOrCityState';
  const pick_store_selector = 'button.Button-bwu3xu-0.jwSLus.h-text-sm';
  const lookup_bttn_selector = 'button.Button-bwu3xu-0.StoreLocationSearch__SearchButton-o3wd93-1.hfjCZR.eEaapM.h-padding-h-wide.h-padding-v-tight';
  const singin_selector_1 = 'a#account.Link-sc-1khjl8b-0.dJwaza.AccountLink-gx13jw-1.hoYfWX';
  const remove_item_selector = 'button.Button-bwu3xu-0.gUIqgH.ButtonWithIconLegacy-jpu2t7-0.DeleteCartItemButton__StyledButtonWithIconLegacy-vpr4km-0.jAcrjU.jAMLvp';
  const signout_selector = 'a.Link-sc-1khjl8b-0.NavigationLink-kfyxgv-0.dJwaza.lbDZi';
  const cartURL = 'https://www.target.com/co-cart';

  await page.goto(cartURL, { waitUntil: 'networkidle2' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${snapShotPath}+cleanup_start.png` });

  let remove_bttns = await page.$$(remove_item_selector);
  /* await remove_bttns.click(); */
  let numOfBttns = (remove_bttns).length;
  console.log(`\n Removing ${numOfBttns} number of items`.bgGreen);

  for (let i = 0; i < numOfBttns; i++) {
    await remove_bttns[0].click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${snapShotPath}+item_removed_${i}.png` });

    console.log(`\nItems removed: ${i + 1}`.green);
    remove_bttns = await page.$$(remove_item_selector);
  }
  console.log('\nCart cleared !! '.cyan);

  // Switching store
  console.log('\nReseting prefered store .. (Nearest store to you)..\n'.cyan);
  await page.$eval(change_store_selector, (el) => el.click());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${snapShotPath}+find_store_reset1.png` });

  await page.$eval(zip_input_selector, (el) => el.click());
  await page.type(zip_input_selector, myloc);
  await page.$eval(lookup_bttn_selector, (el) => el.click());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${snapShotPath}+find_store_reset2.png` });

  const bttns = await page.$$(pick_store_selector);
  await bttns[0].click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${snapShotPath}+find_store_reset3.png` });
  console.log('\nSwitched Stores'.yellow);

  console.log('\nPrefered store reset !! (Nearest store to you)..'.cyan);

  await page.$eval(singin_selector_1, (el) => el.click());
  await page.waitForTimeout(700);
  const signout_bttns = await page.$$(signout_selector);
  let nBttns = (signout_bttns).length;
  signout_bttns[nBttns - 1].click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${snapShotPath}+sign_out.png` });

  console.log('\nSigning out ..  '.cyan);
  console.log('\nAccount has been reset '.cyan);
}

(async () => {
  // Start of test: Launch and go to login website
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    //executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  });
  const page = await browser.newPage();
  await page.goto('https://www.target.com', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: `${snapShotPath}+start.png` });

  await logIn(page);

  // TESTING - Comment out when done.
  // await cleanUpAccount(page);
  // For cleaning up account/pause program - usefull for test setup
  // await page.waitForTimeout(9000000);

  // Navigate to Sony PS5 listing & add to cart
  // TO-DO: Change to actuall url once done testing
  let amountOrdered = 0;
  while (amountOrdered < 1) {
    // Spinner 
    var mySpinner = new Spinner.Spinner('processing.. %s');
    mySpinner.setSpinnerString('|/-\\');
    mySpinner.start();

    try {
      console.log('\n[1/4] .. Navigating to listing page ..'.bgCyan);
      await navigateToListing(page);

      // Checking to see if listing is out of stock
      const outOfStock_selector = 'div.styles__BaseWrapper-sc-11r1it6-0.joRrfH div div';
      let stocks = await page.$eval(outOfStock_selector, (element) => { return element.innerHTML });
      let isOutOfStock = stocks.includes('Out of stock');
      console.log('isOutOfStock: ' + `${isOutOfStock}`.red);

      // While listing is out of stock: Change store, check availability 
      let whileLoopCounter = 0;
      while (isOutOfStock) {
        whileLoopCounter++;
        console.log('\nProduct is OUT OF STOCK'.red);
        console.log('whileLoopCounter: ' + `${whileLoopCounter}`.green);

        await page.waitForTimeout(500);
        await findListing(page);

        // Check if current store has listing 
        const stocks = await page.$eval(outOfStock_selector, (element) => { return element.innerHTML });
        isOutOfStock = stocks.includes('Out of stock');
        console.log('isOutOfStock: ' + `${isOutOfStock}`.red);
      }

      console.log('\nListing is in stock !!'.bgCyan);

      // Add listing to cart
      console.log('\n[2/4] .. Adding item to cart ..'.bgCyan);
      await page.waitForTimeout(500);
      await addToCart(page);

      // Navigate to cart
      console.log('\n[3/4] .. Navigating to cart ..'.bgCyan);
      const cartURL = 'https://www.target.com/co-cart';
      await page.goto(cartURL, { waitUntil: 'networkidle2' });
      await page.screenshot({ path: `${snapShotPath}+nav_to_cart.png` });

      //Checkout listing
      console.log('\n[4/4] .. Checking out cart ..'.bgCyan);
      await page.waitForTimeout(500);
      await checkoutCart(page);

      // Clearing Account
      console.log('\nCleaning up account .. \n'.bgBlue);
      console.log('\nOne moment please .. \n');
      await page.waitForTimeout(500);
      await cleanUpAccount(page);
      console.log('Account cleaned up .. \n'.bgBlue);

      // Ctrl+C && Celebrate
      console.log('\nDone. Goteee boiiis!!! \n'.rainbow);
      console.log('\nCtrl+C && Celebrate \n'.bgRed);

      // Done
      await page.goto('https://www.tenor.com/view/done-and-done-ron-swanson-gotchu-gif-10843254', { waitUntil: 'networkidle2' });
      amountOrdered++;
    } catch (error) {
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
      console.log('\n' + error);
      continue;
    }
  }
  await browser.close();
})();