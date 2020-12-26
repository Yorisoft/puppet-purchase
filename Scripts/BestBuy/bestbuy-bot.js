const myInfo = require('./myInfo');
const taskHandler = require('./taskHandler');
const Spinner = require('cli-spinner');
const puppeteer = require('puppeteer');
const colors = require('colors');

async function addToCart(page) {
    const add_cart_bttn_selector = 'button.btn.btn-primary.btn-lg.btn-block.btn-leading-ficon.add-to-cart-button';
    await page.waitForSelector(add_cart_bttn_selector);

    await page.focus(add_cart_bttn_selector);
    await page.keyboard.press('Enter');
    console.log('Item added to cart ..');

    await page.waitForTimeout(500);
    await page.screenshot({ path: `${myInfo.snapShotPath}+added_to_cart.png` });
}

(async () => {
    // Start of test: Launch and go to login website
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        //executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
    });
    const page = await browser.newPage();
    await page.goto('https://www.bestbuy.com', { waitUntil: 'networkidle2' });
    await page.screenshot({ path: `${myInfo.snapShotPath}+start.png` });

    await taskHandler.logIn(page);
    await page.waitForTimeout(500);
    console.log('Signed in succesfully ..'.yellow);

    // TESTING - Comment out when done.
    // await cleanUpAccount(page);
    // For cleaning up account/pause program - usefull for test setup
    // await page.waitForTimeout(9000000);

    // Navigate to Sony PS5 listing & add to cart
    let amountOrdered = 0;
    while (amountOrdered < 1) {
        // Spinner 
        var mySpinner = new Spinner.Spinner('processing.. %s');
        mySpinner.setSpinnerString('|/-\\');
        mySpinner.start();

        try {
            console.log('\n[1/4] .. Navigating to listing page ..'.bgCyan);
            await page.waitForTimeout({ waitUntil: 'domcontentloaded' });

            await page.waitForTimeout(500);
            await page.goto(myInfo.listingURL, { waitUntil: 'networkidle2' });
            await page.screenshot({ path: `${myInfo.snapShotPath}+listing_page.png` });

            // Checking to see if listing is out of stock
            const outOfStock_selector = 'div.fulfillment-add-to-cart-button';
            let stocks = await page.$eval(outOfStock_selector, (element) => { return element.innerHTML });
            let isOutOfStock = stocks.includes('Sold Out');
            console.log('isOutOfStock: ' + `${isOutOfStock}`.red);

            while (isOutOfStock) {
                console.log('\nProduct is OUT OF STOCK'.red);
                
                const npage = await browser.newPage();
                await npage.goto('https://www.bestbuy.com/site/store-locator/', { waitUntil: 'domcontentloaded' });
                await npage.screenshot({ path: `${myInfo.snapShotPath}+store_locator.png` });

                isOutOfStock = await taskHandler.findListing(page, npage);
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
            await page.screenshot({ path: `${myInfo.snapShotPath}+nav_to_cart.png` });

            //Checkout listing
            console.log('\n[4/4] .. Checking out cart ..'.bgCyan);
            await taskHandler.checkoutCart(page);

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
    await page.waitForTimeout(15000);
    await browser.close();
})();