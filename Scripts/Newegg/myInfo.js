var date = new Date();
var timeStamp = `${date.getMonth()}-${date.getDay()}_${date.getTime()}`;

// Fill in the value w. your account/listing info
const myemail = '';
const mypassw = '';
const myInboxPass = '';
const myloc = '';
const mycvv = '';
const listingURL = ''; // Enter URL of item. ex - http://www.bestbuy.com/item;
let snapShotPath = '../../record/screen_shots/newegg/' + `${timeStamp}`;

module.exports = {
    myemail,
    mypassw,
    myInboxPass,
    myloc,
    mycvv,
    listingURL,
    snapShotPath,
  }