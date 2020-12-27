var date = new Date();
var timeStamp = `${date.getMonth()}-${date.getDay()}_${date.getTime()}`;

const myemail = '';    // Enter email. ex - const myemail = 'myEmail@email.com';
const mypassw = '';    // Enter password. ex - const mypassw = 'password';
const myInboxPass = ''; // Enter inbox password. ex - const myInboxPass = '<password>';
const myloc = ''; // Enter zip code. ex - const myloc = '01234';
const mycvv = '';    // Enter payment cvv. ex - const mycvv = '123';
const listingURL = '';
let snapShotPath =
  '${workspaceFolder}../../record/screen_shots/newegg/' +
  `${timeStamp}`;

module.exports = {
    myemail,
    mypassw,
    myInboxPass,
    myloc,
    mycvv,
    listingURL,
    snapShotPath,
  }