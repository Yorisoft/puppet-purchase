require('dotenv').config({ path: `scripts/microcenter/user_info/.env.${process.env.USER_ENV}`});
var date = new Date();
var timeStamp = `${process.env.USER_ENV}_${date.getMonth()}-${date.getDay()}_${Math.floor(Math.random() * 100001)}`;
let snapShotPath = 'record/screen_shots/microcenter/' + `${timeStamp}`;

const myemail = process.env.MY_EMAIL ; 
const mypassw = process.env.MY_PASSW;
const mycvv =  process.env.MY_CVV; 
const listingURL = process.env.LISTING_URL;

module.exports = {
  myemail,
  mypassw,
  mycvv,
  listingURL,
  snapShotPath,
};