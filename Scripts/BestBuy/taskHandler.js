const Spinner = require('cli-spinner');
const colors = require('colors');
const myInfo = require('./myInfo');

async function logIn(page) {
    await page.waitForTimeout({ waitUntil: 'domcontentloaded' });

    // LOGIN
    // Navigate to login page
    console.log('Navigating to signin page ..'.yellow);
    await page.goto('https://www.bestbuy.com/signin', { waitUntil: 'domcontentloaded' });

    // Enter login credentials & signin
    //email
    //await page.waitForTimeout(500);
    console.log('Signing in ..'.yellow);

    const email_selector = 'input#fld-e.tb-input';
    await page.waitForSelector(email_selector);
    await page.$$(email_selector, (el) => el.click());
    await page.type(email_selector, myInfo.myemail);

    //password
    const password_selector = 'input#fld-p1.tb-input';
    await page.$eval(password_selector, (el) => el.click());
    await page.type(password_selector, myInfo.mypassw);

    //submit
    const singin_selector_3 = 'button.btn.btn-secondary.btn-lg.btn-block.btn-leading-ficon.c-button-icon.c-button-icon-leading.cia-form__controls__submit';
    await page.$eval(singin_selector_3, (el) => el.click());

    await page.waitForTimeout(500);
    await page.screenshot({ path: `${myInfo.snapShotPath}+login_attempt.png` });

}

async function findListing(page, npage) {
    const zip_input_selector = '.zip-code-input';
    const pick_store_selector = 'button.btn.btn-outline.btn-sm.make-this-your-store';
    const lookup_bttn_selector = 'button.btn.btn-secondary.btn-sm';
    const outOfStock_selector = 'div.fulfillment-add-to-cart-button'

    let stocks;
    let isOutOfStock;
    let forLoopCounter = 0;

    var n = 1;
    for (let i = 0; i < 5; i++) {
        forLoopCounter++;
        console.log('forLoopCounter: ' + `${forLoopCounter}`.green);
        console.log('i: ' + ` ${i}`.blue);

        await npage.waitForSelector(zip_input_selector);
        await npage.waitForSelector(lookup_bttn_selector);

        //await npage.focus(zip_input_selector);
        await npage.$$(zip_input_selector, (el) => el.click());
        await npage.type(zip_input_selector, myInfo.myloc);
        await npage.$eval(lookup_bttn_selector, (el) => el.click());
        await npage.waitForTimeout(300);
        await npage.screenshot({ path: `${myInfo.snapShotPath}+find_store2.png` });

        await npage.waitForSelector(pick_store_selector);
        let bttns = await npage.$$(pick_store_selector);
        await bttns[i].click();
        await npage.waitForTimeout(500);
        await npage.screenshot({ path: `${myInfo.snapShotPath}_change_store_${n++}.png` });
        console.log('\nSwitched Stores'.yellow);

        // Check if current store has listing 
        await page.reload({ waitUntil: 'domcontentloaded' });
        await page.waitForSelector(outOfStock_selector);

        stocks = await page.$eval(outOfStock_selector, (element) => { return element.innerHTML });
        isOutOfStock = stocks.includes('Sold Out');
        console.log('isOutOfStock: ' + `${isOutOfStock}`.red);
        
        let currentStore = await npage.$$('div.shop-location-card');
        let itemJsHandle = await currentStore[i+1].getProperty('innerText');
        let storeText = await itemJsHandle.jsonValue(); 
        console.log('@ : ' + `${storeText}`.red);

        // Stop switching stores if listing is found
        if (isOutOfStock != true) {
            break;
        }
        await npage.reload({ waitUntil: 'domcontentloaded' });
    }
    if (isOutOfStock != true) {
        return isOutOfStock;
    }
    return isOutOfStock;
}

async function checkoutCart(page) {
    const chekout_bttn_selector_1 = 'button.btn.btn-lg.btn-block.btn-primary';
    await page.waitForSelector(chekout_bttn_selector_1);

    await page.focus(chekout_bttn_selector_1);
    await page.keyboard.press('Enter');
    await page.screenshot({ path: `${myInfo.snapShotPath}+checkout_started.png` });

    // Input credit-card  cvv
    page.waitForSelector('div.checkout-panel payment-card');
    const panel = await page.$$('div.checkout-panel payment-card', (element) => { return element.innerHTML });
    let cvv = panel.includes('cvv');
    if(cvv){
        const cvv_bttn_selector = 'input#credit-card-cvv.form-control.credit-card-form__cvv--warn';
        await page.waitForSelector(cvv_bttn_selector);
    
        await page.$$(cvv_bttn_selector, (el) => el.click());
        await page.type(cvv_bttn_selector, myInfo.mycvv);
        await page.screenshot({ path: `${myInfo.snapShotPath}+cvv_added.png` });
    }
    const chekout_bttn_selector_2 = 'button.btn.btn-lg.btn-block.btn-primary.button__fast-track';
    await page.waitForSelector(chekout_bttn_selector_2);
    await page.focus(chekout_bttn_selector_2);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(10000);
    await page.screenshot({ path: `${myInfo.snapShotPath}+result_page.png` });
}

module.exports = {
    logIn,
    findListing,
    checkoutCart,
}