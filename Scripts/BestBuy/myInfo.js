var date = new Date();
var timeStamp = date.getDate() + date.getMinutes();

const myemail = '';           // Enter email. ex - const myemail = 'myEmail@email.com';
const mypassw = '';           // Enter password. ex - const mypassw = 'password';
const myInboxEmail = '';      // Enter inbox email. ex - const myInboxEmail = '<email>';
const myInboxPass = '';       // Enter inbox password. ex - const myInboxPass = '<password>';
const myloc = '';             // Enter zip code. ex - const myloc = '01234';
const mycvv = '';             // Enter payment cvv. ex - const mycvv = '123';
const listingURL = '';        // Enter listing url ex - const listingURL 'https://www.ebay.com';
let snapShotPath =
  '../../record/screen_shots/bestbuy/' +
  `${timeStamp}`;

module.exports = {
    myemail,
    mypassw,
    myInboxEmail,
    myInboxPass,
    myloc,
    mycvv,
    listingURL,
    snapShotPath,
  }