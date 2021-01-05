require("dotenv").config({ path: `.env.${process.env.USER_ENV}` });
var date = new Date();
var timeStamp = `${date.getMonth()}-${date.getDay()}_${date.getTime()}`;
let snapShotPath = '../../record/screen_shots/newegg/' + `${timeStamp}`;

const myemail = process.env.MY_EMAIL;
const mypassw = process.env.MY_PASSW;
const myInboxPass = process.env.MY_INBOX_PASSW;
const myloc = process.env.MY_LOC;
const mycvv = process.env.MY_CVV;
const listingURL = process.env.LISTING_URL;

module.exports = {
    myemail,
    mypassw,
    myInboxPass,
    myloc,
    mycvv,
    listingURL,
    snapShotPath,
  }