var date = new Date();
var timeStamp = `${date.getMonth()}-${date.getDay()}_${date.getTime()}`;

const myemail = '';    // Enter email. ex - const myemail = 'myEmail@email.com';
const myInboxPass = ''; // Enter inbox password. ex - const myInboxPass = '<password>';
const myloc = ''; // Enter zip code. ex - const myloc = '01234';
const mycvv = '';    // Enter payment cvv. ex - const mycvv = '123';
const listingURL = '';
let snapShotPath = '../../record/screen_shots/bestbuy/' + `${timeStamp}`;

module.exports = {
    myemail,
    myInboxPass,
    myloc,
    mycvv,
    listingURL,
    snapShotPath,
  }