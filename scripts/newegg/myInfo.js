require('dotenv').config({ path: `scripts/newegg/user_info/.env.${process.env.USER_ENV}` });
var date = new Date();
var timeStamp = `${process.env.USER_ENV}_${date.getMonth()}-${date.getDay()}_${Math.floor(Math.random() * 100001)}`;
let snapShotPath = 'record/screen_shots/newegg/' + `${timeStamp}`;

let myemail;
let mypassw;
let myInboxPass;
let myloc;
let mycvv;
let listingURL;

if (`${process.env.USER_ENV}` === 'testUserInfo') {
  myemail = process.env.TEST_USER_EMAIL;
  mypassw = process.env.TEST_USER_PASSW;
  myInboxPass = process.env.TEST_USER_PASSW;
  myloc = process.env.TEST_USER_LOC;
  mycvv = process.env.TEST_USER_CVV;
  listingURL = process.env.TEST_USER_LISTING_URL;
} else {
  myemail = process.env.MY_EMAIL;
  mypassw = process.env.MY_PASSW;
  myloc = process.env.MY_LOC;
  mycvv = process.env.MY_CVV;
  listingURL = process.env.LISTING_URL;
}

module.exports = {
  myemail,
  myInboxPass,
  myloc,
  mycvv,
  listingURL,
  snapShotPath,
};
