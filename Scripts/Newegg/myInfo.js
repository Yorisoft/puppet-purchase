require('dotenv').config({ path: `scripts/newegg/user_info/.env.${process.env.USER_ENV}` });
var date = new Date();
var timeStamp = `${process.env.USER_ENV}_${date.getMonth()}-${date.getDay()}_${Math.floor(Math.random() * 100001)}`;
let snapShotPath = 'record/screen_shots/newegg/' + `${timeStamp}`;

const myemail = process.env.MY_EMAIL;
const myInboxPass = process.env.MY_INBOX_PASSW;
const myloc = process.env.MY_LOC;
const mycvv = process.env.MY_CVV;
const listingURL = process.env.LISTING_URL;

module.exports = {
  myemail,
  myInboxPass,
  myloc,
  mycvv,
  listingURL,
  snapShotPath,
};
