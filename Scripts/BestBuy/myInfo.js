require('dotenv').config({ path: `scripts/bestbuy/user_info/.env.${process.env.USER_ENV}` });
var date = new Date();
var timeStamp = `${date.getMonth()}-${date.getDay()}_${Math.floor(Math.random() * 100001)}`;
let snapShotPath = 'record/screen_shots/bestbuy/' + `${timeStamp}`;

const myemail = process.env.MY_EMAIL;
const mypassw = process.env.MY_PASSW;
const myloc = process.env.MY_LOC;
const mycvv = process.env.MY_CVV;
const listingURL = process.env.LISTING_URL;

module.exports = {
    myemail,
    mypassw,
    myloc,
    mycvv,
    listingURL,
    snapShotPath,
  };