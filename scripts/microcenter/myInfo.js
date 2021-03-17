require('dotenv').config({ path: `scripts/microcenter/user_info/.env.${process.env.USER_ENV}`});
var date = new Date();
var timeStamp = `${process.env.USER_ENV}_${date.getMonth()}-${date.getDay()}_${Math.floor(Math.random() * 100001)}`;
let snapShotPath = 'record/screen_shots/microcenter/' + `${timeStamp}`;

let myemail;
let mypassw;
let myphone;
let myloc;
let mycvv;
let listingURL;

if (`${process.env.USER_ENV}` === 'testUserInfo') {
  myemail = process.env.TEST_USER_EMAIL;
  mypassw = process.env.TEST_USER_PASSW;
  myphone = process.env.TEST_USER_PHONE;
  myloc = process.env.TEST_USER_LOC;
  mycvv = process.env.TEST_USER_CVV;
  listingURL = process.env.TEST_USER_LISTING_URL;
} else {
  myemail = process.env.MY_EMAIL;
  mypassw = process.env.MY_PASSW;
  myphone = process.env.MY_PHONE_NUMBER;
  myloc = process.env.MY_LOC;
  mycvv = process.env.MY_CVV;
  listingURL = process.env.LISTING_URL;
}

module.exports = {
  myemail,
  mypassw,
  mycvv,
  myloc,
  listingURL,
  snapShotPath,
};