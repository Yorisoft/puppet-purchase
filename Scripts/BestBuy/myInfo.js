var date = new Date();
var timeStamp = `${date.getMonth()}-${date.getDay()}_${date.getTime()}`;

// Fill in the value w. your account/listing info
const myemail = '';
const myPass = '';
const myloc = '';
const mycvv = '';
const listingURL = ''; // Enter URL of item. ex - http://www.bestbuy.com/item;
let snapShotPath = '../../record/screen_shots/bestbuy/' + `${timeStamp}`;

module.exports = {
    myemail,
    myPass,
    myloc,
    mycvv,
    listingURL,
    snapShotPath,
  }