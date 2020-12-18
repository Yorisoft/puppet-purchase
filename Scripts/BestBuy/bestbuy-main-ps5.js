const myemail = '';    // Enter email. ex - const myemail = 'myEmail@email.com';
const mypassw = '';    // Enter password. ex - const mypassw = 'password';
const myloc = ''; // Enter zip code. ex - const myloc = '01234';
const mycvv = '';    // Enter payment cvv. ex - const mycvv = '123';
let snapShotPath = '/<path_to_project>/record/screen_shots/bestbuy' + `${timeStamp}`; // ex, '/Users/me/Documents/<this_folder>/record/screen_shots/bestbuy'
let recorderPath = '/<path_to_project>/record/video/bestbuy/' + `${timeStamp}`; // ex, '/Users/me/Documents/<this_folder>/record/video/bestbuy'

const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');
var date = new Date();
var timeStamp = date.getTime();
var n = 1;

async function logIn(page) {
    await page.waitForTimeout({ waitUntil: 'domcontentloaded' });

    // LOGIN
    // Navigate to login page
    console.log('Navigating to signin page ..'.yellow);
    await page.goto('https://www.bestbuy.com/identity/signin?token=tid%3A930f5ea1-3f30-11eb-8763-0a7191f246e1', { waitUntil: 'domcontentloaded' });

    // Enter login credentials & signin
    //email
    //await page.waitForTimeout(500);
    console.log('Signing in ..'.yellow);

    const email_selector = 'input#fld-e.tb-input';
    await page.waitForSelector(email_selector);
    await page.$$(email_selector, (el) => el.click());
    await page.type(email_selector, myemail);

    //password
    const password_selector = 'input#fld-p1.tb-input';
    await page.$eval(password_selector, (el) => el.click());
    await page.type(password_selector, mypassw);

    //submit
    const singin_selector_3 = 'button.btn.btn-secondary.btn-lg.btn-block.btn-leading-ficon.c-button-icon.c-button-icon-leading.cia-form__controls__submit';
    await page.$eval(singin_selector_3, (el) => el.click());

    await page.waitForTimeout(500);
    await page.screenshot({ path: `${snapShotPath}+login_attempt.png` });

}
async function navigateToListing(page) {
    await page.waitForTimeout(500);

    const listingURL = 'https://www.bestbuy.com/site/sony-playstation-5-dualsense-wireless-controller/6430163.p?skuId=6430163';//'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149';//'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149';
    await page.goto(listingURL, { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `${snapShotPath}+listing_page.png` });
}
async function findListing(page, npage) {
    const zip_input_selector = '.zip-code-input';
    const pick_store_selector = 'button.btn.btn-outline.btn-sm.make-this-your-store';
    const lookup_bttn_selector = 'button.btn.btn-secondary.btn-sm';
    const outOfStock_selector = 'div.fulfillment-add-to-cart-button'

    let stocks;
    let isOutOfStock;
    let forLoopCounter = 0;

    for (let i = 0; i < 5; i++) {
        forLoopCounter++;
        console.log('forLoopCounter: ' + `${forLoopCounter}`.green);
        console.log('i: ' + ` ${i}`.blue);

        await npage.waitForSelector(zip_input_selector);
        await npage.waitForSelector(lookup_bttn_selector);

        //await npage.focus(zip_input_selector);
        await npage.$$(zip_input_selector, (el) => el.click());
        await npage.type(zip_input_selector, myloc);
        await npage.$eval(lookup_bttn_selector, (el) => el.click());
        await npage.waitForTimeout(300);
        await npage.screenshot({ path: `${snapShotPath}+find_store2.png` });

        await npage.waitForSelector(pick_store_selector);
        let bttns = await npage.$$(pick_store_selector);
        await bttns[i].click();
        await npage.waitForTimeout(500);
        await npage.screenshot({ path: `${snapShotPath}_change_store_${n++}.png` });
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
async function addToCart(page) {
    const add_cart_bttn_selector = 'button.btn.btn-primary.btn-lg.btn-block.btn-leading-ficon.add-to-cart-button';
    await page.waitForSelector(add_cart_bttn_selector);

    await page.focus(add_cart_bttn_selector);
    await page.keyboard.press('Enter');
    console.log('Item added to cart ..');

    await page.waitForTimeout(500);
    await page.screenshot({ path: `${snapShotPath}+added_to_cart.png` });
}
async function checkoutCart(page) {
    const chekout_bttn_selector_1 = 'button.btn.btn-lg.btn-block.btn-primary';
    await page.waitForSelector(chekout_bttn_selector_1);

    await page.focus(chekout_bttn_selector_1);
    await page.keyboard.press('Enter');
    await page.screenshot({ path: `${snapShotPath}+checkout_started.png` });

    // Input credit-card  cvv
    const panel = await $eval('checkout-panel payment-card', (element) => { return element.innerHTML })
    let cvv = panel.includes('cvv');
    if(cvv){
        const cvv_bttn_selector = 'input#credit-card-cvv.form-control.credit-card-form__cvv--warn';
        await page.waitForSelector(cvv_bttn_selector);
    
        await page.$$(cvv_bttn_selector, (el) => el.click());
        await page.type(cvv_bttn_selector, mycvv);
        await page.screenshot({ path: `${snapShotPath}+cvv_added.png` });
    }
   
    // Checkout = 'Moment of truth..';
    const chekout_bttn_selector_2 = 'button.btn.btn-lg.btn-block.btn-primary.button__fast-track';
    await page.focus(chekout_bttn_selector_1);
    await page.keyboard.press('Enter');
    await page.waitForTimeout(10000);
    await page.screenshot({ path: `${snapShotPath}+result_page.png` });
}

(async () => {
    // Start of test: Launch and go to login website
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    });
    const page = await browser.newPage();
    await page.goto('https://www.bestbuy.com', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `${snapShotPath}+start.png` });

    await logIn(page);
    console.log('Signed in succesfully ..'.yellow);


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
            await page.waitForTimeout({ waitUntil: 'domcontentloaded' });
            await navigateToListing(page);

            // Checking to see if listing is out of stock
            const outOfStock_selector = 'div.fulfillment-add-to-cart-button';
            let stocks = await page.$eval(outOfStock_selector, (element) => { return element.innerHTML });
            let isOutOfStock = stocks.includes('Sold Out');
            console.log('isOutOfStock: ' + `${isOutOfStock}`.red);

            let whileLoopCounter = 0;
            while (isOutOfStock) {
                whileLoopCounter++;
                console.log('\nProduct is OUT OF STOCK'.red);
                console.log('whileLoopCounter: ' + `${whileLoopCounter}`.yellow);

                //await page.waitForTimeout(500);
                // While listing is out of stock: Change store && check availability 
                
                const npage = await browser.newPage();
                await npage.goto('https://www.bestbuy.com/site/store-locator/', { waitUntil: 'domcontentloaded' });
                await npage.screenshot({ path: `${snapShotPath}+store_locator.png` });

                isOutOfStock = await findListing(page, npage);
                await npage.close();               
            }

            console.log('\nListing is in stock !!'.bgCyan);
            
            // Add listing to cart
            console.log('\n[2/4] .. Adding item to cart ..'.bgCyan);
            await addToCart(page);

            // Navigate to cart
            console.log('\n[3/4] .. Navigating to cart ..'.bgCyan);
            const cartURL = 'https://www.bestbuy.com/cart';
            await page.goto(cartURL, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: `${snapShotPath}+nav_to_cart.png` });

            //Checkout listing
            console.log('\n[4/4] .. Checking out cart ..'.bgCyan);
            await checkoutCart(page);

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